
import React from 'react';
import { Zap, MessageSquare, Check } from 'lucide-react';
import { SMSBundle } from '../types.ts';

const bundles: SMSBundle[] = [
  { count: 200, price: 10 },
  { count: 400, price: 20 },
  { count: 1000, price: 50 },
  { count: 2000, price: 100 },
  { count: 4000, price: 200 },
  { count: 10000, price: 500 },
];

const Billing: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-dark">Billing</h1>
        <p className="text-gray-500">Manage your subscription and SMS credits.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2">Current Plan</p>
              <h2 className="text-3xl font-bold text-dark">Pro Seller</h2>
            </div>
            <div className="bg-green-50 text-primary px-4 py-1.5 rounded-full text-xs font-bold">Active</div>
          </div>
          <div className="text-4xl font-bold mb-8">49 GHS <span className="text-base text-gray-400 font-normal">/ month</span></div>
          
          <ul className="space-y-4 mb-10">
            {['Includes 200 SMS/mo', 'Unlimited Products', 'Priority Verification'].map((feat, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="bg-primary/10 p-1 rounded-lg text-primary"><Check size={14}/></div>
                <span className="text-gray-600 font-medium">{feat}</span>
              </li>
            ))}
          </ul>

          <button className="w-full py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:border-primary hover:text-primary transition-all">Manage Subscription</button>
        </div>

        {/* SMS Balance */}
        <div className="bg-primary text-white p-10 rounded-[40px] shadow-xl shadow-green-100 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-8">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">SMS Credits</h2>
            <p className="text-white/70 mb-8 leading-relaxed">Notifications are sent for order placement and payment confirmations.</p>
          </div>
          <div className="flex items-end justify-between">
             <div>
               <p className="text-white/50 font-bold uppercase text-[10px] tracking-widest mb-1">Balance</p>
               <span className="text-5xl font-bold">0</span>
             </div>
             <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <Zap size={24} fill="white" />
             </div>
          </div>
        </div>
      </div>

      {/* SMS Bundles */}
      <div>
        <h3 className="text-xl font-bold mb-6">Top up SMS Balance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bundles.map((bundle, i) => (
            <button key={i} className="group bg-white p-6 rounded-[32px] border border-gray-100 hover:border-primary hover:scale-[1.02] transition-all text-center">
              <p className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{bundle.count} SMS</p>
              <p className="text-gray-400 text-sm mt-1">GHS {bundle.price}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-primary font-bold uppercase">Buy Now</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;
