
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle, Smartphone, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">QwikOrder</div>
        <div className="space-x-4">
          <Link to="/login" className="text-dark font-medium hover:text-primary transition-colors">Login</Link>
          <Link to="/signup" className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:opacity-90 transition-all">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
          <Zap size={14} />
          <span>Built for Ghanaian Social Sellers</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-dark leading-tight mb-6 max-w-4xl">
          Turn your Live viewers into <span className="text-primary">instant orders.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Sell fast. No endless DMs. Just drop your link, capture orders, and verify payments in one clean dashboard.
        </p>
        <Link to="/signup" className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-green-100 hover:scale-105 transition-all flex items-center space-x-2">
          <span>Get Started Now</span>
          <ArrowRight size={20} />
        </Link>
        <p className="mt-4 text-sm text-gray-400">Scale your social business today.</p>
      </section>

      {/* Steps */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Simple 3-step workflow</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Upload Products', desc: 'Add your items, set prices, and stock levels in seconds.', icon: Package },
              { title: 'Share Your Link', desc: 'Drop your store link in your bio or chat during your Live session.', icon: Smartphone },
              { title: 'Capture & Verify', desc: 'Receive orders instantly. Verify screenshots manually. Ship it!', icon: CheckCircle },
            ].map((step, i) => (
              <div key={i} className="text-center p-8 rounded-3xl border border-gray-50 bg-background/50 hover:bg-background transition-colors">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                   <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-lg mx-auto bg-white rounded-[40px] p-10 md:p-16 text-center border border-gray-100 shadow-xl shadow-gray-100">
          <h2 className="text-4xl font-bold mb-4">49 GHS <span className="text-xl text-gray-400 font-normal">/ month</span></h2>
          <p className="text-gray-500 mb-8">All you need to dominate your social sales.</p>
          <ul className="space-y-4 mb-10 text-left">
            {[
              'Unlimited Orders',
              'Unlimited Products',
              'Public Storefront Page',
              '200 Free SMS per month',
              'Payment Verification Tool'
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="text-dark font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <Link to="/signup" className="block w-full bg-primary text-white py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition-all">Get Started Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
        <div>© 2024 QwikOrder. Built for speed.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
      </footer>
    </div>
  );
};

// Help icons used in mapping
import { Package } from 'lucide-react';

export default Landing;
