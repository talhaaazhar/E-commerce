# app/api/products.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas import ProductRead, ProductFilter, ProductDetailRead, ProductCardRead
from app.services.product import list_products_service, _to_product_card_reads, get_product_detail_service
from app.core.database import get_db
from app.dependencies import require_user


router = APIRouter(
    prefix="/user/products",
    tags=["User Products"],
    # dependencies=[Depends(require_user)]
)



router = APIRouter(
    prefix="/user/products",
    tags=["User Products"],
    # dependencies=[Depends(require_user)]
)


# @router.get("/", response_model=List[ProductCardRead])
# def list_products_user(
#     filters: ProductFilter = Depends(),
#     db: Session = Depends(get_db)
# ):
#     filters.is_active = True  # only show active products to users
#     products = list_products_service(db=db, filters=filters)
#     return [_to_product_card_read(db, p) for p in products]






@router.get("/", response_model=List[ProductCardRead])
def list_products_user(
    filters: ProductFilter = Depends(),
    db: Session = Depends(get_db)
):
    filters.is_active = True
    products = list_products_service(db=db, filters=filters)
    return _to_product_card_reads(db, products)


@router.get("/{product_id}", response_model=ProductDetailRead)
def get_product_detail(
    product_id: int,
    review_skip: int = Query(0, ge=0),
    review_limit: int = Query(10, ge=1),
    db: Session = Depends(get_db)
):
    return get_product_detail_service(
        db=db,
        product_id=product_id,
        review_skip=review_skip,
        review_limit=review_limit
    )