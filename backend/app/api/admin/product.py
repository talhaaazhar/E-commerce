from fastapi import APIRouter, Depends, status, Query, UploadFile, File, BackgroundTasks
from typing import List, Optional
from decimal import Decimal
from sqlalchemy.orm import Session
from app.schemas import ProductCreate, ProductRead, ProductUpdate, ProductFilter, ProductCardRead
from app.services.product import (
    create_product_service,
    update_product_service,
    deactivate_product_service,
    activate_product_service,
    hard_delete_product_service,
    list_products_service,
    _to_product_read,
    list_products_service, 
    _to_product_card_reads, 
    get_product_detail_service,
    add_product_image,
    remove_product_image_service

    
)
from app.core.database import get_db
from app.dependencies import require_admin
from app.rag.product_indexer import (
    index_products_safe,
    delete_product_from_index_safe,
    reindex_all_products_safe,
)


# from app.rag.product_indexer import index_products
# from app.rag.pinecone_client import get_index
# index = get_index()

router = APIRouter(
    prefix="/admin/products",
    tags=["Admin Products"],
    dependencies=[Depends(require_admin)]
)

@router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: ProductCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
    
):
    product = create_product_service(db, product_data)
    # background_tasks.add_task(index_products, db)
    # background_tasks.add_task(index_products_safe, db)
    background_tasks.add_task(index_products_safe, db, product_ids=[product.id])


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
        created_at=product.created_at
    )


@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    data: ProductUpdate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    product = update_product_service(db, product_id, data)
    # # background_tasks.add_task(index_products, db)
    # background_tasks.add_task(index_products_safe, db)
    background_tasks.add_task(index_products_safe, db, product_ids=[product.id])

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




@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
def deactivate_product(
    product_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    
  
):
    product = deactivate_product_service(db, product_id)
     # Remove from Pinecone
    # background_tasks.add_task(index.delete, ids=[str(product.id)])
    background_tasks.add_task(delete_product_from_index_safe, product.id)
    return {
        "message": "Product deactivated successfully",
        "product_id": product.id,
        "is_active": product.is_active,
    }


@router.delete("/{product_id}/hard", status_code=status.HTTP_204_NO_CONTENT)
def hard_delete_product(
    product_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    hard_delete_product_service(db, product_id)
    # background_tasks.add_task(index.delete, ids=[str(product_id)])
    background_tasks.add_task(delete_product_from_index_safe, product_id)


@router.patch("/{product_id}/activate", response_model=ProductRead)
def activate_product(
    product_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
   
):
    product = activate_product_service(db, product_id)
    # background_tasks.add_task(index_products, db)
    # background_tasks.add_task(index_products_safe, db)
    background_tasks.add_task(index_products_safe, db, product_ids=[product.id])

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




@router.get("/", response_model=List[ProductCardRead])
def list_products_user(
    filters: ProductFilter = Depends(),
    db: Session = Depends(get_db)
):
    # filters.is_active = True
    products = list_products_service(db=db, filters=filters)
    return _to_product_card_reads(db, products)



# for images and media files, we will serve them from /media endpoint using StaticFiles in main.py. So the image URLs stored in the database should be relative to that, e.g. "media/product_images/image1.jpg".
@router.post("/{product_id}/images")
def upload_product_image(
    product_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    image_url = add_product_image(
        db=db,
        product_id=product_id,
        file=file,
    )

    return {
        "message": "Image uploaded successfully",
        "image_url": image_url,
    }


@router.delete("/{product_id}/images")
def remove_product_image(
    product_id: int,
    image_url: str = Query(...),
    db: Session = Depends(get_db),
):
    remove_product_image_service(
        db=db,
        product_id=product_id,
        image_url=image_url,
    )

    return {"message": "Image removed successfully"}


@router.delete("/index/test-vector", status_code=status.HTTP_200_OK)
def delete_test_vector():
    delete_product_from_index_safe("test1")
    return {"message": "Test vector removed from Pinecone", "vector_id": "test1"}


@router.post("/index/rebuild", status_code=status.HTTP_200_OK)
def rebuild_product_index(
    active_only: bool = Query(True, description="Reindex only active products"),
    wipe_first: bool = Query(True, description="Delete all existing vectors before reinserting (removes stale/test records)"),
    db: Session = Depends(get_db),
):
    total = reindex_all_products_safe(db, active_only=active_only, wipe_first=wipe_first)
    return {
        "message": "Product index rebuild completed",
        "indexed_products": total,
        "active_only": active_only,
        "wiped_first": wipe_first,
    }