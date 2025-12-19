import React from 'react';

const RatingBreakdown = ({ averageRating, allReviews, themeColor, ratingDistribution }) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-6">
      
      {/* Overall Rating */}
      <div className="text-center mb-4 sm:mb-6">
        <div 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative mx-auto border-4"
          style={{
            background: `conic-gradient(from 225deg, ${themeColor} 0%, rgba(16, 132, 116, 0.3) 80%, rgba(16, 132, 116, 0.1) 80%)`,
            borderColor: `${themeColor}40`
          }}
        >
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-4xl font-semibold" style={{color: themeColor}}>{averageRating}</span>
              <span className="text-sm sm:text-lg font-medium text-gray-600">/5</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg key={index} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          Based on <strong>{allReviews.length}</strong> reviews
        </p>
        
        <div 
          className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-xs border"
          style={{
            backgroundColor: `${themeColor}15`,
            color: themeColor,
            borderColor: `${themeColor}40`
          }}
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">94% recommend</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <h3 className="font-medium text-gray-900 text-sm">Rating Breakdown</h3>
        {ratingDistribution.map((item) => {
          const percentage = allReviews.length > 0 ? Math.round((item.count / allReviews.length) * 100) : 0;
          return (
            <div key={item.stars} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-600 w-6 sm:w-8">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs">{item.stars}</span>
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
              <span className="text-xs text-gray-600 w-10 sm:w-12 text-right"> ({percentage}%)</span>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{color: themeColor}} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">85%</div>
            <div className="text-xs text-gray-600">Best of Acne Prevention</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{color: themeColor}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">92%</div>
            <div className="text-xs text-gray-600">See results in 1 week</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" style={{color: themeColor}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900">92%</div>
            <div className="text-xs text-gray-600">Best for sensitive skin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;