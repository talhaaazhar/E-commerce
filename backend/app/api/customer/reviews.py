from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.dependencies import require_user
from app.models import User
from app.schemas import (
    ReviewCreate,
    ReviewUpdate,
    ReviewRead,
)
from app.services.reviews import (
    create_review_service,
    update_review_service,
    delete_review_service,
    list_product_reviews_service,
)

router = APIRouter(
    prefix="/user/reviews",
    tags=["User Reviews"],
)


@router.post("/", response_model=ReviewRead)
def create_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user: User = Depends(require_user),
):
    return create_review_service(db, user, data)


@router.put("/{review_id}", response_model=ReviewRead)
def update_review(
    review_id: int,
    data: ReviewUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(require_user),
):
    return update_review_service(db, user, review_id, data)


@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_user),
):
    return delete_review_service(db, user, review_id)


@router.get(
    "/product/{product_id}",
    response_model=List[ReviewRead],
)
def list_product_reviews(
    product_id: int,
    db: Session = Depends(get_db),
):
    return list_product_reviews_service(db, product_id)
