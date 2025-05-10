import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ allProducts, categories, addToCart, trackInterest }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Xüsusi Məhsullar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allProducts.map((product) => (
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

export default Home;