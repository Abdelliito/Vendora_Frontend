import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2, Store, Chrome, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = ({ onNavigate }) => {
    const navigate = useNavigate();
    const { register, error: authError } = useAuth();
    const [role, setRole] = useState('customer');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLocalError(null);

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setLocalError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: role === 'vendor' ? 'Vendor' : 'Customer',
            // If vendor, we can initialize storeInfo with phone
            ...(role === 'vendor' && { storeInfo: { phone: formData.phone, name: `${formData.name} 's Store` } })
        };

        const result = await register(payload);
        if (result.success) {
            navigate('/');
        } else {
            setLoading(false);
        }
    };

    const error = localError || authError;

    return (
        <div className="min-h-screen bg-light flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row relative z-10 border border-slate-100">

                {/* Left Side: Branding & Info */}
                <div className="w-full md:w-[40%] bg-primary p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-deep via-primary to-blue-500 opacity-90" />
                    <div className="hero-grid opacity-20" />

                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-2.5 no-underline mb-12">
                            <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="80" height="80" rx="20" fill="currentColor" fillOpacity="0.2" />
                                    <polygon points="12,16 27,16 40,56 35,56" fill="white" />
                                    <polygon points="68,16 53,16 40,56 45,56" fill="white" />
                                </svg>
                            </div>
                            <span className="font-poppins font-extrabold text-xl text-white tracking-[-0.5px]">
                                VENDOR<span className="text-accent">A</span>
                            </span>
                        </Link>

                        <h2 className="font-poppins text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
                            Start your <span className="text-accent underline decoration-accent/30 underline-offset-4">journey</span> with us.
                        </h2>
                        <p className="text-white/70 text-base leading-[1.7] mb-8">
                            Join Pakistan's fastest growing marketplace and discover premium local products at the best prices.
                        </p>

                        <div className="space-y-5">
                            {[
                                "Access to 500+ verified vendors",
                                "Secure payments via Stripe",
                                "Fast & reliable shipping nationwide",
                                "24/7 priority customer support"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={14} className="text-accent" />
                                    </div>
                                    <span className="text-sm text-white/80">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                        <p className="text-xs text-white/50">© 2026 VENDORA Marketplace. Empowering local business.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[60%] p-10 lg:p-14 bg-white">
                    <div className="max-w-md mx-auto">
                        <div className="mb-10">
                            <h1 className="font-poppins text-2xl font-extrabold text-dark mb-2">Create Account</h1>
                            <p className="text-sm text-mid">Already have an account? <button onClick={() => onNavigate('/login')} className="text-primary font-bold hover:underline cursor-pointer border-none bg-transparent p-0">Log in</button></p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-3 text-danger text-sm font-medium animate-shake">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        {/* Role Switcher */}
                        <div className="flex p-1 bg-light rounded-xl mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('customer')}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${role === 'customer' ? 'bg-white text-primary shadow-sm' : 'text-mid hover:text-dark hover:bg-white/50'}`}
                            >
                                <User size={16} />
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('vendor')}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${role === 'vendor' ? 'bg-white text-accent shadow-sm' : 'text-mid hover:text-dark hover:bg-white/50'}`}
                            >
                                <Store size={16} />
                                Vendor
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-dark uppercase tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid" />
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Ahmed Khan"
                                            className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-dark uppercase tracking-wider">Phone</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid" />
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+92 300 1234567"
                                            className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-dark uppercase tracking-wider">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid" />
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-dark uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid" />
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-4">
                                <button
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-poppins font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${role === 'vendor' ? 'bg-accent shadow-accent/25 hover:bg-accent-dark hover:shadow-accent/40' : 'bg-primary shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40'}`}>
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create {role === 'vendor' ? 'Store' : 'Account'}
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                                <p className="text-[11px] text-mid text-center leading-relaxed">
                                    By signing up, you agree to our <a href="#" className="font-bold hover:underline">Terms of Service</a> and <a href="#" className="font-bold hover:underline">Privacy Policy</a>.
                                </p>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-mid font-medium tracking-wider">Or sign up with</span></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-xl text-sm font-bold text-dark hover:bg-slate-50 hover:border-slate-200 hover:-translate-y-0.5 transition-all cursor-pointer">
                                        <Chrome size={18} className="text-[#DB4437]" />
                                        Google
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-slate-100 rounded-xl text-sm font-bold text-dark hover:bg-slate-50 hover:border-slate-200 hover:-translate-y-0.5 transition-all cursor-pointer">
                                        <span className="text-[#1877F2] font-bold text-xl">f</span>
                                        Facebook
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
