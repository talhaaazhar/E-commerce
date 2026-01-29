# NovaGoods E-Commerce Application

**NovaGoods** is a full-stack e-commerce application featuring product listings, shopping cart, checkout, and user authentication. It includes both **frontend** and **backend** parts, built with modern technologies and best practices.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Notes](#notes)  
- [Next Steps](#next-steps)  
- [License](#license)  

---

## Features

### Frontend

- Product listing and details
- Add to cart with quantity selection
- Shopping cart management (add, remove, update)
- Cart persists across reloads (**localStorage**)
- Cart summary with total price
- Header with live cart count
- Responsive design with mobile menu
- Light/Dark theme toggle (preference saved in **localStorage**)
- Toast notifications for actions (add to cart, etc.)

### Backend

- REST API built with **FastAPI**
- **PostgreSQL** database
- User authentication (login/signup)
- Product management (CRUD operations)
- Cart management and checkout endpoints
- Order history and reviews
- Dockerized setup for backend services

---

## Tech Stack

**Frontend**

- React 18  
- Redux Toolkit  
- React Router v6  
- TailwindCSS  
- Heroicons  
- React Hot Toast / React Toastify  

**Backend**

- FastAPI (Python)  
- PostgreSQL  
- SQLAlchemy / Alembic for ORM and migrations  
- Docker / Docker Compose  
- JWT-based authentication  

---



---

## Setup & Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
# or
yarn install
yarn dev


Backend

The backend provides the REST API, handles database operations, authentication, and serves the data for the frontend.

```bash
cd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate       # Linux/macOS
venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Run the development server
uvicorn app.main:app --reload

