from sqlalchemy.orm import Session
from app.models import Product
from app.rag.product_document import product_to_text
from app.rag.embeddings.openai_embeddings import OpenAIEmbedding
from app.rag.pinecone_client import get_index

embedding_model = OpenAIEmbedding()
index = get_index()


def _build_product_vector(product: Product) -> dict:
    text = product_to_text(product)
    vector = embedding_model.embed_document(text)
    metadata = {
        "product_id": product.id,
        "name": product.name or "",
        "description": product.description or "",
        "price": float(product.price) if product.price is not None else 0.0,
        "category": product.category or "",
        "tags": [tag.name for tag in product.tags] if product.tags else []
    }
    return {
        "id": str(product.id),
        "values": vector,
        "metadata": metadata,
    }


def index_products_safe(db: Session, product_ids: list[int] | None = None):
    """
    Index products in Pinecone.
    - If product_ids is None, index all products needing update.
    - If product_ids provided, only index these products.
    """
    if product_ids:
        products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    else:
        products = db.query(Product).filter(Product.needs_embedding_update == True).all()

    vectors_to_upsert = []
    for product in products:
        vectors_to_upsert.append(_build_product_vector(product))
        product.needs_embedding_update = False

    if vectors_to_upsert:
        try:
            index.upsert(vectors=vectors_to_upsert)
        except Exception as e:
            print(f"Failed to upsert products to Pinecone: {e}")
        db.commit()
        print(f"Upserted {len(vectors_to_upsert)} products to Pinecone")


def delete_product_from_index_safe(product_id: int | str):
    """
    Delete a product vector from Pinecone without crashing the request flow.
    """
    try:
        index.delete(ids=[str(product_id)])
    except Exception as e:
        print(f"Failed to delete product {product_id} from Pinecone: {e}")


def reindex_all_products_safe(db: Session, active_only: bool = True, wipe_first: bool = True):
    """
    Rebuild Pinecone vectors for all products in the database.
    If wipe_first=True (default), deletes ALL existing vectors before reinserting,
    so stale/test records are fully removed.
    """
    query = db.query(Product)
    if active_only:
        query = query.filter(Product.is_active == True)

    products = query.all()
    vectors_to_upsert = []

    for product in products:
        vectors_to_upsert.append(_build_product_vector(product))
        product.needs_embedding_update = False

    try:
        if wipe_first:
            index.delete(delete_all=True)
            print("Wiped all existing Pinecone vectors")

        if not vectors_to_upsert:
            db.commit()
            return 0

        index.upsert(vectors=vectors_to_upsert)
        db.commit()
        print(f"Reindexed {len(vectors_to_upsert)} products in Pinecone")
        return len(vectors_to_upsert)
    except Exception as e:
        db.rollback()
        print(f"Failed to reindex products in Pinecone: {e}")
        return 0

