from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.dependencies import require_admin
from app.schemas import (
    DiscountCreate, DiscountRead, DiscountUpdate, DiscountAssign, DiscountDeassign, DiscountMappingRead
)
from app.services.discount import (
    create_discount_service,
    update_discount_service,
    list_discounts_service,
    assign_discount_service,
    deassign_discount_service,
    deactivate_discount_service,
    activate_discount_service,
    list_discount_mappings_service,
    delete_discount_service
    
)

router = APIRouter(
    prefix="/admin/discounts",
    tags=["Admin Discounts"],
    dependencies=[Depends(require_admin)]
)

@router.post("/", response_model=DiscountRead)
def create_discount(data: DiscountCreate, db: Session = Depends(get_db)):
    discount = create_discount_service(db, data)
    return discount

@router.patch("/{discount_id}", response_model=DiscountRead)
def update_discount(discount_id: int, data: DiscountUpdate, db: Session = Depends(get_db)):
    discount = update_discount_service(db, discount_id, data)
    return discount

@router.get("/", response_model=List[DiscountRead])
def list_discounts(db: Session = Depends(get_db)):
    discounts = list_discounts_service(db)
    return discounts

@router.post("/assign")
def assign_discount(data: DiscountAssign, db: Session = Depends(get_db)):
    return assign_discount_service(db, data)


@router.post("/{discount_id}/deassign")
def deassign_discount(discount_id: int, data: DiscountDeassign, db: Session = Depends(get_db)):
    return deassign_discount_service(db, discount_id, data)


@router.patch("/{discount_id}/deactivate")
def deactivate_discount(
    discount_id: int,
    db: Session = Depends(get_db)
):
    return deactivate_discount_service(db, discount_id)


@router.patch("/{discount_id}/activate")
def activate_discount(
    discount_id: int,
    db: Session = Depends(get_db)
):
    return activate_discount_service(db, discount_id)


# {discount.is_active ? (
#   <Button danger onClick={() => deactivate(discount.id)}>
#     Deactivate
#   </Button>
# ) : (
#   <Button type="primary" onClick={() => activate(discount.id)}>
#     Activate
#   </Button>
# )}

# app/api/admin/discounts.py


@router.get("/mappings", response_model=List[DiscountMappingRead])
def get_discount_mappings(db: Session = Depends(get_db)):
    return list_discount_mappings_service(db)


@router.delete("/{discount_id}")
def delete_discount(
    discount_id: int,
    db: Session = Depends(get_db)
):
    return delete_discount_service(db, discount_id)


