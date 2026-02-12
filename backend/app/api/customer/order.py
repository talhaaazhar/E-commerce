from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.order import checkout_service, get_user_orders_service
from typing import List
from app.schemas import OrderRead, OrderItemRead
from app.core.database import get_db
from app.dependencies import require_user


router = APIRouter(
    prefix="/user/orders",
    tags=["User Orders"],
    dependencies=[Depends(require_user)]
)

@router.post("/checkout", response_model=OrderRead)
def checkout(db: Session = Depends(get_db), current_user=Depends(require_user)):
    order = checkout_service(db, user_id=current_user.id)

    items = []
    for item in order.items:
        items.append(
            OrderItemRead(
                product_id=item.product_id,
                name=item.product.name,
                quantity=item.quantity,
                original_price=item.original_price,
                sold_price=item.sold_price,
                subtotal=item.sold_price * item.quantity
            )
        )

    return OrderRead(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status.value,
        items=items,
        created_at=order.created_at
    )


@router.get("/history", response_model=List[OrderRead])
def get_order_history(db: Session = Depends(get_db), current_user=Depends(require_user)):
    orders = get_user_orders_service(db, current_user.id)
    result = []

    for order in orders:
        items = [
            OrderItemRead(
                product_id=item.product_id,
                name=item.product.name,
                quantity=item.quantity,
                original_price=item.original_price,
                sold_price=item.sold_price,
                subtotal=item.sold_price * item.quantity
            )
            for item in order.items
        ]
        result.append(OrderRead(
            id=order.id,
            user_id=order.user_id,
            total_amount=order.total_amount,
            status=order.status.value,
            items=items,
            created_at=order.created_at
        ))

    return result
