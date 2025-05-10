import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Səbət</h1>
      {cart.length === 0 ? (
        <p>Səbətiniz boşdur</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 mb-2 rounded">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>{item.price} AZN</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                Sil
              </button>
            </div>
          ))}
          <p className="text-xl font-bold mt-4">Cəmi: {total} AZN</p>
          <Link
            to="/checkout"
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded inline-block"
          >
            Ödənişə keç
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;