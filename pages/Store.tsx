
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Minus, Plus, Upload, ShieldCheck, MapPin } from 'lucide-react';
import { Product } from '../types.ts';

const mockProducts: Product[] = [
  { id: '1', name: 'Silk Floral Summer Dress', price: 250, stock: 12, safetyBuffer: 2, image: 'https://picsum.photos/400/500?random=1' },
  { id: '2', name: 'Vintage Leather Handbag', price: 180, stock: 5, safetyBuffer: 1, image: 'https://picsum.photos/400/500?random=2' },
  { id: '3', name: 'Minimalist Gold Hoops', price: 85, stock: 45, safetyBuffer: 5, image: 'https://picsum.photos/400/500?random=3' },
];

const Store: React.FC = () => {
  const { sellerSlug } = useParams();
  const [cart, setCart] = useState<Record<string, number>>({});
  const [step, setStep] = useState<'browse' | 'form' | 'payment' | 'done'>('browse');

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartCount = Object.values(cart).reduce<number>((a, b) => a + (b as number), 0);
  
  const totalAmount = Object.entries(cart).reduce<number>((sum, [id, qty]) => {
    const p = mockProducts.find(p => p.id === id);
    const quantity = qty as number;
    return sum + (p ? p.price * quantity : 0);
  }, 0);

  const formatSlug = (slug: string = '') => slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  if (step === 'done') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-primary rounded-[32px] flex items-center justify-center mb-8 shadow-inner">
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Received!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The seller has been notified. They will verify your payment and start the shipping process shortly.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100"
        >
          Keep Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative flex flex-col">
      {/* Store Header */}
      <header className="p-6 bg-white border-b border-gray-50 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-bold text-dark">{formatSlug(sellerSlug)}</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Storefront</p>
        </div>
        <div className="relative">
          <ShoppingBag className="text-primary" size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-dark text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {step === 'browse' ? (
          <div className="p-4 space-y-4">
            {mockProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-[32px] p-4 border border-gray-100 flex items-center space-x-4">
                <img src={p.image} className="w-24 h-24 rounded-2xl object-cover" alt={p.name} />
                <div className="flex-1">
                  <h3 className="font-bold text-dark text-sm mb-1">{p.name}</h3>
                  <p className="text-primary font-bold">GHS {p.price}</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(p.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-4 text-center">{cart[p.id] || 0}</span>
                    <button 
                      onClick={() => updateQuantity(p.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : step === 'form' ? (
          <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-2">Delivery Details</h2>
              <p className="text-gray-400 text-sm">Where should we send your items?</p>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Your Full Name" className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="tel" placeholder="Phone Number (WhatsApp preferred)" className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" />
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Full Address / Area" className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <input type="text" placeholder="Landmark (e.g. Near Shell fuel station)" className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" />
            </form>
          </div>
        ) : (
          <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
              <p className="text-gray-400 text-sm">Transfer the total via SeevCash to confirm.</p>
            </div>
            
            <div className="bg-white p-6 rounded-[32px] border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">Total Payable</span>
                <span className="text-2xl font-bold text-primary">GHS {totalAmount}</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SeevCash Details</p>
                <p className="font-bold text-dark text-lg">055 123 4567</p>
                <p className="text-sm text-gray-500">Account: {formatSlug(sellerSlug)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold mb-3 block">Upload Payment Screenshot</span>
                <div className="border-2 border-dashed border-gray-200 bg-white rounded-[32px] p-10 text-center flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="text-gray-400 mb-3" size={32} />
                  <p className="text-sm font-medium text-gray-400">Tap to browse gallery</p>
                </div>
                <input type="file" className="hidden" />
              </label>
              
              <input type="text" placeholder="Enter Transaction Ref ID (Optional)" className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Action */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 md:max-w-md md:mx-auto">
          {step === 'browse' ? (
            <button 
              onClick={() => setStep('form')}
              className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100 flex items-center justify-between px-8 group"
            >
              <div className="text-left">
                <p className="text-[10px] opacity-70 uppercase font-bold tracking-widest">Checkout</p>
                <p>GHS {totalAmount}</p>
              </div>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          ) : step === 'form' ? (
            <button 
              onClick={() => setStep('payment')}
              className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100"
            >
              Continue to Payment
            </button>
          ) : (
            <button 
              onClick={() => setStep('done')}
              className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-lg shadow-green-100"
            >
              Confirm & Submit Order
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
