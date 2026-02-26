import React from 'react';

const vendors = [
    {
        name: 'TechBazar PK',
        category: 'Electronics & Gadgets',
        avatar: '🧑‍💻',
        products: 284,
        rating: '4.9★'
    },
    {
        name: 'Ayesha Crafts',
        category: 'Jewellery & Handmade',
        avatar: '👩‍🎨',
        products: 156,
        rating: '5.0★'
    },
    {
        name: 'Lahore Threads',
        category: 'Clothing & Fashion',
        avatar: '👔',
        products: 412,
        rating: '4.8★'
    },
    {
        name: 'NatureCare PK',
        category: 'Health & Beauty',
        avatar: '🌿',
        products: 93,
        rating: '4.9★'
    }
];

const Vendors = () => {
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
                    {vendors.map((vendor, idx) => (
                        <div key={idx} className="bg-white rounded-[20px] p-[28px_24px] text-center border-2 border-slate-200 hover:border-primary hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(37,99,235,0.18)] transition-all cursor-pointer">
                            <div className="w-[72px] h-[72px] rounded-full mx-auto mb-3.5 flex items-center justify-center text-[32px] border-[3px] border-primary-light relative">
                                {vendor.avatar}
                                <span className="absolute bottom-0 right-0 w-[22px] h-[22px] bg-primary rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">✓</span>
                            </div>
                            <h3 className="font-poppins text-[15px] font-bold text-dark mb-1">{vendor.name}</h3>
                            <p className="text-xs text-mid mb-3.5">{vendor.category}</p>
                            <div className="flex justify-center gap-5">
                                <div className="text-center">
                                    <div className="font-poppins text-base font-extrabold text-primary">{vendor.products}</div>
                                    <div className="text-[11px] text-mid">Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-poppins text-base font-extrabold text-primary">{vendor.rating}</div>
                                    <div className="text-[11px] text-mid">Rating</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vendors;
