import React, { useState, useEffect } from 'react';
import { vendorService } from '../api/vendorService';

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const data = await vendorService.getAllVendors();
                setVendors(data.vendors || data);
            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    const getCategoryEmoji = (category) => {
        const emojiMap = {
            'Electronics & Gadgets': '🧑‍💻',
            'Jewellery & Handmade': '👩‍🎨',
            'Clothing & Fashion': '👔',
            'Health & Beauty': '🌿',
        };
        return emojiMap[category] || '🏪';
    };
    return (
        <section className="px-[5%] py-20 bg-light" id="vendors">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[52px]">
                    <div className="inline-block bg-primary-light text-primary text-xs font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-4 font-poppins">
                        Top Vendors
                    </div>
                    <h2 className="font-poppins text-[clamp(28px,3.5vw,42px)] font-extrabold text-dark tracking-[-1px] leading-[1.15]">
                        Meet Our <span className="text-primary">Best Sellers</span>
                    </h2>
                    <p className="text-base text-mid mt-3 leading-[1.7]">
                        Verified vendors with thousands of happy customers across Pakistan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {loading ? (
                        <div className="col-span-full text-center py-12 text-mid">Loading vendors...</div>
                    ) : vendors.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-mid">No vendors available</div>
                    ) : (
                        vendors.map((vendor, idx) => (
                            <div key={vendor._id || idx} className="bg-white rounded-[20px] p-[28px_24px] text-center border-2 border-slate-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)] transition-all cursor-pointer">
                                <div className="w-[72px] h-[72px] rounded-full mx-auto mb-3.5 flex items-center justify-center text-[32px] border-[3px] border-primary-light relative">
                                    {getCategoryEmoji(vendor.storeInfo?.category)}
                                    <span className="absolute bottom-0 right-0 w-[22px] h-[22px] bg-primary rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">✓</span>
                                </div>
                                <h3 className="font-poppins text-[15px] font-bold text-dark mb-1">{vendor.storeInfo?.name || vendor.name}</h3>
                                <p className="text-xs text-mid mb-3.5">{vendor.storeInfo?.category || 'General'}</p>
                                <div className="flex justify-center gap-5">
                                    <div className="text-center">
                                        <div className="font-poppins text-base font-extrabold text-primary">{vendor.productCount || 0}</div>
                                        <div className="text-[11px] text-mid">Products</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-poppins text-base font-extrabold text-primary">{vendor.rating || '5.0'}★</div>
                                        <div className="text-[11px] text-mid">Rating</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Vendors;
