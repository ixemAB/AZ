import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetail = ({ addToCart, trackInterest, products }) => {
  const id = window.location.pathname.split('/product/')[1];
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Məhsul tapılmadı</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p>{product.price} AZN</p>
      <p>Kateqoriya: {product.category}</p>
      <button
        onClick={() => {
          addToCart(product);
          trackInterest(product);
        }}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Səbətə əlavə et
      </button>
    </div>
  );
};

export default ProductDetail;