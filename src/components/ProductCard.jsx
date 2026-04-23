import React from 'react';
import RatingStars from './RatingStars';
import DiscountBadge from './DiscountBadge';
import ProductDescription from './ProductDescription';

const ProductCard = ({ name, price, discountPrice, description, rating, reviews, inStock, category, image }) => {
  const handleAddToCart = () => {
    if (inStock) {
      const finalPrice = discountPrice || price;
      alert(`Added "${name}" to cart! Price: $${finalPrice.toFixed(2)}`);
    }
  };

  return (
    <div className={`product-card ${!inStock ? 'unavailable' : ''}`}>
      <div className="badge-container">
        <span className={`badge ${inStock ? 'badge-green' : 'badge-red'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        <DiscountBadge originalPrice={price} discountPrice={discountPrice} />
      </div>
      
      <div className="product-image">
        <img src={image} alt={name} />
        {!inStock && <div className="sold-out-overlay">Sold Out</div>}
      </div>

      <div className="product-info">
        <span className="category">{category}</span>
        <h3>{name}</h3>
        
        <RatingStars rating={rating} reviews={reviews} />
        
        <ProductDescription text={description} />
      </div>

      <div className="product-footer">
        <div className="price-container">
          {discountPrice ? (
            <>
              <span className="price discounted-price">${discountPrice.toFixed(2)}</span>
              <span className="original-price">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price">${price.toFixed(2)}</span>
          )}
        </div>
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
