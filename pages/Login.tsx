
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.ts';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <Link to="/" className="text-3xl font-bold text-primary mb-12">QwikOrder</Link>

      <div className="w-full max-w-md bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Login to manage your live sales.</p>

        <form className="space-y-5" onSubmit={handleLogin}>
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
            <label className="block text-sm font-bold mb-2">Password</label>
            <input name="password" type="password" placeholder="••••••••" className="w-full p-5 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" required />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
