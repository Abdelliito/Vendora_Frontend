import React, { useState } from 'react';
import { ShoppingCart, LogIn, UserPlus, LogOut, User as UserIcon, ChevronDown, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = ({ onNavigate }) => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-primary px-[5%] h-[68px] flex items-center justify-between shadow-[0_4px_24px_rgba(37,99,235,0.3)]">
            <Link to="/" className="flex items-center gap-[10px] no-underline">
                <div className="w-[40px] h-[40px] flex-shrink-0">
                    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="navBg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#2563EB" />
                            </linearGradient>
                        </defs>
                        <rect width="80" height="80" rx="20" fill="url(#navBg)" />
                        <polygon points="12,16 27,16 40,56 35,56" fill="white" />
                        <polygon points="68,16 53,16 40,56 45,56" fill="white" />
                    </svg>
                </div>
                <span className="font-poppins font-extrabold text-[22px] text-white tracking-[-0.5px]">
                    VENDOR<span className="text-accent">A</span>
                </span>
            </Link>

            <ul className="hidden md:flex items-center gap-[28px] list-none">
                <li><Link to="/products" className="text-white/85 no-underline text-sm font-medium transition-colors hover:text-white">All Products</Link></li>
                <li><a href="/#categories" className="text-white/85 no-underline text-sm font-medium transition-colors hover:text-white">Categories</a></li>
                <li><a href="/#vendors" className="text-white/85 no-underline text-sm font-medium transition-colors hover:text-white">Vendors</a></li>
                <li><a href="/#how" className="text-white/85 no-underline text-sm font-medium transition-colors hover:text-white">How It Works</a></li>
            </ul>

            <div className="flex items-center gap-[12px]">
                <button
                    onClick={() => navigate('/cart')}
                    className="relative text-white cursor-pointer p-[6px] hover:bg-white/10 rounded-lg transition-all"
                >
                    <ShoppingCart size={20} />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-accent text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center animate-[badgePop_0.4s_1s_cubic-bezier(.22,.68,0,1.2)_both]">
                            {cart.length}
                        </span>
                    )}
                </button>

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl transition-all cursor-pointer"
                        >
                            <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center font-bold text-xs">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline text-sm font-bold">{user.name.split(' ')[0]}</span>
                            <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showUserMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[110] animate-fade-in">
                                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logged in as</p>
                                    <p className="text-sm font-bold text-dark truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                                    className="w-full text-left px-4 py-2 text-sm text-dark hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <UserIcon size={16} className="text-primary" />
                                    My Profile
                                </button>
                                {user.role === 'Vendor' && (
                                    <button
                                        onClick={() => { navigate('/vendor/dashboard'); setShowUserMenu(false); }}
                                        className="w-full text-left px-4 py-2 text-sm text-dark hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                        <ShoppingBag size={16} className="text-accent" />
                                        Vendor Dashboard
                                    </button>
                                )}
                                <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/5 transition-colors flex items-center gap-2 cursor-pointer font-bold"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => onNavigate('/login')}
                            className="hidden sm:flex items-center gap-2 text-white bg-white/10 border border-white/25 rounded-lg px-[18px] py-[8px] text-sm font-semibold hover:bg-white/20 transition-all no-underline cursor-pointer"
                        >
                            <LogIn size={16} />
                            Log In
                        </button>
                        <button
                            onClick={() => onNavigate('/register')}
                            className="flex items-center gap-2 text-white bg-accent border-none rounded-lg px-[18px] py-[8px] text-sm font-bold shadow-[0_4px_12px_rgba(249,115,22,0.4)] hover:bg-accent-dark hover:-translate-y-[1px] transition-all no-underline cursor-pointer"
                        >
                            <UserPlus size={16} />
                            Sign Up Free
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
