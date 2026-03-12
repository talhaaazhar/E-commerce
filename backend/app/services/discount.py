from sqlalchemy.orm import Session, joinedload
from app.models import Discount, DiscountTarget, Product, OrderItemDiscount
from fastapi import HTTPException
from typing import List
from datetime import datetime

def create_discount_service(db: Session, data):
    discount = Discount(**data.dict())
    db.add(discount)
    db.commit()
    db.refresh(discount)
    return discount

def update_discount_service(db: Session, discount_id: int, data):
    discount = db.query(Discount).filter(Discount.id == discount_id).first()
    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")

    for field, value in data.dict(exclude_unset=True).items():
        setattr(discount, field, value)

    db.commit()
    db.refresh(discount)
    return discount

def list_discounts_service(db: Session):
    """List all discounts with their assigned products and categories."""
    discounts = (
        db.query(Discount)
        .options(joinedload(Discount.targets))
        .all()
    )

    result = []

    for discount in discounts:
        products = []
        categories = set()

        for target in discount.targets:
            if target.product_id:
                product = db.query(Product).filter(Product.id == target.product_id).first()
                if product:
                    products.append(product.name)

            if target.category:
                categories.add(target.category)

        result.append({
            "id": discount.id,
            "name": discount.name,
            "discount_type": discount.discount_type,
            "discount_value": discount.discount_value,
            "is_active": discount.is_active,
            "start_at": discount.start_at,
            "end_at": discount.end_at,
            "products": products,
            "categories": list(categories),
        })

    return result

# def assign_discount_service(db: Session, data):
#     discount = db.query(Discount).filter(Discount.id == data.discount_id).first()
#     if not discount:
#         raise HTTPException(status_code=404, detail="Discount not found")

#     # assign by products
#     if data.product_ids:
#         for pid in data.product_ids:
#             target = DiscountTarget(discount_id=discount.id, product_id=pid)
#             db.add(target)

#     # assign by category
#     if data.category:
#         target = DiscountTarget(discount_id=discount.id, category=data.category)
#         db.add(target)

#     db.commit()
#     return {"message": "Discount assigned successfully"}



def assign_discount_service(db: Session, data):
    if (not data.product_ids) and (not data.category):
        raise HTTPException(
            status_code=400,
            detail="Provide at least one product_id or a category"
        )

    discount = db.query(Discount).filter(
        Discount.id == data.discount_id,
        Discount.is_active == True
    ).first()

    if not discount:
        raise HTTPException(status_code=404, detail="Active discount not found")

    # Assign by product IDs
    if data.product_ids:
        products = db.query(Product).filter(
            Product.id.in_(data.product_ids)
        ).all()

        found_ids = {p.id for p in products}
        missing_ids = set(data.product_ids) - found_ids

        if missing_ids:
            raise HTTPException(
                status_code=404,
                detail=f"Products not found: {list(missing_ids)}"
            )

        for product in products:
            exists = db.query(DiscountTarget).filter_by(
                discount_id=discount.id,
                product_id=product.id
            ).first()

            if not exists:
                db.add(
                    DiscountTarget(
                        discount_id=discount.id,
                        product_id=product.id
                    )
                )

    # Assign by category (string-based)
    if data.category:
        product_exists = db.query(Product).filter(
            Product.category == data.category
        ).first()

        if not product_exists:
            raise HTTPException(
                status_code=404,
                detail="No products found for this category"
            )

        exists = db.query(DiscountTarget).filter_by(
            discount_id=discount.id,
            category=data.category
        ).first()

        if not exists:
            db.add(
                DiscountTarget(
                    discount_id=discount.id,
                    category=data.category
                )
            )

    db.commit()
    return {"message": "Discount assigned successfully"}



def deactivate_discount_service(db: Session, discount_id: int):
    discount = db.query(Discount).filter(
        Discount.id == discount_id
    ).first()

    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")

    if not discount.is_active:
        raise HTTPException(
            status_code=400,
            detail="Discount already inactive"
        )

    discount.is_active = False
    db.commit()
    db.refresh(discount)

    return {"message": "Discount deactivated successfully"}



def activate_discount_service(db: Session, discount_id: int):
    discount = db.query(Discount).filter(
        Discount.id == discount_id
    ).first()

    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")

    if discount.is_active:
        raise HTTPException(
            status_code=400,
            detail="Discount is already active"
        )

    now = datetime.utcnow()

    if discount.start_at and discount.start_at > now:
        raise HTTPException(
            status_code=400,
            detail="Discount start date is in the future"
        )

    if discount.end_at and discount.end_at < now:
        raise HTTPException(
            status_code=400,
            detail="Discount has already expired"
        )

    discount.is_active = True
    db.commit()
    db.refresh(discount)

    return {"message": "Discount activated successfully"}



# app/services/discount.py



def list_discount_mappings_service(db: Session):
    discounts = (
        db.query(Discount)
        .options(joinedload(Discount.targets))
        .all()
    )

    result = []

    for discount in discounts:
        products = []
        categories = set()

        for target in discount.targets:
            if target.product_id:
                product = db.query(Product).filter(Product.id == target.product_id).first()
                if product:
                    products.append({
                        "id": product.id,
                        "name": product.name
                    })

            if target.category:
                categories.add(target.category)

        result.append({
            "discount_id": discount.id,
            "name": discount.name,
            "discount_type": discount.discount_type,
            "discount_value": discount.discount_value,
            "is_active": discount.is_active,
            "products": products,
            "categories": list(categories),
        })

    return result



def deassign_discount_service(db: Session, discount_id: int, data):
    """Remove products or categories from a discount."""
    if (not data.product_ids) and (not getattr(data, "product_names", None)) and (not data.category):
        raise HTTPException(
            status_code=400,
            detail="Provide at least one product_id, product_name, or a category"
        )

    discount = db.query(Discount).filter(
        Discount.id == discount_id
    ).first()

    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")

    # Remove by product IDs
    if data.product_ids:
        db.query(DiscountTarget).filter(
            DiscountTarget.discount_id == discount_id,
            DiscountTarget.product_id.in_(data.product_ids)
        ).delete(synchronize_session=False)

    # Remove by product names
    product_names = getattr(data, "product_names", None) or []
    if product_names:
        matched_products = db.query(Product).filter(Product.name.in_(product_names)).all()
        matched_ids = [p.id for p in matched_products]
        if matched_ids:
            db.query(DiscountTarget).filter(
                DiscountTarget.discount_id == discount_id,
                DiscountTarget.product_id.in_(matched_ids)
            ).delete(synchronize_session=False)

    # Remove by category
    if data.category:
        db.query(DiscountTarget).filter(
            DiscountTarget.discount_id == discount_id,
            DiscountTarget.category == data.category
        ).delete(synchronize_session=False)

        # Optional: also remove product-specific assignments for products in this category
        if getattr(data, "remove_category_products", True):
            category_product_ids = db.query(Product.id).filter(Product.category == data.category)
            db.query(DiscountTarget).filter(
                DiscountTarget.discount_id == discount_id,
                DiscountTarget.product_id.in_(category_product_ids)
            ).delete(synchronize_session=False)

    db.commit()
    return {"message": "Discount deassigned successfully"}


def delete_discount_service(db: Session, discount_id: int):
    discount = db.query(Discount).filter(
        Discount.id == discount_id
    ).first()

    if not discount:
        raise HTTPException(status_code=404, detail="Discount not found")

    # Check if discount was used in any order
    used = db.query(OrderItemDiscount).filter(
        OrderItemDiscount.discount_id == discount.id
    ).first()

    if used:
        raise HTTPException(
            status_code=400,
            detail="Discount already used in orders and cannot be deleted"
        )

    # Remove assignments first
    db.query(DiscountTarget).filter(
        DiscountTarget.discount_id == discount.id
    ).delete()

    # Delete discount
    db.delete(discount)
    db.commit()

    return {"message": "Discount deleted successfully"}
