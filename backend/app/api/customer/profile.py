from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models import User
from app.schemas import (
    UserRead, 
    UserProfileUpdate,    
    AddressCreate,
    AddressUpdate,
    AddressResponse)

from app.services import profile

router = APIRouter(
        prefix="/user/profile", 
        tags=["User Profile"]
    )

@router.get(
    "",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.put(
    "",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
)
def update_profile(
    payload: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if payload.name is not None:
        current_user.name = payload.name

    if payload.phone is not None:
        current_user.phone = payload.phone

    db.commit()
    db.refresh(current_user)

    return current_user





@router.get("", response_model=list[AddressResponse])
def list_addresses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return profile.list_user_addresses(db, current_user.id)


@router.post("", response_model=AddressResponse, status_code=status.HTTP_201_CREATED)
def create_address(payload: AddressCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return profile.create_user_address(db, current_user.id, payload)


@router.put("/{address_id}", response_model=AddressResponse)
def update_address(address_id: int, payload: AddressUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return profile.update_user_address(db, current_user.id, address_id, payload)


@router.delete("/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(address_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    profile.delete_user_address(db, current_user.id, address_id)
