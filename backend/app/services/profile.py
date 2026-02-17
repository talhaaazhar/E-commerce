from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.core.security import verify_password, hash_password
from app.models import User, UserAddress


# =========================
# LIST ADDRESSES
# =========================
def list_user_addresses(db: Session, user_id: int):
    return (
        db.query(UserAddress)
        .filter(UserAddress.user_id == user_id)
        .order_by(UserAddress.is_default.desc())
        .all()
    )


# =========================
# CREATE ADDRESS
# =========================
def create_user_address(db: Session, user_id: int, payload):
    # unset previous default if this is default
    if payload.is_default:
        db.query(UserAddress).filter(
            UserAddress.user_id == user_id,
            UserAddress.is_default == True,
        ).update({"is_default": False})

    address = UserAddress(
        **payload.dict(),
        user_id=user_id,
    )

    db.add(address)
    db.commit()
    db.refresh(address)
    return address


# =========================
# UPDATE ADDRESS
# =========================
def update_user_address(db: Session, user_id: int, address_id: int, payload):
    address = db.query(UserAddress).filter(
        UserAddress.id == address_id,
        UserAddress.user_id == user_id,
    ).first()

    if not address:
        raise HTTPException(status_code=404, detail="Address not found")

    if payload.is_default:
        db.query(UserAddress).filter(
            UserAddress.user_id == user_id,
            UserAddress.is_default == True,
        ).update({"is_default": False})

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(address, field, value)

    db.commit()
    db.refresh(address)
    return address


# =========================
# DELETE ADDRESS
# =========================
def delete_user_address(db: Session, user_id: int, address_id: int):
    address = db.query(UserAddress).filter(
        UserAddress.id == address_id,
        UserAddress.user_id == user_id,
    ).first()

    if not address:
        raise HTTPException(status_code=404, detail="Address not found")

    db.delete(address)
    db.commit()


def change_user_password(db: Session, user_id: int, old_password: str, new_password: str):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None, "User not found"

    # verify old password
    if not verify_password(old_password, user.password):
        return None, "Old password is incorrect"

    user.password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    return user, None