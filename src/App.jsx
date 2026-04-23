import React from 'react';
import './App.css';
import products from './data/products';
import ProductCard from './components/ProductCard';

function App() {
  const availableCount = products.filter(p => p.inStock).length;

  return (
    <div className="app-container">
      <header className="shop-header">
        <h1>Tech Shop</h1>
        <p>{products.length} products | {availableCount} available</p>
      </header>

      <main className="gallery-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </main>
    </div>
  );
}

export default App;
