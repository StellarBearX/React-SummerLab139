import React from 'react';

const DiscountBadge = ({ originalPrice, discountPrice }) => {
  if (!discountPrice || discountPrice >= originalPrice) return null;

  const percentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

  return (
    <div className="discount-badge">
      <span className="discount-percent">-{percentage}%</span>
      <span className="discount-label">OFF</span>
    </div>
  );
};

export default DiscountBadge;
