
import React, { useState, useEffect } from 'react';
import { Search, Download, ChevronRight, User } from 'lucide-react';
import { supabase } from '../supabase.ts';
import { useNavigate } from 'react-router-dom';

const Customers: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setCustomers(data);
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your customers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Customers ({customers.length})</h1>
          <p className="text-gray-500">View and manage your loyal buyers.</p>
        </div>
        <button className="bg-white text-dark px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by phone or name..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
        />
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Customer</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Phone</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Address</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-gray-400">
                    <User size={48} className="mx-auto mb-4 opacity-20" />
                    No customers yet.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-dark">{c.name}</div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500 font-medium">{c.phone}</td>
                    <td className="px-8 py-6 text-xs text-gray-400">{c.address_text || 'No address provided'}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-gray-300 group-hover:text-primary transition-colors">
                        <ChevronRight size={20} />
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

export default Customers;
