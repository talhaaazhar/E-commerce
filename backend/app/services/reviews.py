from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import (
    ProductReview,
    Order,
    OrderItem,
    OrderStatus,
)
from app.schemas import ReviewCreate, ReviewUpdate
from app.models import User


def create_review_service(
    db: Session,
    user: User,
    data: ReviewCreate,
):
    # 1️⃣ Check if user bought this product
    purchased = (
        db.query(OrderItem)
        .join(Order)
        .filter(
            Order.user_id == user.id,
            OrderItem.product_id == data.product_id,
            Order.status.in_([OrderStatus.paid, OrderStatus.completed]),
        )
        .first()
    )

    if not purchased:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can review only purchased products",
        )

    # 2️⃣ Check if review already exists
    existing = (
        db.query(ProductReview)
        .filter_by(
            user_id=user.id,
            product_id=data.product_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already reviewed this product",
        )

    review = ProductReview(
        user_id=user.id,
        product_id=data.product_id,
        rating=data.rating,
        review=data.comment,
    )

    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def update_review_service(
    db: Session,
    user: User,
    review_id: int,
    data: ReviewUpdate,
):
    review = (
        db.query(ProductReview)
        .filter_by(id=review_id, user_id=user.id)
        .first()
    )

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if data.rating is not None:
        review.rating = data.rating
    if data.comment is not None:
        review.review = data.comment

    db.commit()
    db.refresh(review)
    return review


def delete_review_service(
    db: Session,
    user: User,
    review_id: int,
):
    review = (
        db.query(ProductReview)
        .filter_by(id=review_id, user_id=user.id)
        .first()
    )

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    db.delete(review)
    db.commit()
    return {"message": "Review deleted successfully"}


def list_product_reviews_service(
    db: Session,
    product_id: int,
):
    return (
        db.query(ProductReview)
        .filter(ProductReview.product_id == product_id)
        .order_by(ProductReview.created_at.desc())
        .all()
    )
