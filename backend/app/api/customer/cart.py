from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from decimal import Decimal
from app.services.pricing import resolve_product_price
from app.core.database import get_db
from app.dependencies import require_user
from app.schemas import (
    CartRead,
    CartItemCreate,
    CartItemUpdate
)
from app.services.cart import (
    get_cart_service,
    add_to_cart_service,
    update_cart_item_service,
    remove_cart_item_service
)

router = APIRouter(
    prefix="/user/cart",
    tags=["User Cart"],
    # dependencies=[Depends(require_user)]
)



def serialize_cart(db, cart) -> CartRead:
    items = []
    total_price = Decimal("0.00")
    total_items = 0

    for item in cart.items:
        price_info = resolve_product_price(db, item.product)

        final_price = price_info["final_price"]
        subtotal = final_price * item.quantity

        total_price += subtotal
        total_items += item.quantity

        items.append({
            "product_id": item.product.id,
            "name": item.product.name,
            "original_price": price_info["original_price"],
            "final_price": final_price,
            "discount_percent": price_info["discount_percent"],
            "quantity": item.quantity,
            "subtotal": subtotal
        })

    return CartRead(
        id=cart.id,
        items=items,
        total_items=total_items,
        total_price=total_price
    )



@router.get("/", response_model=CartRead)
def get_cart(
    db: Session = Depends(get_db),
    current_user=Depends(require_user)
):
    cart = get_cart_service(db, current_user.id)
    return serialize_cart(db, cart)




@router.post("/items", response_model=CartRead)
def add_item_to_cart(
    data: CartItemCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_user)
):
    cart = add_to_cart_service(
        db,
        current_user.id,
        data.product_id,
        data.quantity
    )
    return serialize_cart(db,cart)




@router.put("/items/{product_id}", response_model=CartRead)
def update_cart_item(
    product_id: int,
    data: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_user)
):
    cart = update_cart_item_service(
        db,
        current_user.id,
        product_id,
        data.quantity
    )
    return serialize_cart(db, cart)





@router.delete("/items/{product_id}", response_model=CartRead)
def remove_cart_item(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_user)
):
    cart = remove_cart_item_service(
        db,
        current_user.id,
        product_id
    )
    return serialize_cart(db, cart)
