import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { getCategoryEmoji, getStockBadge, hasUsableProductImage } from '../utils/productVisuals';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + (price * item.qty);
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-light">
        <Navbar onNavigate={(path) => navigate(path)} />
        <div className="pt-[88px] px-[5%] py-12">
          <div className="max-w-[800px] mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto mb-4 text-slate-300" />
            <h2 className="font-poppins text-2xl font-bold text-dark mb-2">Your cart is empty</h2>
            <p className="text-mid mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white font-poppins font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar onNavigate={(path) => navigate(path)} />
      <div className="pt-[88px] px-[5%] py-12">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="font-poppins text-3xl font-extrabold text-dark mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => {
                const product = item.product;
                if (!product) return null;

                const badge = getStockBadge(product.stock);

                return (
                  <div key={item.productId} className="bg-white rounded-[20px] p-6 shadow-sm flex items-center gap-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                      {hasUsableProductImage(product.images?.[0]) ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">{getCategoryEmoji(product.category)}</span>
                      )}
                      <span className={`absolute top-1.5 left-1.5 font-poppins text-[9px] font-extrabold px-1.5 py-0.5 rounded-full tracking-[0.4px] uppercase ${badge.className}`}>
                        {badge.label}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-[11px] text-mid font-medium mb-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {product.vendorId?.storeInfo?.name || product.vendorId?.name || 'Unknown Vendor'}
                      </div>
                      <h3 className="font-poppins font-bold text-dark mb-1">{product.name}</h3>
                      <div className="text-sm text-mid mb-3">
                        Rs. {product.price?.toLocaleString()} each
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-2 border-slate-200 rounded-lg">
                          <button
                            onClick={() => updateQty(item.productId, Math.max(1, item.qty - 1))}
                            className="px-3 py-1 hover:bg-slate-50 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.qty + 1)}
                            className="px-3 py-1 hover:bg-slate-50 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-all flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-poppins text-xl font-extrabold text-primary">
                        Rs. {(product.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[20px] p-6 shadow-sm sticky top-24">
                <h2 className="font-poppins text-xl font-bold text-dark mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-mid">
                    <span>Subtotal</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-mid">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t-2 border-slate-200 pt-3 flex justify-between">
                    <span className="font-poppins font-bold text-dark">Total</span>
                    <span className="font-poppins text-2xl font-extrabold text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white font-poppins font-bold py-4 rounded-xl hover:bg-primary-dark transition-all mb-3"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-slate-100 text-dark font-poppins font-semibold py-3 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
