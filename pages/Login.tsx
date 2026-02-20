
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <Link to="/" className="text-3xl font-bold text-primary mb-12">QwikOrder</Link>
      
      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Login to manage your live sales.</p>
        
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div>
            <label className="block text-sm font-bold mb-2">Email or Phone</label>
            <input type="text" placeholder="name@email.com" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100 hover:opacity-90 transition-all">Login</button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
