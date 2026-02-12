from decimal import Decimal
from datetime import datetime
from app.models import Product, Discount, DiscountTarget, DiscountType


def resolve_product_price(db, product: Product):
    """
    Returns:
    {
        original_price,
        final_price,
        discount_percent | None
    }
    """
    now = datetime.utcnow()

    discount = (
        db.query(Discount)
        .join(DiscountTarget)
        .filter(
            Discount.is_active.is_(True),
            Discount.start_at <= now,
            Discount.end_at >= now,
            DiscountTarget.product_id == product.id
        )
        .first()
    )

    original_price = product.price

    if not discount:
        return {
            "original_price": original_price,
            "final_price": original_price,
            "discount_percent": None
        }

    if discount.discount_type == DiscountType.percentage:
        discount_amount = (original_price * discount.discount_value) / Decimal("100")
    else:
        discount_amount = discount.discount_value

    final_price = max(original_price - discount_amount, Decimal("0.00"))

    discount_percent = (
        discount.discount_value
        if discount.discount_type == DiscountType.percentage
        else None
    )

    return {
        "original_price": original_price,
        "final_price": final_price,
        "discount_percent": discount_percent
    }
