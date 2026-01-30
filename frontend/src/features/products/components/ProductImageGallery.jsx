import React, { useState, useRef } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function ProductImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  if (!images || images.length === 0) return null;

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      {/* Main Image */}
      <div
        className="relative w-full max-w-lg h-72 sm:h-80 md:h-96 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            zoom ? "scale-150" : "scale-100"
          }`}
          style={zoom ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
        />

        {/* Hover Hint */}
        {!zoom && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
              Hover to zoom
            </span>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 dark:bg-black/60 text-black dark:text-white border-none backdrop-blur-md hover:scale-105 transition"
              size="large"
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 dark:bg-black/60 text-black dark:text-white border-none backdrop-blur-md hover:scale-105 transition"
              size="large"
            />
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              aria-label={`View image ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${
                  idx === currentIndex
                    ? "border-blue-500 scale-105"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImageGallery;
