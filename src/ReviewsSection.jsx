import React, { useState } from 'react';

const ReviewsSection = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [filterBy, setFilterBy] = useState('recent');
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiTextExpanded, setAiTextExpanded] = useState(false);

  const themeColor = '#108474';

  const productReviews = [
    {
      name: 'Priya S.',
      date: '2 weeks ago',
      dateValue: new Date('2024-10-27'),
      location: 'Mumbai',
      title: 'Amazing results!',
      item: 'Face Wash + Sunscreen',
      text: 'This combo works perfectly for my daily routine. The face wash removes all impurities and the sunscreen gives great protection without feeling greasy.',
      images: ['https://nature4nature.in/cdn/shop/files/PackOf2_N4N-09.jpg?v=1734069020&width=300'],
      rating: 5,
      verified: true
    },
    {
      name: 'Ananya G.',
      date: '1 month ago',
      dateValue: new Date('2024-10-10'),
      location: 'Bangalore',
      title: 'Good product',
      item: 'Face Wash + Sunscreen',
      text: 'Fast delivery. Product quality is good. Face wash has natural ingredients and sunscreen provides decent protection.',
      images: [],
      rating: 4,
      verified: false
    },
    {
      name: 'Meera P.',
      date: '3 weeks ago',
      dateValue: new Date('2024-10-20'),
      location: 'Ahmedabad',
      title: 'Love the natural ingredients!',
      item: 'Face Wash + Sunscreen',
      text: 'Finally found products with natural ingredients that actually work! My skin feels so clean and protected. Will definitely repurchase.',
      images: ['https://nature4nature.in/cdn/shop/files/FaceWash-04_e9e5ea2a-0aad-4b4b-8287-c9a57705ec4d.png?v=1734069020&width=300'],
      rating: 5,
      verified: true
    },
    {
      name: 'Kavya R.',
      date: '5 days ago',
      dateValue: new Date('2024-11-05'),
      location: 'Hyderabad',
      title: 'Average experience',
      item: 'Face Wash + Sunscreen',
      text: 'Products are okay but not exceptional. Expected better results for the price point.',
      images: [],
      rating: 3,
      verified: true
    },
    {
      name: 'Riya S.',
      date: '2 days ago',
      dateValue: new Date('2024-11-08'),
      location: 'Delhi',
      title: 'Excellent for sensitive skin',
      item: 'Face Wash + Sunscreen',
      text: 'Perfect for my sensitive skin! No irritation at all. The face wash is gentle yet effective, and sunscreen blends beautifully.',
      images: ['https://nature4nature.in/cdn/shop/files/Suncreen-04.png?v=1734069020&width=300'],
      rating: 5,
      verified: true
    }
  ];

  const brandReviews = [
    {
      name: 'Ishita S.',
      date: '1 week ago',
      dateValue: new Date('2024-11-03'),
      location: 'Chennai',
      title: 'Trustworthy brand',
      item: 'Nature4Nature Brand Experience',
      text: 'Love the brand commitment to natural ingredients. All products I have tried so far have been excellent quality.',
      images: [],
      rating: 5,
      verified: true
    },
    {
      name: 'Neha A.',
      date: '3 days ago',
      dateValue: new Date('2024-11-07'),
      location: 'Kolkata',
      title: 'Good brand values',
      item: 'Nature4Nature Brand Experience',
      text: 'Appreciate the focus on eco-friendly packaging and natural formulations. Keep up the good work!',
      images: [],
      rating: 4,
      verified: false
    },
    {
      name: 'Sakshi G.',
      date: '2 weeks ago',
      dateValue: new Date('2024-10-27'),
      location: 'Jaipur',
      title: 'Best natural skincare brand!',
      item: 'Nature4Nature Brand Experience',
      text: 'Amazing quality across all products. Customer service is also very responsive. Highly recommend Nature4Nature for anyone looking for natural skincare solutions.',
      images: [],
      rating: 5,
      verified: true
    }
  ];

  const instagramPosts = [
    {
      id: 'insta-1',
      src: 'https://nature4nature.in/cdn/shop/files/PackOf2_N4N-09.jpg?v=1734069020&width=400',
      handle: '@nature4nature.official',
      uploadedAt: 'Nov 15, 2024',
      description: 'Morning skincare routine essentials! Face wash + Sunscreen combo for healthy, protected skin.',
      likes: 245,
      comments: 18
    },
    {
      id: 'insta-2',
      src: 'https://nature4nature.in/cdn/shop/files/FaceWash-04_e9e5ea2a-0aad-4b4b-8287-c9a57705ec4d.png?v=1734069020&width=400',
      handle: '@skincare_diary_',
      uploadedAt: 'Nov 12, 2024',
      description: 'This face wash is a game changer! Clean, natural ingredients that actually work.',
      likes: 89,
      comments: 7
    },
    {
      id: 'insta-3',
      src: 'https://nature4nature.in/cdn/shop/files/Suncreen-04.png?v=1734069020&width=400',
      handle: '@beauty_enthusiast',
      uploadedAt: 'Nov 10, 2024',
      description: 'SPF protection without the white cast! Love this sunscreen formula.',
      likes: 156,
      comments: 12
    },
    {
      id: 'insta-4',
      src: 'https://nature4nature.in/cdn/shop/files/FaceWash-03.png?v=1734069020&width=400',
      handle: '@natural_beauty_lover',
      uploadedAt: 'Nov 8, 2024',
      description: 'Natural ingredients, effective results. What more can you ask for?',
      likes: 203,
      comments: 23
    }
  ];

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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
            
            {/* Overall Rating */}
            <div className="text-center mb-6">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center mb-4 relative mx-auto border-4"
                style={{
                  background: `conic-gradient(from 225deg, ${themeColor} 0%, rgba(16, 132, 116, 0.3) 80%, rgba(16, 132, 116, 0.1) 80%)`,
                  borderColor: `${themeColor}40`
                }}
              >
                <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold" style={{color: themeColor}}>{averageRating}</span>
                    <span className="text-lg font-medium text-gray-600">/5</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <svg key={index} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Based on <strong>{allReviews.length}</strong> reviews
              </p>
              
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border"
                style={{
                  backgroundColor: `${themeColor}15`,
                  color: themeColor,
                  borderColor: `${themeColor}40`
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>94% recommend</span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-900 text-sm">Rating Breakdown</h3>
              {ratingDistribution.map((item) => {
                const percentage = allReviews.length > 0 ? Math.round((item.count / allReviews.length) * 100) : 0;
                return (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600 w-8">
                      <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{item.stars}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: themeColor
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-12 text-right">{item.count} ({percentage}%)</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white">
                  <svg className="w-4 h-4" style={{color: themeColor}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">85%</div>
                  <div className="text-xs text-gray-600">Would repurchase</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white">
                  <svg className="w-4 h-4" style={{color: themeColor}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">92%</div>
                  <div className="text-xs text-gray-600">See results in 1 week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Tab Content */}
        <div className="lg:col-span-2">
          
          {/* AI Insights Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-sm font-medium">AI INSIGHT</span>
                        Customers say
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        Verified reviews
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {aiTextExpanded ? (
                      <>
                        Customers appreciate the effective combination of natural face wash and broad-spectrum sunscreen protection, noting how the gentle formula works perfectly for daily skincare routines. The lightweight, non-greasy texture makes it comfortable for all skin types, with many highlighting the visible improvement in skin clarity and protection from harmful UV rays. Users particularly love the natural ingredients that don't cause irritation, making it suitable for sensitive skin. The dual-action formula saves time in their morning routine while providing comprehensive protection.
                        <button 
                          onClick={() => setAiTextExpanded(false)}
                          className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline"
                        >
                          Read less
                        </button>
                      </>
                    ) : (
                      <>
                        Customers appreciate the effective combination of natural face wash and sunscreen protection, noting how the gentle formula works perfectly for daily routines. The lightweight, non-greasy texture makes it comfortable for all skin types...
                        <button 
                          onClick={() => setAiTextExpanded(true)}
                          className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline"
                        >
                          Read more
                        </button>
                      </>
                    )}
                  </p>
                  
                  <p className="text-sm text-gray-500">
                    Updated in near real-time as new feedback arrives.
                  </p>

                  {/* Frequently Mentioned Features */}
                  <div className="mt-6">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      CUSTOMERS FREQUENTLY MENTION
                    </h4>
                    
                    <div className="flex flex-wrap gap-1">
                      {[
                        'Natural Ingredients',
                        'Gentle Formula', 
                        'UV Protection',
                        'Non-Greasy Texture',
                        'Skin Clarity',
                        'Daily Use',
                        'Sensitive Skin Friendly',
                        'Effective Results'
                      ].map((feature, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center text-sm text-brown-600 hover:text-brown-700 transition-colors"
                          style={{
                            color: '#B87333'
                          }}
                        >
                          • {feature}
                          {index < 7 && <span className="mx-1">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

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
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">Instagram Highlights</h3>
                <p className="text-sm text-gray-500 mt-1">See how customers are sharing their Nature4Nature experience.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {instagramPosts.map((post) => (
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
          ) : activeTab === 'images' ? (
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
                      onClick={() => setSelectedImage({ src: image, review: review })}
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
                    style={{
                      focusBorderColor: themeColor,
                      focusRingColor: `${themeColor}20`
                    }}
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
                  <div key={idx} className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 text-white flex items-center justify-center text-sm font-semibold uppercase rounded-full"
                          style={{backgroundColor: themeColor}}
                        >
                          {review.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="text-sm text-gray-500">{review.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.verified && (
                          <span 
                            className="text-xs px-2 py-1 rounded border"
                            style={{
                              backgroundColor: `${themeColor}15`,
                              color: themeColor,
                              borderColor: `${themeColor}40`
                            }}
                          >
                            Verified
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      {review.title && (
                        <span className="font-medium text-gray-900">{review.title}</span>
                      )}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed mb-4">"{review.text}"</p>

                    {/* Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((image, imageIdx) => (
                          <button
                            key={imageIdx}
                            onClick={() => setSelectedImage({ src: image, review: review })}
                            className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:scale-105 transition-transform"
                          >
                            <img src={image} alt="Review image" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Product Info */}
                    <div className="text-sm text-gray-500 mb-4">
                      Product: <span className="font-medium text-gray-700">{review.item}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Helpful
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Reply
                      </button>
                    </div>
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
        </div>
      </div>


      {/* Customer Photos Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              CUSTOMER PHOTOS
            </h3>
            <p className="text-xl font-medium text-gray-900">
              See how our products look in real life
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">
              {productReviews.filter(review => review.images && review.images.length > 0).reduce((count, review) => count + review.images.length, 0)} photos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productReviews.filter(review => review.images && review.images.length > 0).slice(0, 4).map((review, idx) => 
            review.images.slice(0, 1).map((image, imageIdx) => (
              <button
                key={`${idx}-${imageIdx}`}
                onClick={() => setSelectedImage({ src: image, review: review })}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <img 
                  src={image} 
                  alt={`Customer photo from ${review.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Customer Photos Section - Separate section like Baboski */}
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

        {/* Responsive photo grid - matches Baboski layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
          {[
            ...productReviews.filter(review => review.images && review.images.length > 0),
            ...productReviews.filter(review => review.images && review.images.length > 0)
          ].slice(0, 8).map((review, idx) => 
            review.images.slice(0, 1).map((image, imageIdx) => (
              <button
                key={`photo-${idx}-${imageIdx}`}
                onClick={() => setSelectedImage({ src: image, review: review })}
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

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 bg-gray-800 bg-opacity-80 text-white rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all z-10"
              onClick={() => setSelectedImage(null)}
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
      )}
    </div>
  );
};

export default ReviewsSection;