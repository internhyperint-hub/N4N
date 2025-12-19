import React from 'react';

const ImageSection = ({ productReviews, onImageClick }) => {
  // Extract all images from reviews that have images
  const allReviewImages = productReviews
    .filter(review => review.images && review.images.length > 0)
    .flatMap(review => 
      review.images.map(image => ({
        src: image,
        review: review
      }))
    );

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-2">Customer Images</h2>
      <p className="text-gray-600 mb-6">
        Real photos from verified customers sharing their experience.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allReviewImages.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onImageClick(item)}
            className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <img
              src={item.src}
              alt={`Customer photo ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;