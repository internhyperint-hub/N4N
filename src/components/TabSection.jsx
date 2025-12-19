import React from 'react';
import ReviewCard from './ReviewCard';
import InstagramFeed from './InstagramFeed';

const TabSection = ({ 
  activeTab, 
  setActiveTab, 
  currentReviews, 
  filterBy, 
  setFilterBy, 
  themeColor, 
  onImageClick,
  instagramPosts,
  productReviews 
}) => {
  const isReviewTab = activeTab === 'product' || activeTab === 'brand';

  return (
    <>
      {/* Tab Headers */}
      <div className="flex flex-wrap mb-6 bg-gray-100 rounded-lg p-1 gap-1">
        <button 
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'product' 
            ? 'bg-white shadow-sm text-gray-900' 
            : 'hover:text-gray-900 text-gray-600'
          }`}
          onClick={() => setActiveTab('product')}
        >
          Product Reviews
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'brand' 
            ? 'bg-white shadow-sm text-gray-900' 
            : 'hover:text-gray-900 text-gray-600'
          }`}
          onClick={() => setActiveTab('brand')}
        >
          Brand Reviews
        </button>
        <button 
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'instagram' 
            ? 'bg-white shadow-sm text-gray-900' 
            : 'hover:text-gray-900 text-gray-600'
          }`}
          onClick={() => setActiveTab('instagram')}
        >
          Instagram
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'instagram' ? (
        <InstagramFeed posts={instagramPosts} themeColor={themeColor} />
      ) : isReviewTab ? (
        <>
          {/* Filter Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Showing {currentReviews.length} {activeTab} review{currentReviews.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Sort:</span>
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 transition-all"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="verified">Verified Only</option>
                <option value="with-media">With Photos</option>
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div>
            {currentReviews.map((review, idx) => (
              <div key={idx}>
                <ReviewCard 
                  review={review}
                  themeColor={themeColor}
                  onImageClick={onImageClick}
                />
                {idx < currentReviews.length - 1 && (
                  <div className="border-b my-6" style={{borderColor: themeColor}}></div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* Write Review Button */}
      <div className="mt-8 text-center">
        <button 
          className="px-8 py-3 text-white rounded-lg font-medium transition-colors hover:opacity-90"
          style={{backgroundColor: themeColor}}
        >
          Write a Review
        </button>
      </div>
    </>
  );
};

export default TabSection;