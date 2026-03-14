from sqlalchemy.orm import Session
from app.models import Product
from app.rag.pinecone_client import get_index
from app.rag.embeddings.openai_embeddings import OpenAIEmbedding

embedding_model = OpenAIEmbedding()
index = get_index()


def retrieve_products(db: Session, query: str, top_k: int = 5):

    query_vector = embedding_model.embed_query(query)

    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True
    )

    product_ids = [int(match.metadata["product_id"]) for match in results.matches]

    if not product_ids:
        return []

    products = db.query(Product).filter(Product.id.in_(product_ids)).all()

    return products