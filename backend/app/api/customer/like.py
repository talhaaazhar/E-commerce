from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas import LikeCreate, LikeRead
from app.services.like_service import (
    like_product,
    unlike_product,
    get_liked_products
)
from app.models import User

router = APIRouter(prefix="/user/likes", tags=["Likes"])

@router.post("/", response_model=LikeRead, status_code=status.HTTP_201_CREATED)
def like(
    payload: LikeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return like_product(db, current_user.id, payload.product_id)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def unlike(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    unlike_product(db, current_user.id, product_id)


@router.get("/", response_model=list[LikeRead])
def my_likes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_liked_products(db, current_user.id)
