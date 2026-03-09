import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Cart from './pages/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsListPage from './pages/ProductsListPage';
import VendorDashboard from './pages/VendorDashboard';
import CheckoutPage from './pages/CheckoutPage';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './context/AuthContext';

// Ensure each route opens from the top instead of preserving old scroll position.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

// Wrapper to handle loading state on navigation
const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle simulated loading for specific routes
  const handleNavWithLoading = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1800); // 1.8 seconds for a "premium" feel
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage onNavigate={handleNavWithLoading} />} />
        <Route path="/register" element={<RegisterPage onNavigate={handleNavWithLoading} />} />
        <Route path="/login" element={<LoginPage onNavigate={handleNavWithLoading} />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
