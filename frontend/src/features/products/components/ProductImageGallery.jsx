// import React, { useState, useRef } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// function ProductImageGallery({ images }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [lensVisible, setLensVisible] = useState(false);
//   const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
//   const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
//   const imgRef = useRef(null);

//   if (!images || images.length === 0) return null;

//   const prevImage = () => {
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextImage = () => {
//     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const handleMouseMove = (e) => {
//     const img = imgRef.current;
//     const rect = img.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // Lens dimensions
//     const lensSize = 120;
//     const lensX = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
//     const lensY = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

//     setLensPosition({ x: lensX, y: lensY });

//     // Background position for zoom
//     const bgX = -(lensX / rect.width) * img.naturalWidth * 2 + lensSize / 2;
//     const bgY = -(lensY / rect.height) * img.naturalHeight * 2 + lensSize / 2;

//     setBackgroundPosition({ x: bgX, y: bgY });
//   };

//   return (
//     <div className="w-full md:w-1/2 mx-auto">
//       {/* Main Image */}
//       <div
//         className="relative group"
//         onMouseEnter={() => setLensVisible(true)}
//         onMouseLeave={() => setLensVisible(false)}
//         onMouseMove={handleMouseMove}
//       >
//         <img
//           ref={imgRef}
//           src={images[currentIndex]}
//           alt={`Product ${currentIndex + 1}`}
//           className="w-full h-96 object-cover rounded-lg shadow-lg"
//         />

//         {/* Magnifier Lens */}
//         {lensVisible && (
//           <div
//             className="absolute pointer-events-none border-2 border-gray-300 rounded-full w-32 h-32"
//             style={{
//               top: `${lensPosition.y}px`,
//               left: `${lensPosition.x}px`,
//               backgroundImage: `url(${images[currentIndex]})`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: `${imgRef.current.naturalWidth * 2}px ${
//                 imgRef.current.naturalHeight * 2
//               }px`,
//               backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
//             }}
//           ></div>
//         )}

//         {/* Left Arrow */}
//         {images.length > 1 && (
//           <button
//             onClick={prevImage}
//             className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
//           >
//             <ChevronLeftIcon className="w-6 h-6" />
//           </button>
//         )}

//         {/* Right Arrow */}
//         {images.length > 1 && (
//           <button
//             onClick={nextImage}
//             className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
//           >
//             <ChevronRightIcon className="w-6 h-6" />
//           </button>
//         )}
//       </div>

//       {/* Thumbnails */}
//       <div className="flex gap-2 mt-4 overflow-x-auto">
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`Thumbnail ${idx + 1}`}
//             className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition
//               ${idx === currentIndex ? "border-blue-500 scale-105" : "border-gray-300 hover:scale-105"}`}
//             onClick={() => setCurrentIndex(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductImageGallery;






import React, { useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

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
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Main Image */}
      <div
        className="relative w-full md:w-1/2 h-96 overflow-hidden rounded-lg cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            zoom ? "scale-150" : "scale-100"
          }`}
          style={zoom ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 md:flex-col md:mt-0 overflow-x-auto md:overflow-y-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition
              ${idx === currentIndex ? "border-blue-500 scale-105" : "border-gray-300 hover:scale-105"}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;
