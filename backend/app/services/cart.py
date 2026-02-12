from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import Cart, CartItem, Product
from fastapi import HTTPException, status


def get_or_create_cart(db: Session, user_id: int) -> Cart:
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart


def get_cart_service(db: Session, user_id: int) -> Cart:
    cart = get_or_create_cart(db, user_id)
    return cart



def add_to_cart_service(db: Session, user_id: int, product_id: int, quantity: int) -> Cart:
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.is_active.is_(True)
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if product.stock < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    cart = get_or_create_cart(db, user_id)

    item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()

    if item:
        item.quantity += quantity
    else:
        item = CartItem(
            cart_id=cart.id,
            product_id=product_id,
            quantity=quantity
        )
        db.add(item)

    db.commit()
    db.refresh(cart)
    return cart

def update_cart_item_service(
    db: Session,
    user_id: int,
    product_id: int,
    quantity: int
) -> Cart:
    cart = get_or_create_cart(db, user_id)

    item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    if item.product.stock < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")

    item.quantity = quantity
    db.commit()
    db.refresh(cart)
    return cart

def remove_cart_item_service(db: Session, user_id: int, product_id: int) -> Cart:
    cart = get_or_create_cart(db, user_id)

    item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    db.delete(item)
    db.commit()
    db.refresh(cart)
    return cart
