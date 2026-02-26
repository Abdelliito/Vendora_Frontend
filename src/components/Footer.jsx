import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark px-[5%] pt-[60px] pb-8 text-white/60">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10 mb-8">
                    <div>
                        <div className="font-poppins text-2xl font-extrabold text-white mb-3.5">
                            VENDOR<span className="text-accent">A</span>
                        </div>
                        <p className="text-sm leading-[1.7] mb-5">
                            Pakistan's fastest-growing multi-vendor marketplace. Connecting local sellers with buyers across the country.
                        </p>
                        <div className="flex gap-2.5">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-[38px] h-[38px] rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-base hover:bg-primary hover:border-primary transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="font-poppins text-sm font-bold text-white mb-[18px] tracking-[0.3px]">Shop</div>
                        <ul className="list-none flex flex-col gap-2.5">
                            {['All Products', 'Categories', 'New Arrivals', 'Flash Sales', 'Top Vendors'].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors no-underline">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="font-poppins text-sm font-bold text-white mb-[18px] tracking-[0.3px]">Sell</div>
                        <ul className="list-none flex flex-col gap-2.5">
                            {['Become a Vendor', 'Vendor Dashboard', 'Seller Guidelines', 'Commission Rates', 'Vendor Support'].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors no-underline">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="font-poppins text-sm font-bold text-white mb-[18px] tracking-[0.3px]">Help</div>
                        <ul className="list-none flex flex-col gap-2.5">
                            {['About VENDORA', 'Contact Us', 'FAQs', 'Privacy Policy', 'Terms of Service'].map((link) => (
                                <li key={link}><a href="#" className="text-sm text-white/55 hover:text-white transition-colors no-underline">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]">
                    <span>© 2026 <span className="text-accent">VENDORA</span>. All rights reserved.</span>
                    <span>Made with ❤️ for Pakistan 🇵🇰</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
