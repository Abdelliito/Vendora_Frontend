import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../api/productService';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingCart, Heart, Star, Package, Shield } from 'lucide-react';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data.product || data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            alert('Added to cart!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">Loading product...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">Product not found</div>
            </div>
        );
    }

    const vendorName = product.vendorId?.storeInfo?.name || product.vendorId?.name || 'Unknown Vendor';

    return (
        <div className="min-h-screen bg-light">
            <Navbar onNavigate={(path) => navigate(path)} />
            <div className="pt-[88px] px-[5%] py-12">
                <div className="max-w-[1200px] mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary font-semibold mb-6 hover:underline"
                    >
                        ← Back to Products
                    </button>

                    <div className="bg-white rounded-[24px] p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Product Images */}
                            <div>
                                <div className="aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                                    {product.images && product.images[selectedImage] ? (
                                        <img
                                            src={product.images[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-8xl">🛍️</span>
                                    )}
                                </div>
                                {product.images && product.images.length > 1 && (
                                    <div className="flex gap-3">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(idx)}
                                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-slate-200'}`}
                                            >
                                                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div>
                                <div className="text-sm text-primary font-semibold mb-2">{product.category}</div>
                                <h1 className="font-poppins text-3xl font-extrabold text-dark mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-mid">(4.8 rating)</span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-4xl font-poppins font-extrabold text-primary mb-2">
                                        Rs. {product.price?.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-mid">
                                        Sold by: <span className="font-semibold text-dark">{vendorName}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-dark mb-2">Description</h3>
                                    <p className="text-mid leading-relaxed">{product.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Package size={18} className="text-primary" />
                                            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Shield size={18} className="text-primary" />
                                            <span>Verified Seller</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity & Add to Cart */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <label className="font-semibold">Quantity:</label>
                                        <div className="flex items-center border-2 border-slate-200 rounded-lg">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-2 hover:bg-slate-50"
                                            >
                                                -
                                            </button>
                                            <span className="px-6 py-2 font-semibold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                className="px-4 py-2 hover:bg-slate-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            className="flex-1 bg-primary text-white font-poppins font-bold py-4 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </button>
                                        <button className="w-14 h-14 bg-light rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all">
                                            <Heart size={20} />
                                        </button>
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

export default ProductDetailPage;
