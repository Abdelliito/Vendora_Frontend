import React from 'react';

const testimonials = [
    {
        text: "Found the most beautiful handmade jhumkas I've ever seen. The vendor packed them so carefully — felt like a gift. Will definitely order again!",
        name: 'Sana Mirza',
        loc: 'Lahore, Punjab',
        avatar: '👩',
    },
    {
        text: "Ordered a GaN charger for my laptop and it arrived the next day. The price was unbeatable compared to other sites. VENDORA is now my go-to.",
        name: 'Bilal Ahmed',
        loc: 'Karachi, Sindh',
        avatar: '👨',
    },
    {
        text: "As a vendor, the dashboard is so easy to use. I set up my store in under 10 minutes and made my first sale the same day. Incredible platform!",
        name: 'Ayesha Khan',
        loc: 'Faisalabad — Vendor',
        avatar: '👩‍💼',
    }
];

const Testimonials = () => {
    return (
        <section className="px-[5%] py-20">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[52px]">
                    <div className="inline-block bg-primary-light text-primary text-xs font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-4 font-poppins">
                        Customer Reviews
                    </div>
                    <h2 className="font-poppins text-[clamp(28px,3.5vw,42px)] font-extrabold text-dark tracking-[-1px] leading-[1.15]">
                        What People Are <span className="text-primary">Saying</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testi, idx) => (
                        <div key={idx} className="bg-white rounded-[20px] p-7 border-2 border-slate-200 hover:border-primary-light hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all group">
                            <div className="text-5xl text-primary-light font-serif leading-none mb-3">"</div>
                            <p className="text-[15px] text-slate-700 leading-[1.75] italic mb-5">
                                {testi.text}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-[22px]">
                                    {testi.avatar}
                                </div>
                                <div>
                                    <div className="font-poppins text-sm font-bold text-dark">{testi.name}</div>
                                    <div className="text-xs text-mid">{testi.loc}</div>
                                    <div className="text-[#F59E0B] text-[13px] mt-0.5">★★★★★</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
