from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status
from app.models import ProductLike, Product

def like_product(db: Session, user_id: int, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = db.query(ProductLike).options(
        joinedload(ProductLike.product)
    ).filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    # If already liked, return existing (idempotent operation)
    if existing:
        return existing

    like = ProductLike(user_id=user_id, product_id=product_id)
    db.add(like)
    db.commit()
    db.refresh(like)
    
    # Load the product relationship for the response
    db.refresh(like, ['product'])
    
    return like


def unlike_product(db: Session, user_id: int, product_id: int):
    like = db.query(ProductLike).filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    # If not found, operation is already complete
    if not like:
        return

    db.delete(like)
    db.commit()


def get_liked_products(db: Session, user_id: int):
    return db.query(ProductLike).options(
        joinedload(ProductLike.product)
    ).filter(
        ProductLike.user_id == user_id
    ).all()
