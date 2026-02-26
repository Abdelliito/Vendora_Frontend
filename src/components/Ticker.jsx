import React from 'react';

const Ticker = () => {
    const items = [
        "🔥 Flash Sale — Up to 60% OFF",
        "🚚 Free Shipping on orders over Rs. 2,000",
        "✨ 500+ Verified Vendors Across Pakistan",
        "💳 Secure Stripe Payments",
        "📦 Same-Day Dispatch from Lahore"
    ];

    return (
        <div className="bg-accent overflow-hidden h-9 flex items-center">
            <div className="ticker-track">
                {/* Render twice for seamless loop */}
                {[...items, ...items].map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-[10px] px-8 font-poppins text-xs font-bold text-white uppercase tracking-[0.5px]">
                        {item}
                        <span className="w-[5px] h-[5px] bg-white/60 rounded-full" />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
