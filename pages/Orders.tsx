
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, CheckCircle2, Truck, Image as ImageIcon, Clock } from 'lucide-react';
import { supabase } from '../supabase.ts';
import { useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (*),
        order_items (*, products (*))
      `)
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: newStatus })
      .eq('id', orderId);

    if (!error) fetchOrders();
  };

  const filteredOrders = activeTab === 'All'
    ? orders
    : orders.filter(o => o.order_status.toLowerCase() === activeTab.toLowerCase());

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Orders</h1>
          <p className="text-gray-500">Manage and verify incoming sales.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white p-1.5 border border-gray-100 rounded-2xl w-full overflow-x-auto">
        {['All', 'new', 'confirmed', 'shipped', 'delivered'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all ${activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-dark'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100">
            <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary font-bold text-lg">
                    {order.customers?.name?.[0] || '?'}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-bold text-dark">{order.customers?.name}</h3>
                      <span className="text-xs text-gray-400 font-medium">#{order.id.slice(0, 8)}</span>
                    </div>
                    <div className="flex flex-col space-y-1 text-sm text-gray-500">
                      <span className="flex items-center space-x-1"><Phone size={14} /> <span>{order.customers?.phone}</span></span>
                      <span className="flex items-center space-x-1"><MapPin size={14} /> <span className="truncate max-w-[200px]">{order.customers?.address_text}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-xs">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Order Items</p>
                  {order.order_items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm mb-1">
                      <span className="text-dark font-medium">{item.quantity}x {item.products?.title}</span>
                    </div>
                  ))}
                  <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between font-bold text-primary">
                    <span>Total</span>
                    <span>GHS {order.total_amount}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                    {order.order_status}
                  </div>

                  <div className="flex space-x-2">
                    {order.payment_screenshot_path && (
                      <button className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-dark text-sm font-bold border border-gray-100 hover:bg-white transition-all">
                        <ImageIcon size={16} />
                        <span>Screenshot</span>
                      </button>
                    )}
                    {order.order_status === 'new' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-green-50"
                      >
                        <CheckCircle2 size={16} />
                        <span>Confirm Order</span>
                      </button>
                    )}
                    {order.order_status === 'confirmed' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-green-50"
                      >
                        <Truck size={16} />
                        <span>Mark Delivered</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase font-medium">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

import { ShoppingBag } from 'lucide-react';
