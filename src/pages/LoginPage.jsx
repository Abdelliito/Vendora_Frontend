import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, LogIn, Chrome, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
    const navigate = useNavigate();
    const { login, error: authError } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        if (!formData.email || !formData.password) {
            setLocalError('Please fill in all fields');
            setLoading(false);
            return;
        }

        const result = await login(formData.email, formData.password);
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

                {/* Left Side: Branding & Welcome Message */}
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
                            Welcome <span className="text-accent underline decoration-accent/30 underline-offset-4">Back</span> to the Marketplace.
                        </h2>
                        <p className="text-white/70 text-base leading-[1.7] mb-8">
                            Log in to access your dashboard, track orders, and discover the latest arrivals from Pakistan's top vendors.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-white/20 group-hover:scale-110">
                                    <ShieldCheck className="text-accent" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Secure Login</div>
                                    <div className="text-xs text-white/50">256-bit SSL Encryption</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-white/20 group-hover:scale-110">
                                    <LogIn className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Easy Access</div>
                                    <div className="text-xs text-white/50">One-click social login</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                        <p className="text-xs text-white/50">Pakistan's trusted multi-vendor platform.</p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-[60%] p-10 lg:p-14 bg-white">
                    <div className="max-w-md mx-auto">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="font-poppins text-2xl font-extrabold text-dark mb-2">Member Login</h1>
                            <p className="text-sm text-mid">New to Vendora? <button onClick={() => onNavigate('/register')} className="text-primary font-bold hover:underline cursor-pointer border-none bg-transparent p-0">Create an account</button></p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div className="mb-6 p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-3 text-danger text-sm font-medium animate-shake">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
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
                                        className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-dark uppercase tracking-wider">Password</label>
                                    <a href="#" className="text-[11px] font-bold text-primary hover:underline">Forgot?</a>
                                </div>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid" />
                                    <input
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-light border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 py-1">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                <label htmlFor="remember" className="text-xs text-mid font-medium cursor-pointer">Remember me for 30 days</label>
                            </div>

                            <div className="pt-2">
                                <button
                                    disabled={loading}
                                    className="w-full py-4 bg-primary rounded-xl font-poppins font-bold text-white shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-primary/40 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign In to Account
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-mid font-medium tracking-wider">Or continue with</span></div>
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
