import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = ({ cart, setCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert('Ödəniş uğurla tamamlandı!');
    setCart([]);
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ödəniş</h1>
      <p className="text-xl font-bold mb-4">Cəmi: {total} AZN</p>
      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Ödənişi tamamla
      </button>
    </div>
  );
};

export default Checkout;