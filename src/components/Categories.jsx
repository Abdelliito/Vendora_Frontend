import React from 'react';

const categories = [
    { name: 'Electronics', icon: '📱', color: '#EFF6FF' },
    { name: 'Fashion', icon: '👗', color: '#FFF7ED' },
    { name: 'Food', icon: '🥘', color: '#F0FDF4' },
    { name: 'Jewellery', icon: '💎', color: '#FDF4FF' },
    { name: 'Home Living', icon: '🏠', color: '#FFFBEB' },
    { name: 'Handmade', icon: '🎨', color: '#FFF1F2' },
    { name: 'Books', icon: '📚', color: '#F0FDF4' },
];

const Categories = () => {
    return (
        <section className="px-[5%] py-20" id="categories">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-[52px]">
                    <div className="inline-block bg-primary-light text-primary text-xs font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-4 font-poppins">
                        Browse by Category
                    </div>
                    <h2 className="font-poppins text-[clamp(28px,3.5vw,42px)] font-extrabold text-dark tracking-[-1px] leading-[1.15]">
                        Find What You <span className="text-primary">Love</span>
                    </h2>
                    <p className="text-base text-mid mt-3 leading-[1.7]">
                        From handmade crafts to cutting-edge electronics — it's all here.
                    </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map((cat, idx) => (
                        <a key={idx} href={`#${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-[10px] p-6 sm:px-3 py-6 rounded-[18px] bg-white border-2 border-slate-200 hover:border-primary hover:bg-primary-light hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(37,99,235,0.18)] transition-all group">
                            <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[26px]" style={{ backgroundColor: cat.color }}>
                                {cat.icon}
                            </div>
                            <span className="font-poppins text-[11px] font-bold text-slate-700 text-center tracking-[0.2px] group-hover:text-primary">
                                {cat.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
