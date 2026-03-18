from typing import List
from app.models import Product


def product_to_text(product: Product) -> str:
    """
    Convert a Product into optimized embedding text.
    """

    parts: List[str] = []

    # Name (very important for search)
    if product.name:
        parts.append(product.name)

    # Category
    if product.category:
        parts.append(product.category)

    # Tags
    if product.tags:
        parts.append(" ".join(tag.name for tag in product.tags))

    # Short description
    if product.description:
        parts.append(product.description[:300])  # limit size

    return " ".join(parts)