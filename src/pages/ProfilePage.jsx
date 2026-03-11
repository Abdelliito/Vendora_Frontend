import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Mail,
  Calendar,
  Activity,
  Users,
  Store,
  Package,
  ReceiptText,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'Admin') {
      fetchAdminStats();
    }
  }, [authLoading, user, navigate]);

  const fetchAdminStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError('');
      const res = await api.get('/admin/stats');
      setStats(res.data?.stats || null);
    } catch (error) {
      setStatsError(error.response?.data?.message || 'Unable to load admin stats right now.');
    } finally {
      setStatsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const joinedOn = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
  const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Not available';

  return (
    <div className="min-h-screen bg-light">
      <Navbar onNavigate={(path) => navigate(path)} />

      <div className="pt-[88px] px-[5%] py-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-white rounded-[24px] shadow-sm p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-poppins font-extrabold text-2xl">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className="font-poppins text-3xl font-extrabold text-dark">My Profile</h1>
                  <p className="text-mid">Manage your account details and role information.</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-xl font-bold text-sm">
                <ShieldCheck size={16} />
                {user.role}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-[20px] p-6 shadow-sm lg:col-span-2">
              <h2 className="font-poppins text-xl font-bold text-dark mb-5">Account Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mid font-bold">Full Name</p>
                    <p className="text-dark font-semibold">{user.name || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mid font-bold">Email</p>
                    <p className="text-dark font-semibold">{user.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mid font-bold">Joined</p>
                    <p className="text-dark font-semibold">{joinedOn}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-mid font-bold">Last Login</p>
                    <p className="text-dark font-semibold">{lastLogin}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <h2 className="font-poppins text-xl font-bold text-dark mb-4">Quick Access</h2>
              <div className="space-y-3">
                {user.role === 'Vendor' && (
                  <button
                    onClick={() => navigate('/vendor/dashboard')}
                    className="w-full text-left bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 font-semibold text-dark transition-all"
                  >
                    Open Vendor Dashboard
                  </button>
                )}

                {user.role === 'Admin' && (
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full text-left bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 font-semibold text-dark transition-all"
                  >
                    Review Marketplace Products
                  </button>
                )}

                <button
                  onClick={() => navigate('/')}
                  className="w-full text-left bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3 font-semibold text-dark transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          {user.role === 'Admin' && (
            <div className="bg-white rounded-[24px] p-8 shadow-sm">
              <h2 className="font-poppins text-2xl font-extrabold text-dark mb-2">Admin Overview</h2>
              <p className="text-mid mb-6">Live platform snapshot from admin APIs.</p>

              {statsLoading ? (
                <div className="py-8 flex items-center gap-3 text-mid">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Loading admin stats...
                </div>
              ) : statsError ? (
                <div className="bg-danger/5 text-danger border border-danger/20 rounded-xl px-4 py-3 text-sm font-medium">
                  {statsError}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-primary mb-1"><Users size={16} /> Customers</div>
                    <div className="font-poppins text-2xl font-extrabold text-dark">{stats?.totalUsers ?? 0}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-primary mb-1"><Store size={16} /> Vendors</div>
                    <div className="font-poppins text-2xl font-extrabold text-dark">{stats?.totalVendors ?? 0}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-primary mb-1"><Package size={16} /> Products</div>
                    <div className="font-poppins text-2xl font-extrabold text-dark">{stats?.totalProducts ?? 0}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-primary mb-1"><ReceiptText size={16} /> Orders</div>
                    <div className="font-poppins text-2xl font-extrabold text-dark">{stats?.totalOrders ?? 0}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
