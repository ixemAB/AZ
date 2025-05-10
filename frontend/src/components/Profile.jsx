import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({
  user,
  setUser,
  setIsLoggedIn,
  userInterests,
  allProducts,
  setUserInterests,
}) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <p>Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
      >
        Çıxış
      </button>
      <h2 className="text-xl font-bold mt-4">Maraqlarınız</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userInterests.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.price} AZN</p>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              Ətraflı
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;