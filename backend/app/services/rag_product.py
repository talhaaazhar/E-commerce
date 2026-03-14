from app.rag.pinecone_client import get_index

index = get_index()

def index_products_safe(db):
    from app.rag.product_indexer import index_products
    try:
        index_products(db)
    except Exception as e:
        print(f"[RAG] Failed to index products: {e}")

def delete_product_from_index_safe(product_id: int):
    try:
        index.delete(ids=[str(product_id)])
    except Exception as e:
        print(f"[RAG] Failed to delete product {product_id} from Pinecone: {e}")