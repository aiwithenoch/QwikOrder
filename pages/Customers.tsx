
import React from 'react';
import { Search, Download, ChevronRight } from 'lucide-react';
import { Customer } from '../types.ts';

const mockCustomers: Customer[] = [
  { id: '1', name: 'Kofi Mensah', phone: '024 123 4567', address: 'Adenta, Accra', orderCount: 5, totalSpent: 1250 },
  { id: '2', name: 'Abena Owusu', phone: '055 987 6543', address: 'East Legon, Accra', orderCount: 3, totalSpent: 540 },
  { id: '3', name: 'Ama Serwaa', phone: '020 555 1122', address: 'Spintex, Accra', orderCount: 12, totalSpent: 3100 },
];

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Customers</h1>
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
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Orders</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-gray-400 tracking-widest">Total Spent</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCustomers.map((c) => (
                <tr key={c.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="font-bold text-dark">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.address}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-medium">{c.phone}</td>
                  <td className="px-8 py-6">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-dark">{c.orderCount} orders</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-primary">GHS {c.totalSpent}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-300 group-hover:text-primary transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
