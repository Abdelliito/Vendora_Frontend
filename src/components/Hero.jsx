import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';

const Hero = ({ onNavigate }) => {
    return (
        <section className="min-h-[calc(100vh-104px)] bg-gradient-to-br from-primary-deep via-primary to-blue-400 bg-[length:300%_300%] animate-[gradShift_8s_ease_infinite] relative overflow-hidden flex items-center px-[5%] py-[60px]">
            <div className="hero-grid" />
            <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-accent/15 blur-[60px]" />
            <div className="absolute bottom-[-40px] left-[20%] w-[200px] h-[200px] rounded-full bg-blue-400/20 blur-[60px]" />

            <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
                <div className="text-center lg:text-left">
                    <div className="hero-eyebrow fade-up inline-flex items-center gap-2 bg-white/12 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-white tracking-[1.5px] uppercase mb-6">
                        <span className="hero-eyebrow-dot w-[7px] h-[7px] bg-accent rounded-full relative" />
                        Pakistan's #1 Multi-Vendor Marketplace
                    </div>

                    <h1 className="hero-title fade-up-2 font-poppins text-[clamp(40px,5vw,68px)] font-[900] text-white leading-[1.08] tracking-[-2px] mb-6">
                        Shop From<br />
                        <span className="highlight text-accent relative inline-block">Thousands</span><br />
                        of Local Sellers
                    </h1>

                    <p className="hero-sub fade-up-3 text-lg text-white/80 leading-[1.7] max-w-[480px] mx-auto lg:mx-0 mb-10">
                        Discover unique products from verified Pakistani vendors — handmade crafts, fashion, electronics & more. All in one place, all at the best prices.
                    </p>

                    <div className="hero-cta fade-up-4 flex flex-wrap gap-3.5 justify-center lg:justify-start mb-[52px]">
                        <a href="#products" className="btn-primary bg-accent text-white rounded-xl px-8 py-4 font-poppins font-bold shadow-[0_8px_24px_rgba(249,115,22,0.45)] flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(249,115,22,0.55)] transition-all no-underline">
                            <ShoppingBag size={20} />
                            Shop Now &nbsp;→
                        </a>
                        <button
                            onClick={() => onNavigate('/register')}
                            className="btn-secondary bg-white/12 text-white border-2 border-white/30 rounded-xl px-8 py-3.5 font-poppins font-semibold flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                        >
                            <Store size={20} />
                            Become a Vendor
                        </button>
                    </div>

                    <div className="hero-stats fade-up-5 flex gap-8 justify-center lg:justify-start">
                        <div className="hero-stat">
                            <div className="font-poppins text-[28px] font-extrabold text-white">12<span className="text-accent">K+</span></div>
                            <div className="text-[13px] text-white/60 mt-0.5">Products Listed</div>
                        </div>
                        <div className="hero-stat">
                            <div className="font-poppins text-[28px] font-extrabold text-white">500<span className="text-accent">+</span></div>
                            <div className="text-[13px] text-white/60 mt-0.5">Active Vendors</div>
                        </div>
                        <div className="hero-stat">
                            <div className="font-poppins text-[28px] font-extrabold text-white">98<span className="text-accent">%</span></div>
                            <div className="text-[13px] text-white/60 mt-0.5">Happy Customers</div>
                        </div>
                    </div>
                </div>

                {/* Floating cards */}
                <div className="hidden lg:flex relative h-[480px] items-center justify-center fade-in">
                    <div className="floating-card card-left absolute w-[160px] bg-white rounded-[20px] overflow-hidden z-[2] top-[30%] left-[5%]">
                        <div className="h-[140px] flex items-center justify-center text-[56px] bg-[#FFF7ED] relative">
                            👜
                            <span className="absolute top-[10px] left-[10px] bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-poppins">SALE</span>
                        </div>
                        <div className="p-[14px]">
                            <div className="font-poppins text-[13px] font-bold text-dark mb-1">Embroidered Clutch</div>
                            <div className="font-poppins text-[15px] font-extrabold text-primary">Rs. 1,800 <span className="text-[11px] text-mid line-through ml-1.5 font-normal">2,500</span></div>
                            <div className="text-[11px] color-[#F59E0B] mt-1">★★★★★</div>
                        </div>
                    </div>

                    <div className="floating-card card-main absolute w-[210px] bg-white rounded-[20px] overflow-hidden z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-[160px] flex items-center justify-center text-[72px] bg-[#EFF6FF] relative">
                            👟
                            <span className="absolute top-[10px] left-[10px] bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-poppins">HOT</span>
                        </div>
                        <div className="p-[14px]">
                            <div className="font-poppins text-[15px] font-bold text-dark mb-1">Street Sneakers Pro</div>
                            <div className="font-poppins text-[18px] font-extrabold text-primary">Rs. 4,200 <span className="text-[11px] text-mid line-through ml-1.5 font-normal">6,000</span></div>
                            <div className="text-[11px] color-[#F59E0B] mt-1">★★★★☆ (284)</div>
                        </div>
                    </div>

                    <div className="floating-card card-right absolute w-[160px] bg-white rounded-[20px] overflow-hidden z-[2] bottom-[20%] right-[5%]">
                        <div className="h-[140px] flex items-center justify-center text-[56px] bg-[#F0FDF4] relative">
                            🌿
                            <span className="absolute top-[10px] left-[10px] bg-[#10B981] text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-poppins">NEW</span>
                        </div>
                        <div className="p-[14px]">
                            <div className="font-poppins text-[13px] font-bold text-dark mb-1">Herbal Skincare Kit</div>
                            <div className="font-poppins text-[15px] font-extrabold text-primary">Rs. 2,100</div>
                            <div className="text-[11px] color-[#F59E0B] mt-1">★★★★★</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
