from pydantic import BaseModel, EmailStr, Field, condecimal
from datetime import datetime
from typing import Optional, List 
from decimal import Decimal
from enum import Enum
from datetime import date


# ------------------- USER -------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)
    phone: Optional[str] = None

class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ------------------- PRODUCT -------------------

class ProductCreate(BaseModel):
    name: str = Field(..., max_length=150)
    description: Optional[str] = None
    category: Optional[str] = None
    price: Decimal
    stock: int = 0
    images: Optional[List[str]] = []
    tag_names: Optional[List[str]] = []  # tag names like ["new", "sale"]

class ProductRead(BaseModel):
    id: int
    name: str
    description: Optional[str]
    category: Optional[str]
    price: Decimal
    stock: int
    images: Optional[List[str]]
    is_active: bool
    needs_embedding_update: bool
    tags: List[str]
    created_at: datetime

    class Config:
        from_attributes = True

class ProductCardRead(ProductRead):
    avg_rating: Optional[float] = None
    review_count: Optional[int] = 0
    discounted_price: Optional[Decimal] = None
    discount_percent: Optional[float] = None

class ProductReviewRead(BaseModel):
    id: int
    rating: int
    review: Optional[str]
    created_at: datetime
    user_name: str

    class Config:
        from_attributes = True


class ProductDetailRead(ProductCardRead):
    reviews: List[ProductReviewRead]=[]




class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=150)
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[Decimal] = None
    stock: Optional[int] = None
    images: Optional[List[str]] = None
    is_active: Optional[bool] = None
    tag_names: Optional[List[str]] = None


class ProductFilter(BaseModel):
    search: Optional[str] = None
    category: Optional[str] = None
    tag_names: Optional[List[str]] = None
    min_price: Optional[Decimal] = Field(None, ge=0)
    max_price: Optional[Decimal] = Field(None, ge=0)
    in_stock: Optional[bool] = None
    is_active: Optional[bool] = None
    min_rating: Optional[float] = Field(None, ge=0, le=5)
    on_sale: Optional[bool] = None
    skip: int = Field(0, ge=0)
    limit: int = Field(20, ge=1)




# class CartItemRead(BaseModel):
#     product_id: int
#     name: str
#     price: Decimal
#     quantity: int
#     subtotal: Decimal

class CartItemRead(BaseModel):
    product_id: int
    name: str
    original_price: Decimal
    final_price: Decimal
    discount_percent: Optional[float]
    quantity: int
    subtotal: Decimal


class CartRead(BaseModel):
    id: int
    items: List[CartItemRead]
    total_items: int
    total_price: Decimal


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class CartItemUpdate(BaseModel):
    quantity: int = Field(gt=0)


#############order schemas###############

class OrderItemRead(BaseModel):
    product_id: int
    name: str
    quantity: int
    original_price: Decimal
    sold_price: Decimal
    subtotal: Decimal

class OrderRead(BaseModel):
    id: int
    user_id: int
    total_amount: Decimal
    status: str
    items: List[OrderItemRead]
    created_at: datetime


### Discount Schemas


class DiscountType(str, Enum):
    percentage = "percentage"
    flat = "flat"

# For creating a discount
class DiscountCreate(BaseModel):
    name: str
    discount_type: DiscountType
    discount_value: Decimal = Field(..., gt=0)
    start_at: Optional[datetime]
    end_at: Optional[datetime]
    is_active: bool = True

# For updating discount
class DiscountUpdate(BaseModel):
    name: Optional[str]=None
    discount_type: Optional[DiscountType]=None
    discount_value: Optional[Decimal] = Field(None, gt=0)
    start_at: Optional[datetime]=None
    end_at: Optional[datetime]=None
    is_active: Optional[bool]=None

# For assigning discount to products or categories
class DiscountAssign(BaseModel):
    discount_id: int
    product_ids: Optional[List[int]] = []
    category: Optional[str]=None

# For reading discount info
class DiscountRead(BaseModel):
    id: int
    name: str
    discount_type: DiscountType
    discount_value: Decimal = Field(..., gt=0)
    start_at: Optional[datetime]
    end_at: Optional[datetime]
    is_active: bool
    products: List[str] = []
    categories: List[str] = []

    class Config:
        from_attributes = True



class DiscountProductRead(BaseModel):
    id: int
    name: str

class DiscountMappingRead(BaseModel):
    discount_id: int
    name: str
    discount_type: DiscountType
    discount_value: Decimal
    is_active: bool
    products: list[DiscountProductRead]
    categories: list[str]

## Analytics Schemas

class SalesOverTimeRead(BaseModel):
    date: date
    revenue: Decimal
    orders: int

class ProductSalesRead(BaseModel):
    product_id: int
    product_name: str
    total_quantity: int
    revenue: Decimal
    revenue_percentage: float

class RevenueByProductRead(BaseModel):
    product_id: int
    product_name: str
    category: str | None
    total_quantity: int
    revenue: Decimal