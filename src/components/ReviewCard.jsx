import React, { useState } from 'react';

const ReviewCard = ({ review, themeColor, onImageClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxWords = 50;
  const words = review.text.split(' ');
  const shouldTruncate = words.length > maxWords;
  const displayText = isExpanded || !shouldTruncate ? review.text : words.slice(0, maxWords).join(' ');

  return (
    <div 
      className="px-4 py-3 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 30%, #ffffff 70%, #f0fdfb 100%)',
        backgroundImage: `linear-gradient(135deg, rgba(15, 132, 117, 0.02) 0%, rgba(15, 132, 117, 0.05) 50%, rgba(15, 132, 117, 0.02) 100%)`
      }}
    >
      
      {/* Header - Name, Verified Badge, Location and Date */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900 text-sm">{review.name}</span>
          {review.verified && (
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {/* Badges - Frequent Buyer and Recent Reviewer */}
          {review.frequentBuyer && (
            <span className="badge-wavy inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-purple-700 relative overflow-hidden"
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
            >
              <span className="relative z-10">Frequent Buyer</span>
              <span className="wavy-effect"></span>
            </span>
          )}
          {review.recentReviewer && (
            <span className="badge-wavy inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium text-purple-700 relative overflow-hidden"
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
            >
              <span className="relative z-10">Recent Reviewer</span>
              <span className="wavy-effect"></span>
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{review.location} | {review.date}</div>
        </div>
      </div>

      {/* Stars with Glow and Gradient */}
      <div className="flex items-center gap-2 mt-2 mb-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= review.rating;
            const uniqueId = `starGradient-${review.name.replace(/\s+/g, '')}-${star}`;
            return (
              <svg
                key={star}
                className={`transition-all duration-300 ${isFilled ? 'star-glow' : ''}`}
                style={{ width: '18px', height: '18px' }}
                viewBox="0 0 20 20"
              >
                <defs>
                  {isFilled ? (
                    <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                      <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
                    </linearGradient>
                  ) : null}
                </defs>
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  fill={isFilled ? `url(#${uniqueId})` : '#d1d5db'}
                />
              </svg>
            );
          })}
        </div>
        <span className="text-sm font-medium text-gray-700">({review.rating})</span>
      </div>

      {/* Review Title */}
      {review.title && (
        <div className="mb-2">
          <h4 className="font-medium text-gray-900 text-sm">{review.title}</h4>
        </div>
      )}

      {/* Review Text with Read More */}
      <div className="mb-2">
        <p className="text-gray-700 leading-relaxed text-sm">
          {displayText}
          {shouldTruncate && !isExpanded && '...'}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 font-medium ml-2 underline text-xs"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Images and Actions in same row */}
      <div className="flex items-center justify-between gap-2">
        {/* Images */}
        {review.images && review.images.length > 0 ? (
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1 max-w-[60%]">
            {review.images.map((image, imageIdx) => (
              <button
                key={imageIdx}
                onClick={() => onImageClick({ src: image, review: review })}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border border-gray-200 hover:scale-105 transition-transform flex-shrink-0"
              >
                <img src={image} alt="Review image" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors p-1">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="hidden sm:inline">Helpful</span>
            {review.helpfulLikes && (
              <span className="text-xs text-gray-600 font-medium">({review.helpfulLikes})</span>
            )}
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors p-1">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="hidden sm:inline">Reply</span>
          </button>
          {review.brandLiked && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium relative overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(15, 132, 117, 0.15)',
                color: '#0F8475'
              }}
            >
              <span className="relative z-10">Brand liked</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;