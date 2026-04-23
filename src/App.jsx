import React from 'react';
import './App.css';
import products from './data/products';
import ProductCard from './components/ProductCard';

function App() {
  const availableCount = products.filter(p => p.inStock).length;

  return (
    <div className="app-container">
      <header className="shop-header">
        <span className="category" style={{ marginBottom: '16px' }}>Kunanan Wongsing</span>
        <h1>Tech Shop </h1>
        <p>Discover {products.length} elite products • <strong>{availableCount} currently in stock</strong></p>
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
