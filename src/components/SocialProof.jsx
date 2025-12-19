import React from 'react';

const SocialProof = ({ 
  rating = 4.7, 
  reviewCount = 480, 
  soldCount = 1440,
  timeframe = "this week" 
}) => {
  // Generate star display based on rating with gradient and glow
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      const isFilled = i < fullStars;
      const isHalf = i === fullStars && hasHalfStar;
      const uniqueId = `socialStar-${i}-${Math.random().toString(36).substr(2, 9)}`;
      
      if (isFilled || isHalf) {
        stars.push(
          <svg
            key={i}
            className="star-glow transition-all duration-300"
            style={{ width: '18px', height: '18px' }}
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill={isHalf ? `url(#${uniqueId})` : `url(#${uniqueId})`}
              opacity={isHalf ? 0.5 : 1}
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="transition-all duration-300"
            style={{ width: '18px', height: '18px' }}
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              fill="#d1d5db"
            />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-rating-container">
      <div className="rating-section">
        <div className="stars-container">
          {renderStars(rating)}
        </div>
        <span className="rating-value">{rating}</span>
        <span className="divider">|</span>
        <span className="review-count">{reviewCount} Reviews</span>
      </div>
      
      
      <div className="sales-section">
        <span className="lightning-icon">⚡</span>
        <span className="sold-count">{soldCount} Sold {timeframe}</span>
      </div>

      <style jsx>{`
        .product-rating-container {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 6px;
          font-family: 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
          
        
        
        }

        .product-rating-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffa500, #ff8c00, #ffa500);
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .rating-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stars-container {
          display: flex;
          gap: 2px;
          margin-right: 4px;
        }


    
        .rating-value {
          font-size: 20px;
          font-weight: 700;
          color: #2c2c2c;
          letter-spacing: -0.02em;
        }

        .divider {
          color: #ccc;
          font-size: 18px;
          font-weight: 300;
        }

        .review-count {
          color: #666;
          font-size: 16px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .review-count:hover {
          color: #ffa500;
          cursor: pointer;
        }

        .sales-section {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
       
         
        
          position: relative;
          overflow: hidden;
        }

        .sales-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: flash 3s ease-in-out infinite;
        }

        @keyframes flash {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        .lightning-icon {
          font-size: 16px;
          animation: bounce 1.5s ease-in-out infinite;
          filter: drop-shadow(0 1px 2px rgba(255, 193, 7, 0.4));
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        .sold-count {
          color: #b8860b;
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
          position: relative;
          z-index: 1;
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .product-rating-container {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .rating-section {
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .sales-section {
            align-self: flex-start;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .star.full,
          .lightning-icon,
          .sales-section::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SocialProof;