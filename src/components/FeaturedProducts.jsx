import React from 'react';
import ProductCard from './ProductCard';

const products = [
    {
        id: 1,
        name: 'USB-C Fast Charger 65W GaN',
        vendor: 'TechBazar PK',
        price: '2,200',
        oldPrice: '3,000',
        emoji: '📱',
        badge: 'HOT',
        badgeClass: 'bg-danger text-white',
        reviews: 142
    },
    {
        id: 2,
        name: 'Embroidered Lawn Suit 3-Piece',
        vendor: 'Lahore Threads',
        price: '3,500',
        oldPrice: '5,200',
        emoji: '👗',
        badge: 'SALE',
        badgeClass: 'bg-accent text-white',
        reviews: 89
    },
    {
        id: 3,
        name: 'Handmade Silver Jhumka Earrings',
        vendor: 'Ayesha Crafts',
        price: '1,800',
        emoji: '💍',
        badge: 'NEW',
        badgeClass: 'bg-primary text-white',
        reviews: 217
    },
    {
        id: 4,
        name: 'Organic Rose Water Skincare Set',
        vendor: 'NatureCare PK',
        price: '2,100',
        oldPrice: '2,800',
        emoji: '🌿',
        badge: 'TREND',
        badgeClass: 'bg-[#8B5CF6] text-white',
        reviews: 304
    }
];

const FeaturedProducts = () => {
    return (
        <section className="px-[5%] py-20 bg-light" id="products">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[52px]">
                    <div className="inline-block bg-primary-light text-primary text-xs font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-4 font-poppins">
                        Featured Products
                    </div>
                    <h2 className="font-poppins text-[clamp(28px,3.5vw,42px)] font-extrabold text-dark tracking-[-1px] leading-[1.15]">
                        Trending Right <span className="text-primary">Now</span>
                    </h2>
                    <p className="text-base text-mid mt-3 leading-[1.7]">
                        Curated picks from our top-rated vendors this week.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-[44px]">
                    <a href="#all-products" className="btn-primary bg-accent text-white rounded-xl px-8 py-4 font-poppins font-bold shadow-[0_8px_24px_rgba(249,115,22,0.45)] inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(249,115,22,0.55)] transition-all no-underline">
                        View All Products &nbsp;→
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
