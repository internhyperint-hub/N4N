import React, { useState } from 'react';

const AIInsights = ({ themeColor }) => {
  const [aiTextExpanded, setAiTextExpanded] = useState(false);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-0 rounded-xl p-4 sm:p-6 border border-blue-100">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-xs sm:text-sm font-medium">AI INSIGHT</span>
                  <span className="text-sm sm:text-lg">Customers say</span>
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  Verified reviews
                </span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              {aiTextExpanded ? (
                <>
                  Customers appreciate the effective combination of natural face wash and broad-spectrum sunscreen protection, noting how the gentle formula works perfectly for daily skincare routines. The lightweight, non-greasy texture makes it comfortable for all skin types, with many highlighting the visible improvement in skin clarity and protection from harmful UV rays. Users particularly love the natural ingredients that don't cause irritation, making it suitable for sensitive skin. The dual-action formula saves time in their morning routine while providing comprehensive protection.
                  <button 
                    onClick={() => setAiTextExpanded(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline text-sm"
                  >
                    Read less
                  </button>
                </>
              ) : (
                <>
                  Customers appreciate the effective combination of natural face wash and sunscreen protection, noting how the gentle formula works perfectly for daily routines. The lightweight, non-greasy texture makes it comfortable for all skin types...
                  <button 
                    onClick={() => setAiTextExpanded(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium ml-1 underline text-sm"
                  >
                    Read more
                  </button>
                </>
              )}
            </p>
            
            <p className="text-xs sm:text-sm text-gray-500">
              Updated in near real-time as new feedback arrives.
            </p>

            {/* Frequently Mentioned Features */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
                CUSTOMERS FREQUENTLY MENTION
              </h4>
              
              <div className="flex flex-wrap gap-1 sm:gap-2">
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
                    className="inline-flex items-center text-xs sm:text-sm text-brown-600 hover:text-brown-700 transition-colors"
                    style={{
                      color: '#B87333'
                    }}
                  >
                    • {feature}
                    {index < 7 && <span className="mx-0.5 sm:mx-1">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;