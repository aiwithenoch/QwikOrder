
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Eye, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../../supabase.ts';

const AdminOrders: React.FC = () => {
    const [filter, setFilter] = useState('all');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                profiles (business_name),
                customers (name)
            `)
            .order('created_at', { ascending: false });

        if (data) setOrders(data);
        setLoading(false);
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.order_status.toLowerCase() === filter.toLowerCase());

    if (loading) return <div className="p-8 text-center text-gray-500">Loading platform orders...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark">Platform Orders</h1>
                    <p className="text-gray-500">Monitor all transactions across the QwikOrder network.</p>
                </div>

                <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                    {['all', 'new', 'confirmed', 'delivered'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-dark text-white shadow-sm' : 'text-gray-400 hover:text-dark'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Vendor</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">Time</th>
                                <th className="px-8 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center text-gray-400">No matching orders found.</td>
                                </tr>
                            ) : (
                                filteredOrders.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6 font-bold text-dark">{o.id.slice(0, 8)}</td>
                                        <td className="px-8 py-6 text-sm font-medium text-gray-600">{o.profiles?.business_name}</td>
                                        <td className="px-8 py-6 text-sm text-gray-500">{o.customers?.name}</td>
                                        <td className="px-8 py-6 font-bold text-primary">GHS {o.total_amount}</td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${o.order_status === 'new' ? 'bg-blue-50 text-blue-600' :
                                                o.order_status === 'confirmed' ? 'bg-green-50 text-primary' :
                                                    'bg-purple-50 text-purple-600'
                                                }`}>
                                                {o.order_status === 'new' ? <Clock size={12} /> : <CheckCircle size={12} />}
                                                <span>{o.order_status}</span>
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                                        <td className="px-8 py-6">
                                            <button className="p-2 text-gray-400 hover:text-dark hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
