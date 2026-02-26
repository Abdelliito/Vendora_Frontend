import React from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';

const CTA = ({ onNavigate }) => {
    return (
        <section className="px-[5%] py-20 bg-gradient-to-br from-primary-deep to-primary relative overflow-hidden text-center">
            {/* Decorative gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(249,115,22,0.15)_0%,transparent_50%),radial-gradient(circle_at_90%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-[600px] mx-auto">
                <h2 className="font-poppins text-[clamp(28px,4vw,48px)] font-extrabold text-white tracking-[-1.5px] leading-[1.1] mb-[18px]">
                    Ready to Start <span className="text-accent">Shopping?</span>
                </h2>
                <p className="text-[17px] text-white/75 mb-10 leading-[1.7]">
                    Join over 50,000 Pakistanis discovering amazing products from local vendors every day.
                </p>
                <div className="flex flex-wrap gap-3.5 justify-center">
                    <button
                        onClick={() => onNavigate('/register')}
                        className="btn-primary bg-accent text-white rounded-xl px-8 py-4 font-poppins font-bold flex items-center gap-2 hover:-translate-y-0.5 shadow-lg shadow-accent/20 no-underline transition-all cursor-pointer"
                    >
                        <UserPlus size={18} />
                        Create Free Account
                        <ArrowRight size={18} />
                    </button>
                    <a href="#browse" className="btn-secondary bg-white/12 text-white border-2 border-white/30 rounded-xl px-8 py-3.5 font-poppins font-semibold flex items-center gap-2 hover:bg-white/20 hover:-translate-y-0.5 no-underline transition-all">
                        Browse as Guest
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
