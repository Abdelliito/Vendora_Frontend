import React from 'react';

const PromoBanners = ({ onNavigate }) => {
    return (
        <section className="px-[5%] pb-20">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
                <div className="banner-card rounded-[24px] p-10 sm:p-[40px_44px] relative overflow-hidden min-h-[200px] flex flex-col justify-center bg-gradient-to-br from-primary-deep to-primary">
                    <div className="font-poppins text-[11px] font-bold tracking-[2px] uppercase text-white/70 mb-2.5">
                        Limited Time Offer
                    </div>
                    <h2 className="font-poppins text-[28px] font-extrabold text-white leading-[1.2] mb-2 relative z-[1]">
                        Flash Sale —<br />Up to 60% Off
                    </h2>
                    <p className="text-sm text-white/75 mb-6 relative z-[1]">
                        On electronics, fashion & handmade crafts. Today only.
                    </p>
                    <a href="#sale" className="btn-banner bg-white text-primary rounded-xl px-[22px] py-[11px] font-poppins font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all w-fit relative z-[1] no-underline">
                        Shop the Sale →
                    </a>
                    <span className="absolute right-10 bottom-5 text-[80px] opacity-50 z-0">⚡</span>
                </div>

                <div className="banner-card rounded-[24px] p-10 sm:p-[40px_44px] relative overflow-hidden min-h-[200px] flex flex-col justify-center bg-gradient-to-br from-[#C2410C] to-accent">
                    <div className="font-poppins text-[11px] font-bold tracking-[2px] uppercase text-white/70 mb-2.5">
                        For Sellers
                    </div>
                    <h2 className="font-poppins text-[28px] font-extrabold text-white leading-[1.2] mb-2 relative z-[1]">
                        Start Selling<br />in 3 Minutes
                    </h2>
                    <p className="text-sm text-white/75 mb-6 relative z-[1]">
                        Join 500+ vendors already earning on VENDORA.
                    </p>
                    <button
                        onClick={() => onNavigate('/register')}
                        className="btn-banner bg-white text-accent-dark rounded-xl px-[22px] py-[11px] font-poppins font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all w-fit relative z-[1] no-underline cursor-pointer"
                    >
                        Open Your Store →
                    </button>
                    <span className="absolute right-10 bottom-5 text-[80px] opacity-50 z-0">🚀</span>
                </div>
            </div>
        </section>
    );
};

export default PromoBanners;
