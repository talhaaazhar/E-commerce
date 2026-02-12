from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from decimal import Decimal
from app.models import Cart, CartItem, Product, Order, OrderItem, OrderStatus
from app.services.pricing import resolve_product_price
from fastapi import HTTPException, status
from datetime import datetime

def checkout_service(db: Session, user_id: int) -> Order:
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total_amount = Decimal("0.00")
    order_items = []

    try:
        # start transaction
        for item in cart.items:
            # Recompute price
            price_info = resolve_product_price(db, item.product)
            final_price = price_info["final_price"]

            if item.product.stock < item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Not enough stock for product {item.product.name}"
                )

            subtotal = final_price * item.quantity
            total_amount += subtotal

            order_item = OrderItem(
                product_id=item.product.id,
                quantity=item.quantity,
                original_price=item.product.price,
                sold_price=final_price
            )
            order_items.append(order_item)

            # Deduct stock
            item.product.stock -= item.quantity

        # Create Order
        order = Order(
            user_id=user_id,
            total_amount=total_amount,
            status=OrderStatus.pending,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            items=order_items
        )
        db.add(order)

        # Clear cart
        db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        db.commit()
        db.refresh(order)

        return order

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Checkout failed")



def get_user_orders_service(db: Session, user_id: int):
    orders = db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc()).all()
    return orders



def list_all_orders_service(db: Session, status: str = None, user_id: int = None):
    query = db.query(Order)

    if status:
        try:
            query = query.filter(Order.status == OrderStatus(status))
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid order status")

    if user_id:
        query = query.filter(Order.user_id == user_id)

    return query.order_by(Order.created_at.desc()).all()


def list_pending_orders_service(db: Session):
    return list_all_orders_service(db=db, status="pending")


def update_order_status_service(db: Session, order_id: int, new_status: str):
    try:
        status_enum = OrderStatus(new_status)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid order status")

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status_enum
    db.commit()
    db.refresh(order)
    return order

