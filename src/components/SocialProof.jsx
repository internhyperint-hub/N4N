import React from 'react';

const SocialProof = ({ 
  rating = 4.7, 
  reviewCount = 480, 
  soldCount = 1440,
  timeframe = "this week" 
}) => {
  // Generate star display based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star full text-yellow-500">
            ★ 
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ☆
          </span>
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

        .star {
          font-size: 18px;
          transition: all 0.2s ease;
          filter: drop-shadow(0 1px 2px rgba(255, 165, 0, 0.3));
        }

        .star.full {
          animation: twinkle 2s ease-in-out infinite;
          animation-delay: calc(var(--star-index, 0) * 0.1s);
        }

        .star.empty {
          color: #e0e0e0;
          font-size: 18px;
        }

        .star.half {
          background: linear-gradient(90deg, #ffa500 50%, #e0e0e0 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes twinkle {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 1px 2px rgba(255, 165, 0, 0.3));
          }
          50% { 
            transform: scale(1.1);
            filter: drop-shadow(0 2px 4px rgba(255, 165, 0, 0.5));
          }
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