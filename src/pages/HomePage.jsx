import React from 'react';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import PromoBanners from '../components/PromoBanners';
import Vendors from '../components/Vendors';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = ({ onNavigate }) => {
    return (
        <div className="overflow-x-hidden pt-[68px]">
            <Navbar onNavigate={onNavigate} />
            <Ticker />
            <Hero onNavigate={onNavigate} />
            <Categories />
            <FeaturedProducts />
            <PromoBanners onNavigate={onNavigate} />
            <Vendors />
            <HowItWorks />
            <Testimonials />
            <CTA onNavigate={onNavigate} />
            <Footer />
        </div>
    );
};

export default HomePage;
