
import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, CheckCircle2, XCircle, Shield } from 'lucide-react';
import { supabase } from '../../supabase.ts';

const Vendors: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setVendors(data);
        setLoading(false);
    };

    const filteredVendors = vendors.filter(v =>
        v.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.phone?.includes(searchTerm)
    );

    if (loading) return <div className="p-8 text-center text-gray-500">Loading vendors...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark">Vendors</h1>
                    <p className="text-gray-500">Manage seller accounts and platform access.</p>
                </div>

                <div className="flex space-x-2">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search sellers..."
                            className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-dark">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                <th className="px-8 py-5">Vendor Name</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5">SMS Balance</th>
                                <th className="px-8 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredVendors.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-gray-400">No vendors found.</td>
                                </tr>
                            ) : (
                                filteredVendors.map((v) => (
                                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div>
                                                <p className="font-bold text-dark">{v.business_name}</p>
                                                <p className="text-xs text-gray-400">{v.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-primary">
                                                <CheckCircle2 size={12} />
                                                <span>Active</span>
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-dark">{v.sms_balance || 0}</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Real-time Balance</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <button className="text-gray-400 hover:text-dark">
                                                <MoreVertical size={20} />
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

export default Vendors;
