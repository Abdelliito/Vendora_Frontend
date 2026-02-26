import React from 'react';

const steps = [
    {
        icon: '🔍',
        title: 'Browse & Discover',
        desc: 'Explore thousands of products from verified Pakistani vendors across 14 categories.'
    },
    {
        icon: '🛒',
        title: 'Add to Cart',
        desc: 'Mix products from different vendors — one cart, one smooth checkout experience.'
    },
    {
        icon: '💳',
        title: 'Pay Securely',
        desc: 'Stripe-powered checkout with full PCI compliance. Your card details are always safe.'
    },
    {
        icon: 'Box',
        title: 'Fast Delivery',
        desc: 'Vendors dispatch orders quickly. Track your delivery every step of the way.',
        iconOverride: '📦'
    }
];

const HowItWorks = () => {
    return (
        <section className="px-[5%] py-20 bg-primary-deep relative" id="how">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[52px]">
                    <div className="inline-block bg-white/10 text-white/80 text-xs font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-4 font-poppins">
                        How It Works
                    </div>
                    <h2 className="font-poppins text-[clamp(28px,4vw,42px)] font-extrabold text-white leading-[1.15] tracking-[-1.5px]">
                        Shopping Made <span className="text-accent">Simple</span>
                    </h2>
                    <p className="text-base text-white/60 mt-3 leading-[1.7]">
                        From browsing to your doorstep in four easy steps.
                    </p>
                </div>

                <div className="hiw-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="text-center relative">
                            <div className={`w-[80px] h-[80px] rounded-full mx-auto mb-5 flex items-center justify-center text-[28px] relative z-[1] border-2 ${idx === 0 ? 'bg-accent/20 border-accent' : idx === 3 ? 'bg-[#10B981]/20 border-[#10B981]' : 'bg-white/10 border-white/30'}`}>
                                {step.iconOverride || step.icon}
                            </div>
                            <h3 className="font-poppins text-[17px] font-bold text-white mb-2.5">{step.title}</h3>
                            <p className="text-sm text-white/60 leading-[1.7]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
