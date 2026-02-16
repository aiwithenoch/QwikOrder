
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.ts';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const shopName = formData.get('shopName') as string;
    const phone = formData.get('phone') as string;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: shopName,
          phone: phone,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <Link to="/" className="text-3xl font-bold text-primary mb-12">QwikOrder</Link>

      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Start Selling</h1>
        <p className="text-gray-500 mb-8">Join the fastest social sellers in Ghana.</p>

        <form className="space-y-5" onSubmit={handleSignup}>
          {error && (
            <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <input name="email" type="email" placeholder="name@email.com" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Shop Name</label>
            <input name="shopName" type="text" placeholder="e.g. Sarah's Boutique" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">WhatsApp Number</label>
            <input name="phone" type="tel" placeholder="055 ••• ••••" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input name="password" type="password" placeholder="Minimum 8 characters" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already selling? <Link to="/login" className="text-primary font-bold">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
