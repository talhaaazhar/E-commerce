from app.rag.pinecone_client import get_index
from app.rag.embeddings.openai_embeddings import OpenAIEmbedding

index = get_index()
embedding_model = OpenAIEmbedding()


def semantic_search_products(query: str, top_k: int = 5):
    """
    Search Pinecone for semantically similar products
    """
    
    query_vector = embedding_model.embed_query(query)

    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True
    )

    products = []

    for match in results.matches:
        metadata = match.metadata or {}
        product_id = metadata.get("product_id", match.id)

        if product_id is None:
            continue

        products.append({
            "product_id": product_id,
            "name": metadata.get("name"),
            "description": metadata.get("description"),
            "price": metadata.get("price"),
            "category": metadata.get("category"),
            "tags": metadata.get("tags", []),
            "score": match.score
        })

    return products