
import React, { useState, useEffect } from 'react';
import {
    Users,
    ShoppingBag,
    MessageSquare,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { supabase } from '../../supabase.ts';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        vendors: 0,
        orders: 0,
        revenue: 0,
        sms: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        // Fetch vendors count
        const { count: vendorCount } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        // Fetch orders count and revenue
        const { data: ordersData } = await supabase
            .from('orders')
            .select('total_amount');

        const orderCount = ordersData?.length || 0;
        const totalRevenue = ordersData?.reduce((acc, curr) => acc + (curr.total_amount || 0), 0) || 0;

        setStats({
            vendors: vendorCount || 0,
            orders: orderCount,
            revenue: totalRevenue,
            sms: 0 // Placeholder for SMS until we have logs
        });
        setLoading(false);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading platform overview...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-dark">Platform Overview</h1>
                <p className="text-gray-500">Monitor your QwikOrder vendors and sales.</p>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Vendors', value: stats.vendors.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Platform Orders', value: stats.orders.toLocaleString(), icon: ShoppingBag, color: 'text-primary', bg: 'bg-green-50' },
                    { label: 'Admin Revenue', value: `GHS ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Total SMS Sent', value: '0', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-dark">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Notifications / Alerts */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                        <AlertCircle size={20} className="text-amber-500" />
                        <span>Recent Vendors</span>
                    </h3>
                    <div className="space-y-4">
                        <p className="text-center py-8 text-gray-400">All vendors are currently updated.</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Recent Platform Activity</h3>
                    <div className="space-y-6">
                        <p className="text-center py-8 text-gray-400">Monitoring real-time activity...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
