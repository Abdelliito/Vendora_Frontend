import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../api/orderService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CreditCard, MapPin, User, Phone } from 'lucide-react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        postalCode: '',
        phone: '',
    });

    const total = cart.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + (price * item.qty);
    }, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Transform cart items to order items format
            const orderItems = cart.map(item => ({
                productId: item.productId,
                vendorId: item.product.vendorId._id || item.product.vendorId,
                name: item.product.name,
                price: item.product.price,
                qty: item.qty,
                image: item.product.images?.[0] || '',
            }));

            const orderData = {
                orderItems,
                shippingAddress: shippingInfo,
                paymentMethod: 'Cash on Delivery',
                totalPrice: total,
            };

            const result = await orderService.createOrder(orderData);
            
            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Failed to create order:', error);
            alert(error.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-light">
            <Navbar onNavigate={(path) => navigate(path)} />
            <div className="pt-[88px] px-[5%] py-12">
                <div className="max-w-[1000px] mx-auto">
                    <h1 className="font-poppins text-3xl font-extrabold text-dark mb-8">Checkout</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-[20px] p-8 shadow-sm">
                                <h2 className="font-poppins text-xl font-bold text-dark mb-6 flex items-center gap-2">
                                    <MapPin size={24} className="text-primary" />
                                    Shipping Information
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Full Address *</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            placeholder="House #, Street, Area"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">City *</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.city}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                                placeholder="Karachi, Lahore, etc."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-dark mb-2">Postal Code *</label>
                                            <input
                                                type="text"
                                                value={shippingInfo.postalCode}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                                placeholder="75000"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-dark mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-primary outline-none"
                                            placeholder="+92 300 1234567"
                                            required
                                        />
                                    </div>

                                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mt-6">
                                        <h3 className="font-poppins text-lg font-bold text-dark mb-3 flex items-center gap-2">
                                            <CreditCard size={20} className="text-primary" />
                                            Payment Method
                                        </h3>
                                        <div className="bg-white rounded-lg p-4 border-2 border-primary">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" checked readOnly className="w-5 h-5" />
                                                <div>
                                                    <div className="font-bold text-dark">Cash on Delivery (COD)</div>
                                                    <div className="text-sm text-mid">Pay when you receive your order</div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-mid mt-3">Online payment via Stripe will be available soon!</p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-white font-poppins font-bold py-4 rounded-xl hover:bg-primary-dark transition-all disabled:bg-slate-300 disabled:cursor-not-allowed mt-6"
                                    >
                                        {loading ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[20px] p-6 shadow-sm sticky top-24">
                                <h2 className="font-poppins text-xl font-bold text-dark mb-6">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6">
                                    {cart.map(item => (
                                        <div key={item.productId} className="flex justify-between text-sm">
                                            <span className="text-mid">{item.product.name} x {item.qty}</span>
                                            <span className="font-semibold">Rs. {(item.product.price * item.qty).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t-2 border-slate-200 pt-4 space-y-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
