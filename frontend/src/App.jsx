import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    if (!API_URL) {
      setError('API_URL təyin edilməyib. Zəhmət olmasa .env faylını yoxlayın.');
      return;
    }

    fetch(`${API_URL}/products`, { timeout: 5000 })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Məhsullar:', data);
        setProducts(data);
      })
      .catch((err) => {
        console.error('Məhsulları əldə edərkən xəta:', err);
        setError('Məhsulları yükləyərkən xəta oldu: ' + err.message);
      });

    fetch(`${API_URL}/categories`, { timeout: 5000 })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Kateqoriyalar:', data);
        setCategories(data);
      })
      .catch((err) => {
        console.error('Kateqoriyaları əldə edərkən xəta:', err);
        setError('Kateqoriyaları yükləyərkən xəta oldu: ' + err.message);
      });

    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');
    const storedInterests = localStorage.getItem('userInterests');
    if (loggedInStatus === 'true' && storedUser) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.email === 'admin@example.com') setIsAdmin(true);
    }
    if (storedInterests) setUserInterests(JSON.parse(storedInterests));
  }, []);

  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [isLoggedIn, user, userInterests]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} səbətə əlavə olundu!`);
  };

  const trackInterest = (product) => {
    setUserInterests((prev) => {
      const updatedInterests = prev.filter((item) => item.id !== product.id);
      updatedInterests.unshift(product);
      return updatedInterests.slice(0, 2);
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <p>{error}</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Ana Səhifəyə Qayıt
        </Link>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Onlayn Mağaza</title>
          <meta name="description" content="Müasir onlayn mağaza platforması" />
        </Helmet>
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          isAdmin={isAdmin}
          cart={cart}
          handleLogout={handleLogout}
          categories={categories}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  allProducts={products}
                  categories={categories}
                  addToCart={addToCart}
                  trackInterest={trackInterest}
                />
              }
            />
            <Route
              path="/products/:category?"
              element={
                <Products
                  products={products}
                  categories={categories}
                  addToCart={addToCart}
                  trackInterest={trackInterest}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  addToCart={addToCart}
                  trackInterest={trackInterest}
                  products={products}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} setCart={setCart} />}
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
            />
            <Route
              path="/register"
              element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  user={user}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                  userInterests={userInterests}
                  allProducts={products}
                  setUserInterests={setUserInterests}
                />
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <AdminPanel
                    products={products}
                    setProducts={setProducts}
                    categories={categories}
                  />
                ) : (
                  <div className="container mx-auto p-4 sm:p-6">
                    <p>Bu səhifəyə giriş icazəniz yoxdur.</p>
                    <Link to="/" className="text-blue-500 hover:underline">
                      Ana Səhifəyə Qayıt
                    </Link>
                  </div>
                )
              }
            />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-sm sm:text-base">
              © 2025 Onlayn Mağaza. Bütün hüquqlar qorunur.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
