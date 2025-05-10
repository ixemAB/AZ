import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({
  isLoggedIn,
  user,
  isAdmin,
  cart,
  handleLogout,
  categories,
  isDropdownOpen,
  setIsDropdownOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Onlayn Mağaza
        </Link>
        <div className="hidden md:flex space-x-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.name}`}
              className="hover:underline"
            >
              {category.name}
            </Link>
          ))}
          <Link to="/cart" className="hover:underline">
            Səbət ({cart.length})
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:underline">
                {user?.email}
              </Link>
              {isAdmin && (
                <Link to="/admin" className="hover:underline">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Çıxış
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Daxil ol
              </Link>
              <Link to="/register" className="hover:underline">
                Qeydiyyat
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.name}`}
              className="hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="hover:underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Səbət ({cart.length})
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user?.email}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="hover:underline text-left"
              >
                Çıxış
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Daxil ol
              </Link>
              <Link
                to="/register"
                className="hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Qeydiyyat
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;