
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <Link to="/" className="text-3xl font-bold text-primary mb-12">QwikOrder</Link>
      
      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Start Selling</h1>
        <p className="text-gray-500 mb-8">Join the fastest social sellers in Ghana.</p>
        
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div>
            <label className="block text-sm font-bold mb-2">Shop Name</label>
            <input type="text" placeholder="e.g. Sarah's Boutique" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">WhatsApp Number</label>
            <input type="tel" placeholder="055 ••• ••••" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input type="password" placeholder="Minimum 8 characters" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100 hover:opacity-90 transition-all">Create Account</button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already selling? <Link to="/login" className="text-primary font-bold">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
