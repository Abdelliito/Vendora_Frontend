import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1200);
    };

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    // Map category to emoji and badge
    const getCategoryEmoji = (category) => {
        const emojiMap = {
            'Electronics': '📱',
            'Jewellery & Accessories': '💍',
            'Handmade & Crafts': '🎨',
            'Clothing & Fashion': '👗',
            'Health & Beauty': '🌿',
        };
        return emojiMap[category] || '🛍️';
    };

    const vendorName = product.vendorId?.storeInfo?.name || product.vendorId?.name || 'Unknown Vendor';
    const productImage = product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image';
    const badge = product.stock < 5 ? 'LOW STOCK' : 'NEW';
    const badgeClass = product.stock < 5 ? 'bg-danger text-white' : 'bg-primary text-white';

    return (
        <div onClick={handleCardClick} className="prod-card bg-white rounded-[20px] overflow-hidden group cursor-pointer">
            <div className="h-[200px] flex items-center justify-center text-[80px] relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-200">
                {productImage.includes('placeholder') ? (
                    <span>{getCategoryEmoji(product.category)}</span>
                ) : (
                    <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
                )}
                <span className={`absolute top-3.5 left-3.5 font-poppins text-[10px] font-extrabold px-[10px] py-1 rounded-full z-[1] tracking-[0.5px] uppercase ${badgeClass}`}>
                    {badge}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
                    className="absolute top-3.5 right-3.5 w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center text-base shadow-[0_2px_8px_rgba(0,0,0,0.12)] z-[1] transition-transform hover:scale-110 active:scale-125"
                >
                    <Heart size={16} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#64748B'} />
                </button>
            </div>

            <div className="p-[16px_18px_20px]">
                <div className="text-[11px] text-mid font-medium mb-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {vendorName}
                </div>
                <h3 className="font-poppins text-sm font-bold text-dark mb-2 line-height-[1.3]">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[#F59E0B] text-xs">★★★★★</span>
                    <span className="text-xs text-mid">({product.rating || 0} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="font-poppins text-xl font-extrabold text-primary">Rs. {product.price?.toLocaleString()}</span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`w-[38px] h-[38px] flex items-center justify-center rounded-xl text-white text-xl font-light shadow-lg transition-all active:scale-95 ${isAdded ? 'bg-[#10B981]' : 'bg-primary hover:bg-primary-dark hover:scale-110'}`}
                    >
                        {isAdded ? '✓' : '+'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
