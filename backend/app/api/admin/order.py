# app/routers/admin_orders.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import Order
from app.core.database import get_db
from app.dependencies import require_admin
from app.schemas import OrderRead, OrderItemRead
from app.services.order import (
    list_all_orders_service,
    update_order_status_service,
    list_pending_orders_service
)

router = APIRouter(
    prefix="/admin/orders",
    tags=["Admin Orders"],
    # dependencies=[Depends(require_admin)]
   
)


def _to_order_read(order: Order) -> OrderRead:
    items = [
        OrderItemRead(
            product_id=item.product_id,
            name=item.product.name,
            quantity=item.quantity,
            original_price=item.original_price,
            sold_price=item.sold_price,
            subtotal=item.sold_price * item.quantity,
        )
        for item in order.items
    ]
    return OrderRead(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status.value,
        items=items,
        created_at=order.created_at,
    )

# -----------------------------
# List Orders (optionally filtered by status or user)
# -----------------------------
@router.get("/", response_model=List[OrderRead])
def list_orders(
    status: Optional[str] = None,
    user_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    orders = list_all_orders_service(db=db, status=status, user_id=user_id)
    return [_to_order_read(order) for order in orders]


# -----------------------------
# Update Order Status
# -----------------------------
@router.patch("/{order_id}/status", response_model=OrderRead)
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    order = update_order_status_service(db=db, order_id=order_id, new_status=status)
    return _to_order_read(order)


# -----------------------------
# List Pending Orders
# -----------------------------
@router.get("/pending", response_model=List[OrderRead])
def list_pending_orders(db: Session = Depends(get_db)):
    orders = list_pending_orders_service(db=db)
    return [_to_order_read(order) for order in orders]



