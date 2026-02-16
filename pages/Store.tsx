
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Minus, Plus, Upload, ShieldCheck, MapPin } from 'lucide-react';
import { supabase } from '../supabase.ts';

const Store: React.FC = () => {
  const { sellerSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [step, setStep] = useState<'browse' | 'form' | 'payment' | 'done'>('browse');
  const [customerData, setCustomerData] = useState({ name: '', phone: '', address: '', landmark: '' });

  useEffect(() => {
    fetchStoreData();
  }, [sellerSlug]);

  const fetchStoreData = async () => {
    if (!sellerSlug) return;

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', sellerSlug)
        .single();

      if (profileError || !profile) {
        console.error("Store not found:", profileError);
        setLoading(false);
        return;
      }

      setSeller(profile);
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', profile.id)
        .eq('is_visible', true)
        .gt('stock', 0);

      if (productsData) setProducts(productsData);
    } catch (err) {
      console.error("Error fetching store data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const product = products.find(p => p.id === id);
      const next = Math.max(0, current + delta);

      if (product && next > product.stock) return prev; // Stock limit

      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleSubmitOrder = async () => {
    if (!seller) return;

    // 1. Create/Get Customer
    const { data: customer, error: custError } = await supabase
      .from('customers')
      .upsert({
        seller_id: seller.id,
        name: customerData.name,
        phone: customerData.phone,
        address_text: customerData.address,
        landmark: customerData.landmark
      }, { onConflict: 'seller_id, phone' })
      .select()
      .single();

    if (custError) return;

    // 2. Create Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        seller_id: seller.id,
        customer_id: customer.id,
        total_amount: totalAmount,
        payment_status: 'pending',
        order_status: 'new'
      })
      .select()
      .single();

    if (orderError) return;

    // 3. Create Order Items
    const items = Object.entries(cart).map(([id, qty]) => {
      const p = products.find(p => p.id === id);
      return {
        order_id: order.id,
        product_id: id,
        price_each: p.price,
        quantity: qty
      };
    });

    await supabase.from('order_items').insert(items);
    setStep('done');
  };

  const cartCount = Object.values(cart).reduce<number>((a, b) => a + (Number(b)), 0);

  const totalAmount = Object.entries(cart).reduce<number>((sum, [id, qty]) => {
    const p = products.find(p => p.id === id);
    return sum + (p ? (Number(p.price) * (qty as number)) : 0);
  }, 0);

  const formatSlug = (slug: string = '') => slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  if (loading) return <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">Loading Store...</div>;

  if (step === 'done') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background p-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-primary rounded-[32px] flex items-center justify-center mb-8 shadow-inner">
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Received!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {seller?.business_name} has been notified. They will verify your payment and start the shipping process shortly.
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
          <h1 className="text-xl font-bold text-dark">{seller?.business_name || formatSlug(sellerSlug)}</h1>
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
            {products.length === 0 ? (
              <p className="text-center py-20 text-gray-400">No products available right now.</p>
            ) : (
              products.map((p) => (
                <div key={p.id} className="bg-white rounded-[32px] p-4 border border-gray-100 flex items-center space-x-4">
                  <img src={p.image_url || 'https://picsum.photos/400/500?random=' + p.id} className="w-24 h-24 rounded-2xl object-cover" alt={p.title} />
                  <div className="flex-1">
                    <h3 className="font-bold text-dark text-sm mb-1">{p.title}</h3>
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
              ))
            )}
          </div>
        ) : step === 'form' ? (
          <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-2">Delivery Details</h2>
              <p className="text-gray-400 text-sm">Where should we send your items?</p>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Full Name"
                value={customerData.name}
                onChange={e => setCustomerData({ ...customerData, name: e.target.value })}
                className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="tel"
                placeholder="Phone Number (WhatsApp preferred)"
                value={customerData.phone}
                onChange={e => setCustomerData({ ...customerData, phone: e.target.value })}
                className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Address / Area"
                  value={customerData.address}
                  onChange={e => setCustomerData({ ...customerData, address: e.target.value })}
                  className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <input
                type="text"
                placeholder="Landmark (e.g. Near Shell fuel station)"
                value={customerData.landmark}
                onChange={e => setCustomerData({ ...customerData, landmark: e.target.value })}
                className="w-full p-5 bg-white border border-gray-100 rounded-[24px] outline-none focus:ring-2 focus:ring-primary/20"
              />
            </form>
          </div>
        ) : (
          <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
              <p className="text-gray-400 text-sm">Transfer the total via MoMo to confirm.</p>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 font-medium">Total Payable</span>
                <span className="text-2xl font-bold text-primary">GHS {totalAmount}</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">MoMo Details</p>
                <p className="font-bold text-dark text-lg">{seller?.phone || '055 123 4567'}</p>
                <p className="text-sm text-gray-500">Account: {seller?.business_name}</p>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-400">Please pay before submitting. You'll be able to upload your screenshot after submission in the next update.</p>
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
              onClick={handleSubmitOrder}
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
