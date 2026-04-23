import React, { useState } from 'react';

const ProductDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 80;

  if (text.length <= maxLength) {
    return <p className="product-description">{text}</p>;
  }

  return (
    <div className="product-description-container">
      <p className="product-description">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
        <button 
          className="read-more-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </p>
    </div>
  );
};

export default ProductDescription;
