
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    X,
    ShieldCheck
} from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const navItems = [
        { name: 'Admin Overview', path: '/admin/dashboard', icon: BarChart3 },
        { name: 'Vendors', path: '/admin/vendors', icon: Users },
        { name: 'All Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'System Settings', path: '/admin/settings', icon: Settings },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        setShowLogoutConfirm(false);
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFBF9]">
            {/* Admin Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col h-screen sticky top-0">
                <div className="p-8 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-dark text-white rounded-lg flex items-center justify-center">
                        <ShieldCheck size={20} />
                    </div>
                    <Link to="/" className="text-xl font-bold text-dark tracking-tight">QwikAdmin</Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Platform Control</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                                    ? 'bg-dark text-white font-medium shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-dark'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span>Admin Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pb-20 md:pb-0 min-h-screen">
                <header className="h-16 border-b border-gray-50 bg-white px-4 md:px-8 flex items-center justify-between md:hidden">
                    <span className="text-xl font-bold text-dark">QwikAdmin</span>
                    <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center text-white">
                        <ShieldCheck size={16} />
                    </div>
                </header>
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Logout Confirmation */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-dark/20 backdrop-blur-sm"
                        onClick={() => setShowLogoutConfirm(false)}
                    />
                    <div className="relative bg-white w-full max-w-sm p-8 rounded-[40px] shadow-2xl">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-dark mb-2">Sign Out Admin?</h3>
                            <p className="text-gray-500 mb-8">End your administrative session.</p>
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-dark text-white py-4 rounded-2xl font-bold"
                                >
                                    Confirm Exit
                                </button>
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="w-full py-4 text-gray-400 font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
