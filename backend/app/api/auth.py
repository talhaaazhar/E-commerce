from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from app.core.database import get_db
from app.models import User
from app.schemas import UserCreate, UserRead
from app.core.security import hash_password, verify_password, create_access_token
from app.core.logger import logger
from app.core.config import settings

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


# --------------------- SIGNUP ---------------------
@auth_router.post("/signup", response_model=UserRead)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Signup attempt: email={user_data.email}")

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        logger.warning(f"Signup failed - email already registered: {user_data.email}")
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user with hashed password
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        phone=user_data.phone
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    logger.info(f"User created: email={new_user.email} id={new_user.id}")
    return new_user


# --------------------- LOGIN ---------------------
@auth_router.post("/login")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)]
):
    logger.info(f"Login attempt: email={form_data.username}")
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        logger.warning(f"Login failed: email={form_data.username}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # JWT token payload
    token_data = {"sub": user.email, "role": user.role.value}
    access_token = create_access_token(token_data)
    logger.info(f"Login success: email={user.email} role={user.role.value}")

    return {"access_token": access_token, "token_type": "bearer", "role": user.role.value}


# --------------------- CURRENT USER ---------------------
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user
