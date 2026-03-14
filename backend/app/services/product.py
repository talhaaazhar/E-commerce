
from sqlalchemy.orm import Session, selectinload
from typing import List, Optional
from fastapi import HTTPException, status
from app.schemas import ProductCreate, ProductRead, ProductUpdate, ProductFilter, ProductCardRead, ProductDetailRead, ProductReviewRead
from app.models import ProductTag, Product, ProductReview, ProductSale,ProductReview, DiscountTarget, Discount
from sqlalchemy import func, or_
from datetime import datetime
from app.crud.product import (
    create_product,
    get_product_by_id,
    update_product,
    deactivate_product,
    activate_product,
    hard_delete_product,
    
)

def _to_product_read(product) -> ProductRead:
    return ProductRead(
        id=product.id,
        name=product.name,
        description=product.description,
        category=product.category,
        price=product.price,
        stock=product.stock,
        images=product.images,
        is_active=product.is_active,
        needs_embedding_update=product.needs_embedding_update,
        tags=[tag.name for tag in product.tags],
        created_at=product.created_at,
    )



##
from decimal import Decimal
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.models import Product, ProductReview, DiscountTarget, Discount
from app.schemas import ProductCardRead


def _to_product_card_reads(
    db: Session,
    products: List[Product]
) -> List[ProductCardRead]:

    if not products:
        return []

    product_ids = [p.id for p in products]

    # ---------- Ratings ----------
    rating_rows = (
        db.query(
            ProductReview.product_id,
            func.avg(ProductReview.rating).label("avg_rating"),
            func.count(ProductReview.id).label("review_count"),
        )
        .filter(ProductReview.product_id.in_(product_ids))
        .group_by(ProductReview.product_id)
        .all()
    )

    rating_map = {
        r.product_id: (float(r.avg_rating), r.review_count)
        for r in rating_rows
    }

    # ---------- Active Discounts ----------
    now = datetime.utcnow()

    discount_rows = (
        db.query(
            DiscountTarget.product_id,
            Discount.discount_type,
            Discount.discount_value,
        )
        .join(DiscountTarget.discount)
        .filter(
            DiscountTarget.product_id.in_(product_ids),
            Discount.is_active.is_(True),
            Discount.start_at <= now,
            Discount.end_at >= now,
        )
        .all()
    )

    # pick BEST discount per product
    discount_map = {}
    for d in discount_rows:
        existing = discount_map.get(d.product_id)
        if not existing or d.discount_value > existing.discount_value:
            discount_map[d.product_id] = d

    # ---------- Build response ----------
    result = []

    for p in products:
        avg_rating, review_count = rating_map.get(p.id, (0.0, 0))
        discount = discount_map.get(p.id)

        discounted_price = None
        discount_percent = None

        if discount:
            if discount.discount_type.value == "percentage":
                discount_percent = float(discount.discount_value)
                discounted_price = (
                    p.price
                    * (Decimal("1") - Decimal(discount_percent) / Decimal("100"))
                )
            else:
                discounted_price = max(
                    p.price - Decimal(discount.discount_value),
                    Decimal("0")
                )

        result.append(
            ProductCardRead(
                id=p.id,
                name=p.name,
                description=p.description,
                category=p.category,
                price=p.price,
                stock=p.stock,
                images=p.images,
                is_active=p.is_active,
                needs_embedding_update=p.needs_embedding_update,
                tags=[t.name for t in p.tags],
                created_at=p.created_at,
                avg_rating=avg_rating,
                review_count=review_count,
                discounted_price=discounted_price,
                discount_percent=discount_percent,
            )
        )

    return result


def to_product_card_read(db: Session, product: Product) -> ProductCardRead:
    """
    Convert a single Product to ProductCardRead with ratings and discounts.
    Wrapper around _to_product_card_reads for single product.
    """
    result = _to_product_card_reads(db, [product])
    return result[0] if result else None


##

def create_product_service(db: Session, data: ProductCreate) -> Product:
    """
    Full product creation use-case:
    - Resolve tags (get or create)
    - Create product
    - Commit transaction
    """
    try:
        tags: List[ProductTag] = []

        if data.tag_names:
            # Fetch existing tags
            existing_tags = (
                db.query(ProductTag)
                .filter(ProductTag.name.in_(data.tag_names))
                .all()
            )

            tag_map = {tag.name: tag for tag in existing_tags}

            # Create missing tags
            for tag_name in data.tag_names:
                if tag_name not in tag_map:
                    new_tag = ProductTag(name=tag_name)
                    db.add(new_tag)
                    tag_map[tag_name] = new_tag

            tags = list(tag_map.values())

        # Create product
        product = create_product(db=db, data=data, tags=tags)

        # Commit once
        db.commit()
        db.refresh(product)

        return product

    except Exception:
        db.rollback()
        raise



def update_product_service(
    db: Session,
    product_id: int,
    data: ProductUpdate,
):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    # -------- RAG LOGIC --------
    if (
        ("name" in data.model_dump(exclude_unset=True) and data.name != product.name)
        or (
            "description" in data.model_dump(exclude_unset=True)
            and data.description != product.description
        )
    ):
        product.needs_embedding_update = True

    # -------- TAG HANDLING --------
    tags: List[ProductTag] | None = None

    if data.tag_names is not None:
        existing_tags = (
            db.query(ProductTag)
            .filter(ProductTag.name.in_(data.tag_names))
            .all()
        )

        tag_map = {tag.name: tag for tag in existing_tags}

        for tag_name in data.tag_names:
            if tag_name not in tag_map:
                new_tag = ProductTag(name=tag_name)
                db.add(new_tag)
                tag_map[tag_name] = new_tag

        tags = list(tag_map.values())

    update_product(db, product, data, tags)

    db.commit()
    db.refresh(product)
    return product



def get_product_or_404(db: Session, product_id: int) -> Product:
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product



def deactivate_product_service(db: Session, product_id: int):
    product = get_product_or_404(db, product_id)

    if not product.is_active:
        return product  # idempotent

    deactivate_product(db, product)
    db.commit()
    db.refresh(product)
    return product


def activate_product_service(db: Session, product_id: int):
    product = get_product_or_404(db, product_id)

    if product.is_active:
        return product  # idempotent

    activate_product(db, product)
    db.commit()
    db.refresh(product)
    return product



def hard_delete_product_service(db: Session, product_id: int):
    product = get_product_or_404(db, product_id)

    try:
        hard_delete_product(db, product)
        db.commit()
    except Exception:
        db.rollback()
        raise









def list_products_service(
    db: Session,
    filters: ProductFilter
) -> List[Product]:

    query = (
        db.query(Product)
        .options(
            selectinload(Product.tags)  # ✅ fix N+1
        )
    )

    # ---------- Filters ----------

    if filters.is_active is not None:
        query = query.filter(Product.is_active.is_(filters.is_active))

    if filters.search:
        query = query.filter(
            or_(
                Product.name.ilike(f"%{filters.search}%"),
                Product.description.ilike(f"%{filters.search}%")
            )
        )

    if filters.category:
        query = query.filter(Product.category == filters.category)

    if filters.min_price is not None:
        query = query.filter(Product.price >= filters.min_price)

    if filters.max_price is not None:
        query = query.filter(Product.price <= filters.max_price)

    if filters.in_stock is not None:
        query = query.filter(Product.stock > 0 if filters.in_stock else Product.stock == 0)

    if filters.tag_names:
        query = query.join(Product.tags).filter(ProductTag.name.in_(filters.tag_names))

    if filters.min_rating is not None:
        avg_rating_subq = (
            db.query(
                ProductReview.product_id,
                func.avg(ProductReview.rating).label("avg_rating")
            )
            .group_by(ProductReview.product_id)
            .subquery()
        )

        query = (
            query.join(avg_rating_subq, Product.id == avg_rating_subq.c.product_id)
            .filter(avg_rating_subq.c.avg_rating >= filters.min_rating)
        )

    if filters.on_sale:
        now = datetime.utcnow()
        query = (
            query.join(DiscountTarget, DiscountTarget.product_id == Product.id)
            .join(Discount, Discount.id == DiscountTarget.discount_id)
            .filter(
                Discount.is_active.is_(True),
                Discount.start_at <= now,
                Discount.end_at >= now
            )
        )

    # ---------- Pagination ----------
    query = query.offset(filters.skip).limit(filters.limit)

    return query.all()



def get_product_detail_service(
    db: Session,
    product_id: int,
    review_skip: int = 0,
    review_limit: int = 10
) -> ProductDetailRead:
    """
    Returns detailed product info including all card info and paginated reviews.
    """
    # Fetch the product
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Reuse product card logic
    product_card = _to_product_card_reads(db, [product])[0]

    #  Fetch reviews with user info (paginated)
    reviews = (
        db.query(ProductReview)
        .join(ProductReview.user)
        .filter(ProductReview.product_id == product.id)
        .order_by(ProductReview.created_at.desc())
        .offset(review_skip)
        .limit(review_limit)
        .all()
    )

    review_reads = [
        ProductReviewRead(
            id=r.id,
            rating=r.rating,
            review=r.review,
            created_at=r.created_at,
            user_name=r.user.name,
        )
        for r in reviews
    ]

    # Merge into detail response
    product_detail = ProductDetailRead(
        **product_card.dict(),
        reviews=review_reads
    )

    return product_detail



from pathlib import Path
import uuid
import shutil
from fastapi import UploadFile
from sqlalchemy.orm.attributes import flag_modified

UPLOAD_DIR = Path("media/products")


def add_product_image(
    db: Session,
    product_id: int,
    file: UploadFile,
) -> str:
    product = get_product_or_404(db, product_id)

    print(f"[IMAGE UPLOAD] Starting upload for product {product_id}, file: {file.filename}")
    print(f"[IMAGE UPLOAD] Content type: {file.content_type}")
    print(f"[IMAGE UPLOAD] Current images before: {product.images}")

    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        print(f"[IMAGE UPLOAD] Invalid content type: {file.content_type}")
        raise HTTPException(status_code=400, detail="Invalid image type")

    product_folder = UPLOAD_DIR / str(product_id)
    product_folder.mkdir(parents=True, exist_ok=True)

    file_ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{file_ext}"
    file_path = product_folder / filename

    print(f"[IMAGE UPLOAD] Saving to path: {file_path}")
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/media/products/{product_id}/{filename}"
    print(f"[IMAGE UPLOAD] Image saved, URL: {image_url}")

    # Properly handle ARRAY field initialization
    if product.images is None:
        product.images = [image_url]
        print(f"[IMAGE UPLOAD] Created new images array from None")
    elif len(product.images) == 0:
        product.images = [image_url]
        print(f"[IMAGE UPLOAD] Created new images array from empty list")
    else:
        product.images.append(image_url)
        print(f"[IMAGE UPLOAD] Appended to existing images, total count: {len(product.images)}")

    # CRITICAL: Mark the column as modified so SQLAlchemy detects the change
    # This is necessary for PostgreSQL ARRAY mutations
    flag_modified(product, "images")
    print(f"[IMAGE UPLOAD] Flagged 'images' column as modified")

    db.commit()
    db.refresh(product)
    
    print(f"[IMAGE UPLOAD] Product saved, current images: {product.images}")

    return image_url

def remove_product_image_service(db: Session, product_id: int, image_url: str):
    # Get the actual Product model object (not the schema) so we can modify it
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    print(f"[IMAGE REMOVAL] Attempting to remove image: {image_url}")
    print(f"[IMAGE REMOVAL] Current images: {product.images}")
    print(f"[IMAGE REMOVAL] Images type: {type(product.images)}")

    # Handle case where images might be None
    if not product.images:
        print(f"[IMAGE REMOVAL] Product has no images (images is None or empty)")
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Ensure images is a list (convert if needed)
    if not isinstance(product.images, list):
        print(f"[IMAGE REMOVAL] Warning: images is not a list, type is {type(product.images)}")
        product.images = list(product.images) if product.images else []
    
    if image_url not in product.images:
        print(f"[IMAGE REMOVAL] Image not found in product images")
        print(f"[IMAGE REMOVAL] Expected: {image_url}")
        print(f"[IMAGE REMOVAL] Available: {product.images}")
        raise HTTPException(status_code=404, detail="Image not found")

    product.images.remove(image_url)
    print(f"[IMAGE REMOVAL] Image removed from list, remaining count: {len(product.images)}")

    # CRITICAL: Mark the column as modified so SQLAlchemy detects the change
    flag_modified(product, "images")
    print(f"[IMAGE REMOVAL] Flagged 'images' column as modified")

    db.commit()
    db.refresh(product)
    
    print(f"[IMAGE REMOVAL] Product saved, current images: {product.images}")

    return product



