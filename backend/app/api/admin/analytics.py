# app/api/admin/analytics.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.dependencies import require_admin
from app.services.analytics import (
    sales_summary_service,
    sales_over_time_service,
    product_sales_service,
    revenue_by_product_service

)
from app.schemas import SalesOverTimeRead, ProductSalesRead, RevenueByProductRead
from typing import List
from datetime import date
router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"],
    # dependencies=[Depends(require_admin)]
)

@router.get("/summary")
def sales_summary(db: Session = Depends(get_db)):
    return sales_summary_service(db)


@router.get(
    "/sales-over-time",
    response_model=List[SalesOverTimeRead]
)
def sales_over_time(
    start_date: date | None = None,
    end_date: date | None = None,
    db: Session = Depends(get_db)
):
    return sales_over_time_service(db, start_date, end_date)


@router.get(
    "/top-products",
    response_model=List[ProductSalesRead]
)
def top_selling_products(
    limit: int = Query(10, ge=1, le=100),
    skip: int = Query(0, ge=0),
    start_date: date | None = None,
    end_date: date | None = None,
    sort_by: str = Query("quantity", regex="^(quantity|revenue)$"),
    db: Session = Depends(get_db)
):
    return product_sales_service(
        db=db,
        limit=limit,
        skip=skip,
        start_date=start_date,
        end_date=end_date,
        sort_by=sort_by
    )

@router.get(
    "/revenue-by-product",
    response_model=List[RevenueByProductRead]
)
def revenue_by_product(
    product_id: int | None = None,
    product_name: str | None = Query(None, min_length=2),
    category: str | None = None,
    start_date: date | None = None,
    end_date: date | None = None,
    db: Session = Depends(get_db)
):
    return revenue_by_product_service(
        db=db,
        product_id=product_id,
        product_name=product_name,
        category=category,
        start_date=start_date,
        end_date=end_date,
    )



# @router.get(
#     "/revenue-by-product",
#     response_model=List[RevenueByProductRead]
# )
# def revenue_by_product(
#     product_id: int | None = None,
#     product_name: str | None = Query(None, min_length=2),
#     category: str | None = None,
#     start_date: date | None = None,
#     end_date: date | None = None,
#     db: Session = Depends(get_db)
# ):
#     return revenue_by_product_service(
#         db=db,
#         product_id=product_id,
#         product_name=product_name,
#         category=category,
#         start_date=start_date,
#         end_date=end_date,
#     )
