from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import ProductLike, Product

def like_product(db: Session, user_id: int, product_id: int):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing = db.query(ProductLike).filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Product already liked")

    like = ProductLike(user_id=user_id, product_id=product_id)
    db.add(like)
    db.commit()
    db.refresh(like)
    return like


def unlike_product(db: Session, user_id: int, product_id: int):
    like = db.query(ProductLike).filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()

    if not like:
        raise HTTPException(status_code=404, detail="Like not found")

    db.delete(like)
    db.commit()


def get_liked_products(db: Session, user_id: int):
    return db.query(ProductLike).filter(
        ProductLike.user_id == user_id
    ).all()
