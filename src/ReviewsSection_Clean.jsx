import React, { useState } from 'react';
import { productReviews, brandReviews, instagramPosts, themeColor } from './data/reviewsData';
import AIInsights from './components/AIInsights';
import RatingBreakdown from './components/RatingBreakdown';
import CustomerPhotos from './components/CustomerPhotos';
import ReviewCard from './components/ReviewCard';

const ReviewsSection = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [filterBy, setFilterBy] = useState('recent');
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper functions
  const filterReviews = (reviews) => {
    let filtered = [...reviews];
    
    switch (filterBy) {
      case 'recent':
        filtered.sort((a, b) => b.dateValue - a.dateValue);
        break;
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'verified':
        filtered = filtered.filter(review => review.verified);
        break;
      case 'with-media':
        filtered = filtered.filter(review => review.images && review.images.length > 0);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Data calculations
  const currentReviews = activeTab === 'product' ? filterReviews(productReviews) : 
                       activeTab === 'brand' ? filterReviews(brandReviews) : [];
  const allReviews = [...productReviews, ...brandReviews];
  const averageRating = allReviews.length > 0 ? (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1) : 0;
  
  const ratingDistribution = [
    { stars: 5, count: allReviews.filter(r => r.rating === 5).length },
    { stars: 4, count: allReviews.filter(r => r.rating === 4).length },
    { stars: 3, count: allReviews.filter(r => r.rating === 3).length },
    { stars: 2, count: allReviews.filter(r => r.rating === 2).length },
    { stars: 1, count: allReviews.filter(r => r.rating === 1).length },
  ];

  const isReviewTab = activeTab === 'product' || activeTab === 'brand';

  return (
    <div className="mt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-light text-gray-800 tracking-wider">CUSTOMER REVIEWS</h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Side - Rating Summary */}
        <div className="lg:col-span-1">
          <RatingBreakdown 
            averageRating={averageRating}
            allReviews={allReviews}
            themeColor={themeColor}
            ratingDistribution={ratingDistribution}
          />
        </div>

        {/* Right Side - Tab Content */}
        <div className="lg:col-span-2">
          
          {/* AI Insights Section */}
          <AIInsights themeColor={themeColor} />

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
            <button 
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'images' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'hover:text-gray-900 text-gray-600'
              }`}
              onClick={() => setActiveTab('images')}
            >
              Customer Images
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'instagram' ? (
            <InstagramTab posts={instagramPosts} themeColor={themeColor} />
          ) : activeTab === 'images' ? (
            <ImagesTab productReviews={productReviews} onImageClick={setSelectedImage} />
          ) : isReviewTab ? (
            <ReviewsTab 
              activeTab={activeTab}
              currentReviews={currentReviews}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              themeColor={themeColor}
              onImageClick={setSelectedImage}
            />
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
        </div>
      </div>

      {/* Customer Photos Section */}
      <CustomerPhotos 
        productReviews={productReviews}
        onImageClick={setSelectedImage}
      />

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          themeColor={themeColor}
        />
      )}
    </div>
  );
};

// Small Tab Components
const InstagramTab = ({ posts, themeColor }) => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Instagram Highlights</h3>
      <p className="text-sm text-gray-500 mt-1">See how customers are sharing their Nature4Nature experience.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-square overflow-hidden">
            <img 
              src={post.src} 
              alt="Instagram post" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
                style={{backgroundColor: themeColor}}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{post.handle}</div>
                <div className="text-xs text-gray-500">{post.uploadedAt}</div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{post.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {post.comments}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ImagesTab = ({ productReviews, onImageClick }) => (
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

const ReviewsTab = ({ activeTab, currentReviews, filterBy, setFilterBy, themeColor, onImageClick }) => (
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
    <div className="space-y-6">
      {currentReviews.map((review, idx) => (
        <ReviewCard 
          key={idx}
          review={review}
          themeColor={themeColor}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  </>
);

const ImageModal = ({ selectedImage, onClose, themeColor }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-6"
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

export default ReviewsSection;