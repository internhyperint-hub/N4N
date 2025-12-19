import React, { useState } from 'react';
import { productReviews, brandReviews, instagramPosts, themeColor } from './data/reviewsData';
import AIInsights from './components/AIInsights';
import RatingBreakdown from './components/RatingBreakdown';
import CustomerPhotos from './components/CustomerPhotos';
import TabSection from './components/TabSection';
import ImageSection from './components/ImageSection';
import ImageModal from './components/ImageModal';

const ReviewsSection = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [filterBy, setFilterBy] = useState('recent');
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper function
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

  // Calculations
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
          <CustomerPhotos 
        productReviews={productReviews}
        onImageClick={setSelectedImage}
      />

          {/* Tab Section */}
          <TabSection 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentReviews={currentReviews}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            themeColor={themeColor}
            onImageClick={setSelectedImage}
            instagramPosts={instagramPosts}
            productReviews={productReviews}
          />
   {/* Customer Photos Section */}


          {/* Image Section - Below Tab Section */}
          {/* <div className="mt-8">
            <ImageSection 
              productReviews={productReviews}
              onImageClick={setSelectedImage}
            />
          </div> */}
        </div>
      </div>

   
    

      {/* Image Modal */}
      <ImageModal 
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        themeColor={themeColor}
      />
    </div>
  );
};

export default ReviewsSection;