import React, { useState, useEffect } from 'react';
import ReviewsSection from './ReviewsSection_Final';
import  SocialProof  from './components/SocialProof';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [counter, setCounter] = useState(1440);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      // Show counter when user starts scrolling (after 100px)
      if (scrollPosition > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous live counter - gently increases over time
  useEffect(() => {
    if (!isVisible) {
      setCounter(1440);
      return;
    }

    // Start from base count
    let currentCount = 1440;
    setCounter(currentCount);

    // Increment every 1-2 seconds by 1 for gentle, natural feel
    const timer = setInterval(() => {
      currentCount += 1;
      setCounter(currentCount);
    }, 1000 + Math.random() * 1000); // Random interval between 1-2 seconds

    return () => clearInterval(timer);
  }, [isVisible]);

  // Helper function to render stars with gradient and glow
  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => {
      const isFilled = i < rating;
      const uniqueId = `productStar-${i}-${Math.random().toString(36).substr(2, 9)}`;
      
      return (
        <svg
          key={i}
          className={`transition-all duration-300 ${isFilled ? 'star-glow' : ''}`}
          style={{ width: '18px', height: '18px' }}
          viewBox="0 0 20 20"
        >
          <defs>
            {isFilled && (
              <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
              </linearGradient>
            )}
          </defs>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={isFilled ? `url(#${uniqueId})` : '#d1d5db'}
          />
        </svg>
      );
    });
  };

  // Helper function to render rating badge (like the image)
  const renderRatingBadge = (rating, reviewCount) => {
    const uniqueId = `badgeStar-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <div 
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          backgroundColor: '#FDF8EF',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <span className="font-bold text-gray-900 text-sm">{rating}</span>
        <svg
          className="star-glow"
          style={{ width: '16px', height: '16px' }}
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
              <stop offset="100%" stopColor="#FDB813" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill={`url(#${uniqueId})`}
          />
        </svg>
        <div 
          className="h-3 w-px"
          style={{ backgroundColor: '#FDB813' }}
        />
        <span className="text-xs text-gray-900 font-medium">{reviewCount} Reviews</span>
      </div>
    );
  };

  const productImages = [
    'https://nature4nature.in/cdn/shop/files/PackOf2_N4N-09.jpg?v=1734069020&width=1080', // Main product image - combo pack
    'https://nature4nature.in/cdn/shop/files/FaceWash-04_e9e5ea2a-0aad-4b4b-8287-c9a57705ec4d.png?v=1734069020&width=4167', // Face wash detail
    'https://nature4nature.in/cdn/shop/files/Suncreen-04.png?v=1734069020&width=4167', // Sunscreen detail
    'https://nature4nature.in/cdn/shop/files/FaceWash-03.png?v=1734069020&width=4167', // Face wash alternate view
    'https://nature4nature.in/cdn/shop/files/PackOf2_N4N-09.jpg?v=1734069020&width=1080', // Combo pack view
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Calculate position based on scroll
  const getCounterPosition = () => {
    if (scrollY < 300) {
      // Top center when scrolling starts
      return {
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 'auto',
        right: 'auto'
      };
    } else {
      // Bottom left after scrolling more
      return {
        bottom: '20px',
        left: '20px',
        top: 'auto',
        right: 'auto',
        transform: 'none'
      };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Live Counter - Scroll triggered */}
      {isVisible && (
        <div
          className="fixed z-50 transition-all duration-500 ease-in-out"
          style={getCounterPosition()}
        >
          <div 
            className="inline-flex items-center gap-2 rounded-full border shadow-lg px-4 py-2 bg-white"
            style={{ borderColor: '#d4d4d4' }}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="absolute inset-0 animate-ping rounded-full opacity-70"
                style={{ backgroundColor: '#1fa971' }}
              />
              <span
                className="relative inline-flex h-full w-full rounded-full"
                style={{ backgroundColor: '#1fa971' }}
              />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-700">
              Live
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-gray-900 transition-all duration-300 ease-in-out">
                {counter.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-gray-600">Sold</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold text-green-800">N4N</div>
            <div className="hidden sm:block text-sm text-gray-600">Backed by ECOSCIENCE</div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-800 transition-colors">HOME</a>
            <a href="#" className="text-gray-700 hover:text-green-800 transition-colors">SHOP</a>
            <a href="#" className="text-gray-700 hover:text-green-800 transition-colors">ABOUT</a>
            <a href="#" className="text-gray-700 hover:text-green-800 transition-colors">OUR SALON</a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-green-800 transition-colors text-center py-2">HOME</a>
              <a href="#" className="text-gray-700 hover:text-green-800 transition-colors text-center py-2">SHOP</a>
              <a href="#" className="text-gray-700 hover:text-green-800 transition-colors text-center py-2">ABOUT</a>
              <a href="#" className="text-gray-700 hover:text-green-800 transition-colors text-center py-2">OUR SALON</a>
              
              {/* Mobile Action Buttons */}
              <div className="flex justify-center space-x-6 pt-4 border-t border-gray-100">
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          
          {/* Product Images */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Main Image - First on mobile */}
            <div className="order-1 sm:order-2 flex-1">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={productImages[currentImageIndex]} 
                  alt="Face Wash + Sunscreen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnails - Second on mobile, horizontal scroll */}
            <div className="order-2 sm:order-1 flex sm:flex-col space-x-3 sm:space-x-0 sm:space-y-4 overflow-x-auto sm:overflow-x-visible">
              {productImages.slice(1).map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index + 1)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden ${
                    currentImageIndex === index + 1 ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Product ${index + 2}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 mb-3 sm:mb-4 leading-tight">
                FACE WASH<br />+SUNSCREEN
              </h1>
              <SocialProof />
              
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-medium" style={{color: '#d2815f'}}>₹ 599.00</span>
                <span className="text-base sm:text-lg text-gray-500 line-through">₹ 1,198.00</span>
              </div>
              
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Inclusive of all taxes.</p>

             
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center sm:justify-start space-x-4 mb-6 sm:mb-8">
              <span className="text-sm sm:text-base text-gray-600">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={decrementQuantity}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  -
                </button>
                <span className="w-8 sm:w-12 text-center text-base sm:text-lg font-medium">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button 
                disabled 
                className="w-full py-3 sm:py-4 bg-gray-200 text-gray-500 rounded-lg font-medium text-sm sm:text-base"
              >
                SOLD OUT • ₹ 599.00
              </button>
              
              <button className="w-full py-3 sm:py-4 text-white rounded-lg font-medium transition-colors hover:opacity-90 text-sm sm:text-base" style={{backgroundColor: '#d2815f'}}>
                BUY IT NOW
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-lg font-medium">DESCRIPTION</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="mt-4 text-gray-600 leading-relaxed">
                <p>Your skin's armour for the day is here. Start with a clean slate and use the Face Wash to kick oil and dirt to the curb. Don't forget to apply the Sunscreen to protect your skin from harmful UVA and UVB damage.</p>
              </div>
            </div>

            {/* Why It's Special */}
            <div className="border-t pt-6">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-lg font-medium">WHY IT'S SPECIAL?</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Works Well With Section */}
        <div className="mt-12 sm:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light text-gray-800 tracking-wider">WORKS WELL WITH</h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile */}
            <button className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full items-center justify-center hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md rounded-full items-center justify-center hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Product Cards */}
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-12">
              <div className="flex gap-4 sm:gap-6 lg:grid lg:grid-cols-4 min-w-max lg:min-w-0">
              
              {/* ACNE PREVENTION */}
              <div className="bg-white group cursor-pointer flex-shrink-0 w-64 sm:w-72 lg:w-auto">
                <div className="relative mb-3 sm:mb-4">
                  <div className="absolute top-3 left-3 bg-gray-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-700 rounded">
                    SALE
                  </div>
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src="https://nature4nature.in/cdn/shop/files/Website_Combo_Acne_Prevention.webp?crop=center&height=1200&v=1749816474&width=1080" 
                      alt="Acne Prevention"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2 px-2">
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">ACNE PREVENTION</h3>
                  <div className="flex justify-center">
                    {renderRatingBadge(4.8, 234)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                      <span className="text-base sm:text-lg font-medium" style={{color: '#d2815f'}}>₹ 1,138.00</span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through">₹ 1,898.00</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">(40%)</span>
                  </div>
                </div>
              </div>

              {/* Face Cleanser mini */}
              <div className="bg-white group cursor-pointer flex-shrink-0 w-72 lg:w-auto">
                <div className="relative mb-4">
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src="https://nature4nature.in/cdn/shop/files/Face_FaceCleanser_Front.jpg?crop=center&height=1111&v=1745996504&width=1000" 
                      alt="Face Cleanser mini"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium text-gray-800">Face Cleanser mini</h3>
                  <div className="flex justify-center">
                    {renderRatingBadge(4.5, 189)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg font-medium text-gray-800">₹ 199.00</span>
                  </div>
                </div>
              </div>

              {/* Natural Face Cleanser */}
              <div className="bg-white group cursor-pointer flex-shrink-0 w-72 lg:w-auto">
                <div className="relative mb-4">
                  <div className="absolute top-4 left-4 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 rounded">
                    SALE
                  </div>
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src="https://nature4nature.in/cdn/shop/files/0_2e5a7202-c68d-43b3-b30a-b5f9609bd1d2.jpg?crop=center&height=1666&v=1754898228&width=1500" 
                      alt="Natural Face Cleanser"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium text-gray-800">Natural Face Cleanser for Deep Pore Purification</h3>
                  <div className="flex justify-center">
                    {renderRatingBadge(4.7, 312)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg font-medium" style={{color: '#d2815f'}}>₹ 695.00</span>
                      <span className="text-sm text-gray-500 line-through">₹ 1,299.00</span>
                    </div>
                    <span className="text-sm text-gray-600">(46%)</span>
                  </div>
                </div>
              </div>

              {/* Sunscreen SPF 35 */}
              <div className="bg-white group cursor-pointer flex-shrink-0 w-72 lg:w-auto">
                <div className="relative mb-4">
                  <div className="absolute top-4 left-4 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 rounded">
                    SALE
                  </div>
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src="https://nature4nature.in/cdn/shop/files/sunscreen_mockup_packaging.jpg_main_page.jpg?crop=center&height=2222&v=1754899305&width=2000" 
                      alt="Sunscreen SPF 35"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium text-gray-800">Sunscreen SPF 35 PA+++ for Broad Spectrum Protection</h3>
                  <div className="flex justify-center">
                    {renderRatingBadge(4.6, 278)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg font-medium" style={{color: '#d2815f'}}>₹ 395.00</span>
                      <span className="text-sm text-gray-500 line-through">₹ 699.00</span>
                    </div>
                    <span className="text-sm text-gray-600">(43%)</span>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection />
      </div>
    </div>
  );
};

export default ProductPage;