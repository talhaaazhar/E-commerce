import React, { useState } from 'react';

function ProductImageGallery({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="w-full md:w-1/2">
            <div className="main-image mb-4">
                <img 
                    src={images[currentImageIndex]} 
                    alt={`Product Image ${currentImageIndex + 1}`} 
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
            </div>
            <div className="thumbnails flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );  
}

export default ProductImageGallery;