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
from app.services.product import to_product_card_read
from app.models import User

router = APIRouter(prefix="/user/likes", tags=["Likes"])

@router.post("/", response_model=LikeRead, status_code=status.HTTP_201_CREATED)
def like(
    payload: LikeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    like_obj = like_product(db, current_user.id, payload.product_id)
    
    # Add product data to response for consistency with GET endpoint
    if like_obj.product:
        product_card = to_product_card_read(db, like_obj.product)
        return LikeRead(
            id=like_obj.id,
            product_id=like_obj.product_id,
            created_at=like_obj.created_at,
            product=product_card
        )
    
    return like_obj


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
    likes = get_liked_products(db, current_user.id)
    
    # Use product service to format product data consistently
    result = []
    for like in likes:
        if like.product:
            product_card = to_product_card_read(db, like.product)
            if product_card:
                result.append(LikeRead(
                    id=like.id,
                    product_id=like.product_id,
                    created_at=like.created_at,
                    product=product_card
                ))
    
    return result
