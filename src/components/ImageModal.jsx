import React from 'react';

const ImageModal = ({ selectedImage, onClose, themeColor }) => {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-8 h-8 bg-gray-800 bg-opacity-80 text-white rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all z-10"
          onClick={onClose}
        >
          ×
        </button>

        {/* Image */}
        <div className="bg-gray-50 relative">
          <img
            src={selectedImage.src}
            alt={`${selectedImage.review.name} review`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Review Details */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 text-white flex items-center justify-center text-sm font-semibold uppercase rounded-full"
              style={{backgroundColor: themeColor}}
            >
              {selectedImage.review.name.slice(0, 2)}
            </div>
            <div>
              <div className="font-semibold text-lg text-gray-900">{selectedImage.review.name}</div>
              <div className="text-sm text-gray-500">{selectedImage.review.location}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-5 h-5 ${star <= selectedImage.review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {selectedImage.review.title && (
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{selectedImage.review.title}</h3>
          )}

          <p className="text-gray-700 leading-relaxed mb-6">"{selectedImage.review.text}"</p>

          <div className="border-t pt-4">
            <div className="text-sm text-gray-500 mb-2">Product Reviewed</div>
            <div className="font-medium text-gray-800">{selectedImage.review.item}</div>
            <div className="text-sm text-gray-500 mt-2">{selectedImage.review.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;