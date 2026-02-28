from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.middlewares.logging import LoggingMiddleware
from app.api import auth
from app.api.admin import product as admin_product
from app.api.customer import product as customer_product
from app.api.customer import cart as customer_cart
from app.api.customer import order as customer_order
from app.api.admin import order as admin_order
from app.api.admin import discount as admin_discount
from app.api.admin import analytics as admin_analytics
from app.api.customer import reviews as customer_reviews
from app.api.customer import like as customer_like
from app.api.customer import profile as customer_profile
from fastapi.staticfiles import StaticFiles
app = FastAPI()

# for images and media files
app.mount("/media", StaticFiles(directory="media"), name="media")


# --------------------- CORS ---------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------- MIDDLEWARE ---------------------
app.add_middleware(LoggingMiddleware)


# api route
@app.get('/health')
def check_health():
    return {"status": "ok, it's healthy !"}
app.include_router(auth.auth_router)
app.include_router(admin_product.router)
app.include_router(customer_product.router)
app.include_router(customer_cart.router)
app.include_router(customer_order.router)
app.include_router(admin_order.router)
app.include_router(admin_discount.router)
app.include_router(admin_analytics.router)
app.include_router(customer_reviews.router) 
app.include_router(customer_like.router)
app.include_router(customer_profile.router)