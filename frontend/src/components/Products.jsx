import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, categories, addToCart, trackInterest }) => {
  const category = window.location.pathname.split('/products/')[1];
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {category || 'Bütün Məhsullar'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.price} AZN</p>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 hover:underline"
              onClick={() => trackInterest(product)}
            >
              Ətraflı
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Səbətə əlavə et
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;