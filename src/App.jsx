import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './context/AuthContext';

// Wrapper to handle loading state on navigation
const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
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
    <Routes>
      <Route path="/" element={<HomePage onNavigate={handleNavWithLoading} />} />
      <Route path="/register" element={<RegisterPage onNavigate={handleNavWithLoading} />} />
      <Route path="/login" element={<LoginPage onNavigate={handleNavWithLoading} />} />
    </Routes>
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
