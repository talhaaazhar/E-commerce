"""Fix corrupted product image URLs - remove data URLs

Revision ID: fix_product_image_urls
Revises: e078c423b7c2
Create Date: 2026-03-05 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision = 'fix_product_image_urls'
down_revision = 'e078c423b7c2'
branch_labels = None
depends_on = None


def upgrade() -> None:
    """
    Remove data URLs (corrupted image data) from product images array.
    Keep only valid /media/products/... URLs.
    """
    bind = op.get_bind()
    session = Session(bind=bind)
    
    try:
        # Get all products with images
        result = session.execute(sa.text("SELECT id, images FROM products WHERE images IS NOT NULL"))
        products = result.fetchall()
        
        updated_count = 0
        for product_id, images in products:
            if images and isinstance(images, list):
                # Filter out data URLs, keep only valid /media/ URLs
                cleaned_images = [img for img in images if img and not img.startswith('data:')]
                
                if cleaned_images != images:
                    session.execute(
                        sa.text("UPDATE products SET images = :images WHERE id = :id"),
                        {"images": cleaned_images if cleaned_images else None, "id": product_id}
                    )
                    updated_count += 1
                    print(f"Cleaned product {product_id}: removed {len(images) - len(cleaned_images)} corrupted URLs")
        
        session.commit()
        print(f"Migration complete: Updated {updated_count} products")
    except Exception as e:
        session.rollback()
        print(f"Error during migration: {e}")
        raise
    finally:
        session.close()


def downgrade() -> None:
    """
    This migration cannot be safely reverted as the data URLs have been removed.
    """
    pass
