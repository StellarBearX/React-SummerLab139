import React from 'react';
import RatingStars from './RatingStars';

const ProductCard = ({ name, price, rating, reviews, inStock, category, image }) => {
  const handleAddToCart = () => {
    if (inStock) {
      alert(`Added "${name}" to cart! Price: $${price}`);
    }
  };

  return (
    <div className={`product-card ${!inStock ? 'unavailable' : ''}`}>
      <span className={`badge ${inStock ? 'badge-green' : 'badge-red'}`}>
        {inStock ? 'In Stock' : 'Out of Stock'}
      </span>
      
      <div className="product-image">
        <img src={image} alt={name} />
        {!inStock && <div className="sold-out-overlay">Sold Out</div>}
      </div>

      <div className="product-info">
        <span className="category">{category}</span>
        <h3>{name}</h3>
        
        <RatingStars rating={rating} reviews={reviews} />
      </div>

      <div className="product-footer">
        <span className="price">${price.toFixed(2)}</span>
        <button 
          className="add-btn" 
          onClick={handleAddToCart} 
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
