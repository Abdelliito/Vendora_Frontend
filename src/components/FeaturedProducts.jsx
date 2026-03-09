import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productService } from '../api/productService';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts({ limit: 4 });
                setProducts(data.products || data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
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
                    {loading ? (
                        <div className="col-span-full text-center py-12 text-mid">Loading products...</div>
                    ) : products.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-mid">No products available</div>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    )}
                </div>

                <div className="text-center mt-[44px]">
                    <a href="/products" className="btn-primary bg-accent text-white rounded-xl px-8 py-4 font-poppins font-bold shadow-[0_8px_24px_rgba(249,115,22,0.45)] inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(249,115,22,0.55)] transition-all no-underline">
                        View All Products &nbsp;→
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
