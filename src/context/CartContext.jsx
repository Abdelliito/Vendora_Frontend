import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (if exists, increase qty)
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.productId === product._id);
      if (idx !== -1) {
        // Already in cart, update qty
        const updated = [...prev];
        updated[idx].qty += qty;
        return updated;
      }
      return [...prev, { productId: product._id, product, qty }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  // Update item quantity
  const updateQty = (productId, qty) => {
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, qty } : item));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
