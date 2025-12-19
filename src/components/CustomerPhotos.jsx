import React from 'react';

const CustomerPhotos = ({ productReviews, onImageClick }) => {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            CUSTOMER PHOTOS
          </h3>
          <p className="text-xl font-medium text-gray-900">
            Real results from the community
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-500">
            {productReviews.filter(review => review.images && review.images.length > 0).reduce((count, review) => count + review.images.length, 0) * 2} uploads
          </span>
        </div>
      </div>

      {/* Mobile horizontal scroll / Desktop grid */}
      <div className="block sm:hidden">
        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {[
            ...productReviews.filter(review => review.images && review.images.length > 0),
            ...productReviews.filter(review => review.images && review.images.length > 0)
          ].slice(0, 8).map((review, idx) => 
            review.images.slice(0, 1).map((image, imageIdx) => (
              <button
                key={`photo-mobile-${idx}-${imageIdx}`}
                onClick={() => onImageClick({ src: image, review: review })}
                className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
              >
                <img 
                  src={image} 
                  alt={`Customer photo from ${review.name}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))
          )}
        </div>
      </div>

      <div className="hidden sm:block">
        {/* Desktop: Grid layout */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
          {[
            ...productReviews.filter(review => review.images && review.images.length > 0),
            ...productReviews.filter(review => review.images && review.images.length > 0)
          ].slice(0, 8).map((review, idx) => 
            review.images.slice(0, 1).map((image, imageIdx) => (
              <button
                key={`photo-desktop-${idx}-${imageIdx}`}
                onClick={() => onImageClick({ src: image, review: review })}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <img 
                  src={image} 
                  alt={`Customer photo from ${review.name}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPhotos;