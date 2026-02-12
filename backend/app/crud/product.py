from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import Product, ProductTag, Discount, DiscountTarget,ProductSale
from app.schemas import ProductCreate, ProductRead, ProductUpdate
from sqlalchemy import func, or_
from datetime import datetime


def create_product(
    db: Session,
    data: ProductCreate,
    tags: List[ProductTag]
) -> Product:
    """
    Persist a Product with resolved tags.
    Assumes transaction is handled by service layer.
    """
    product = Product(
        name=data.name,
        description=data.description,
        category=data.category,
        price=data.price,
        stock=data.stock,
        images=data.images,
        is_active=True,
        needs_embedding_update=True,  # RAG flag
    )

    product.tags = tags

    db.add(product)
    return product


def get_product_by_id(db: Session, product_id: int) -> Product | None:
    return db.query(Product).filter(Product.id == product_id).first()




def update_product(
    db: Session,
    product: Product,
    data: ProductUpdate,
    tags: List[ProductTag] | None = None,
) -> Product:
    for field, value in data.model_dump(exclude_unset=True).items():
        if field != "tag_names":
            setattr(product, field, value)

    if tags is not None:
        product.tags = tags

    db.add(product)
    return product



def deactivate_product(db: Session, product: Product) -> Product:
    product.is_active = False
    product.needs_embedding_update = True  # keep vector DB in sync
    db.add(product)
    return product

def activate_product(db: Session, product: Product) -> Product:
    product.is_active = True
    product.needs_embedding_update = True  # keep vector DB in sync
    db.add(product)
    return product

def hard_delete_product(db: Session, product: Product):
    db.delete(product)







