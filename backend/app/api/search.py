from fastapi import APIRouter, Query
from app.services.product_semantic_search import semantic_search_products

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/products")
def search_products(
    q: str = Query(..., description="Search query"),
    top_k: int = 5
):
    return semantic_search_products(q, top_k)