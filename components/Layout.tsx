
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  CreditCard,
  LogOut,
  X
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Billing', path: '/billing', icon: CreditCard },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col h-screen sticky top-0">
        <div className="p-8">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight">QwikOrder</Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path) 
                  ? 'bg-primary text-white font-medium shadow-sm' 
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
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0 min-h-screen">
        <header className="h-16 border-b border-gray-50 bg-white px-4 md:px-8 flex items-center justify-between md:hidden">
          <span className="text-xl font-bold text-primary">QwikOrder</span>
          <div className="w-8 h-8 rounded-full bg-gray-100"></div>
        </header>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-16 px-2 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-lg ${
              isActive(item.path) ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
        {/* Mobile Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex flex-col items-center space-y-1 px-3 py-1 text-gray-400"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-medium">Exit</span>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-dark/20 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white w-full max-w-sm p-8 md:p-10 rounded-[40px] shadow-2xl animate-in zoom-in duration-200">
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-6 right-6 p-2 text-gray-300 hover:text-dark transition-colors"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <LogOut size={28} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">Sign Out?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to end your current session? You'll need to log back in to manage your orders.
              </p>
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100 hover:bg-red-600 transition-all"
                >
                  Confirm Sign Out
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 text-gray-400 font-bold hover:text-dark transition-all"
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

export default Layout;
