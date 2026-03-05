import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  if (cart.length === 0) {
    return <div className="p-8 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul className="divide-y divide-slate-200">
        {cart.map(item => (
          <li key={item.productId} className="flex items-center py-4 gap-4">
            <img src={item.product.images?.[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg border" />
            <div className="flex-1">
              <div className="font-semibold">{item.product.name}</div>
              <div className="text-sm text-mid">Rs. {item.product.price}</div>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))} className="px-2 py-1 bg-slate-100 rounded">-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.productId, item.qty + 1)} className="px-2 py-1 bg-slate-100 rounded">+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.productId)} className="ml-2 text-red-500 hover:underline">Remove</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <span className="font-bold text-lg">Total: Rs. {total}</span>
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>
      {/* Add checkout button here if needed */}
    </div>
  );
};

export default Cart;
