# app/models.py
from sqlalchemy import (
    Column, DateTime, Integer, String, Boolean, Numeric, Text, TIMESTAMP, ForeignKey,
    Enum, Date, Table, CheckConstraint, UniqueConstraint, Index, text, func
)
from datetime import datetime
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum
from sqlalchemy.dialects.postgresql import ARRAY


# =========================
# ENUMS
# =========================
class UserRole(enum.Enum):
    admin = "admin"
    customer = "customer"

class OrderStatus(enum.Enum):
    pending = "pending"
    paid = "paid"
    shipped = "shipped"
    completed = "completed"
    cancelled = "cancelled"

class DiscountType(enum.Enum):
    percentage = "percentage"
    flat = "flat"

# =========================
# PRODUCTS-TAGS ASSOCIATION
# =========================
product_tag_map = Table(
    "product_tag_map",
    Base.metadata,
    Column("product_id", ForeignKey("products.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", ForeignKey("product_tags.id", ondelete="CASCADE"), primary_key=True),
    Index("idx_product_tag_map_product", "product_id"),
    Index("idx_product_tag_map_tag", "tag_id"),
)

# =========================
# USERS
# =========================
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    phone = Column(String(20))
    role = Column(Enum(UserRole), default=UserRole.customer)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, server_default="NOW()")

    addresses = relationship("UserAddress", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("ProductReview", back_populates="user")

# =========================
# USER ADDRESSES
# =========================
class UserAddress(Base):
    __tablename__ = "user_addresses"
    __table_args__ = (Index("idx_user_addresses_user_id", "user_id"),)

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    label = Column(String(50))
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255))
    city = Column(String(50), nullable=False)
    state = Column(String(50))
    postal_code = Column(String(20))
    country = Column(String(50), nullable=False)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")

# =========================
# PRODUCTS
# =========================
class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        Index("idx_products_category", "category"),
        Index("idx_products_name", "name"),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    category = Column(String(50))
    price = Column(Numeric(10,2), nullable=False)
    stock = Column(Integer, default=0)
    images = Column(ARRAY(String))
    is_active = Column(Boolean, default=True)
    needs_embedding_update = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, server_default="NOW()")
    updated_at = Column(TIMESTAMP, server_default="NOW()")

    tags = relationship("ProductTag", secondary=product_tag_map, back_populates="products")
    reviews = relationship("ProductReview", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    sales = relationship("ProductSale", back_populates="product")

# =========================
# PRODUCT TAGS
# =========================
class ProductTag(Base):
    __tablename__ = "product_tags"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    color = Column(String(20), default="blue")

    products = relationship("Product", secondary=product_tag_map, back_populates="tags")

# =========================
# DISCOUNTS
# =========================
class Discount(Base):
    __tablename__ = "discounts"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    discount_type = Column(Enum(DiscountType), nullable=False)
    discount_value = Column(Numeric(10,2), nullable=False)
    start_at = Column(TIMESTAMP)
    end_at = Column(TIMESTAMP)
    is_active = Column(Boolean, default=True)

    targets = relationship("DiscountTarget", back_populates="discount")
    order_item_discounts = relationship("OrderItemDiscount", back_populates="discount")

class DiscountTarget(Base):
    __tablename__ = "discount_targets"

    id = Column(Integer, primary_key=True)
    discount_id = Column(Integer, ForeignKey("discounts.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id"))
    category = Column(String(50))

    discount = relationship("Discount", back_populates="targets")

# =========================
# ORDERS
# =========================
class Order(Base):
    __tablename__ = "orders"
    __table_args__ = (Index("idx_orders_user", "user_id"),)

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    total_amount = Column(Numeric(10,2), nullable=False)
    created_at = Column(TIMESTAMP, server_default="NOW()")
    updated_at = Column(TIMESTAMP, server_default="NOW()")

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

# =========================
# ORDER ITEMS
# =========================
class OrderItem(Base):
    __tablename__ = "order_items"
    __table_args__ = (Index("idx_order_items_product", "product_id"),)

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    original_price = Column(Numeric(10,2), nullable=False)
    sold_price = Column(Numeric(10,2), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
    discounts = relationship("OrderItemDiscount", back_populates="order_item")

# =========================
# ORDER ITEM DISCOUNTS
# =========================
class OrderItemDiscount(Base):
    __tablename__ = "order_item_discounts"

    id = Column(Integer, primary_key=True)
    order_item_id = Column(Integer, ForeignKey("order_items.id", ondelete="CASCADE"))
    discount_id = Column(Integer, ForeignKey("discounts.id"))
    discount_amount = Column(Numeric(10,2), nullable=False)

    order_item = relationship("OrderItem", back_populates="discounts")
    discount = relationship("Discount", back_populates="order_item_discounts")

# =========================
# PRODUCT REVIEWS
# =========================
class ProductReview(Base):
    __tablename__ = "product_reviews"
    __table_args__ = (
        UniqueConstraint("product_id", "user_id"),
    )

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    rating = Column(Integer, CheckConstraint("rating BETWEEN 1 AND 5"))
    review = Column(Text)
    created_at = Column(TIMESTAMP, server_default="NOW()")

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")

class ProductSale(Base):
    __tablename__ = "product_sales"
    __table_args__ = (
        UniqueConstraint("product_id", "sale_date"),
        Index("idx_product_sales_product_date", "product_id", "sale_date"),
    )

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    sold_quantity = Column(Integer, default=0)
    revenue = Column(Numeric(12,2), default=0)
    sale_date = Column(Date, server_default=text("CURRENT_DATE"))  # <-- fix here

    product = relationship("Product", back_populates="sales")



class Cart(Base):
    __tablename__ = "carts"

    id = Column(Integer, primary_key=True)

    # one active cart per user
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        onupdate=func.now(),
    )

    items = relationship(
        "CartItem",
        back_populates="cart",
        cascade="all, delete-orphan",
    )


class CartItem(Base):
    __tablename__ = "cart_items"
    __table_args__ = (
        UniqueConstraint("cart_id", "product_id", name="uq_cart_product"),
        CheckConstraint("quantity > 0", name="ck_quantity_positive"),
    )

    id = Column(Integer, primary_key=True)

    cart_id = Column(
        Integer,
        ForeignKey("carts.id", ondelete="CASCADE"),
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False,
    )

    quantity = Column(Integer, nullable=False)

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product")