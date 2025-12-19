import React from 'react';

const ImageSection = ({ productReviews, onImageClick }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Customer Images</h3>
        <p className="text-sm text-gray-500 mt-1">Real photos from verified customers sharing their experience.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {productReviews.filter(review => review.images && review.images.length > 0).map((review, idx) => 
          review.images.map((image, imageIdx) => (
            <button
              key={`${idx}-${imageIdx}`}
              onClick={() => onImageClick({ src: image, review: review })}
              className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <img 
                src={image} 
                alt={`Review from ${review.name}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageSection;