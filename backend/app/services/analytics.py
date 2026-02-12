# app/services/analytics.py
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Date
from app.models import Order, OrderItem, OrderStatus, Product
from decimal import Decimal
from datetime import datetime, time
from fastapi import HTTPException



def sales_summary_service(db: Session):
    result = db.query(
        func.coalesce(func.sum(Order.total_amount), 0).label("total_revenue"),
        func.count(Order.id).label("total_orders"),
        func.coalesce(func.sum(OrderItem.quantity), 0).label("total_items_sold"),
        func.coalesce(func.avg(Order.total_amount), 0).label("avg_order_value")
    ).join(OrderItem, Order.id == OrderItem.order_id)\
     .filter(Order.status.in_([OrderStatus.paid, OrderStatus.completed]))\
     .one()

    return {
        "total_revenue": result.total_revenue,
        "total_orders": result.total_orders,
        "total_items_sold": result.total_items_sold,
        "avg_order_value": result.avg_order_value
    }


def sales_over_time_service(db: Session, start_date=None, end_date=None):
    date_expr = cast(Order.created_at, Date)

    rows = (
        db.query(
            date_expr.label("date"),
            func.sum(Order.total_amount).label("revenue"),
            func.count(Order.id).label("orders"),
        )
        .filter(Order.status.in_([OrderStatus.paid, OrderStatus.completed]))
        .group_by(date_expr)
        .order_by(date_expr)
    )

    if start_date:
        rows = rows.filter(date_expr >= start_date)
    if end_date:
        rows = rows.filter(date_expr <= end_date)

    results = rows.all()

    return [
        {
            "date": r.date,
            "revenue": r.revenue or 0,
            "orders": r.orders,
        }
        for r in results
    ]


def product_sales_service(
    db: Session,
    limit: int = 10,
    skip: int = 0,
    start_date=None,
    end_date=None,
    sort_by: str = "quantity",
):
    start_dt = datetime.combine(start_date, time.min) if start_date else None
    end_dt = datetime.combine(end_date, time.max) if end_date else None

    total_qty = func.coalesce(func.sum(OrderItem.quantity), 0)
    revenue_expr = func.coalesce(
        func.sum(OrderItem.quantity * OrderItem.sold_price),
        0
    )

    base_query = (
        db.query(
            Product.id.label("product_id"),
            Product.name.label("product_name"),
            total_qty.label("total_quantity"),
            revenue_expr.label("revenue"),
        )
        .join(OrderItem, OrderItem.product_id == Product.id)
        .join(Order, Order.id == OrderItem.order_id)
        .filter(Order.status.in_([OrderStatus.paid, OrderStatus.completed]))
    )

    if start_dt:
        base_query = base_query.filter(Order.created_at >= start_dt)
    if end_dt:
        base_query = base_query.filter(Order.created_at <= end_dt)

    base_query = base_query.group_by(Product.id, Product.name)

    base_query = (
        base_query.order_by(revenue_expr.desc())
        if sort_by == "revenue"
        else base_query.order_by(total_qty.desc())
    )

    rows = base_query.offset(skip).limit(limit).all()

    # total revenue
    total_revenue_query = (
        db.query(revenue_expr)
        .select_from(OrderItem)
        .join(Order)
        .filter(Order.status.in_([OrderStatus.paid, OrderStatus.completed]))
    )

    if start_dt:
        total_revenue_query = total_revenue_query.filter(Order.created_at >= start_dt)
    if end_dt:
        total_revenue_query = total_revenue_query.filter(Order.created_at <= end_dt)

    total_revenue = total_revenue_query.scalar() or 0

    return [
        {
            "product_id": r.product_id,
            "product_name": r.product_name,
            "total_quantity": r.total_quantity,
            "revenue": r.revenue,
            "revenue_percentage": (
                (r.revenue / total_revenue * 100).quantize(Decimal("0.01"))
                if total_revenue > 0 else Decimal("0.00")
            ),
        }
        for r in rows
    ]


def revenue_by_product_service(
    db: Session,
    product_id: int | None = None,
    product_name: str | None = None,
    category: str | None = None,
    start_date=None,
    end_date=None,
):
    if not any([product_id, product_name, category]):
        raise HTTPException(
            status_code=400,
            detail="Provide product_id, product_name, or category"
        )

    query = (
        db.query(
            Product.id.label("product_id"),
            Product.name.label("product_name"),
            Product.category.label("category"),
            func.sum(OrderItem.quantity).label("total_quantity"),
            func.sum(OrderItem.quantity * OrderItem.sold_price).label("revenue"),
        )
        .join(OrderItem, OrderItem.product_id == Product.id)
        .join(Order, Order.id == OrderItem.order_id)
        .filter(Order.status.in_([OrderStatus.paid, OrderStatus.completed]))
    )

    # Filters
    if product_id:
        query = query.filter(Product.id == product_id)

    if product_name:
        query = query.filter(Product.name.ilike(f"%{product_name}%"))

    if category:
        query = query.filter(Product.category == category)

    # Date filtering
    if start_date:
        query = query.filter(
            Order.created_at >= datetime.combine(start_date, time.min)
        )

    if end_date:
        query = query.filter(
            Order.created_at <= datetime.combine(end_date, time.max)
        )

    query = query.group_by(Product.id, Product.name, Product.category)

    return query.all()