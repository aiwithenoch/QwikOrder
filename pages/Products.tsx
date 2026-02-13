
import React, { useState } from 'react';
import { Plus, Search, Edit2, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { Product } from '../types.ts';

const mockProducts: Product[] = [
  { id: '1', name: 'Silk Floral Summer Dress', price: 250, stock: 12, safetyBuffer: 2, image: 'https://picsum.photos/400/500?random=1' },
  { id: '2', name: 'Vintage Leather Handbag', price: 180, stock: 5, safetyBuffer: 1, image: 'https://picsum.photos/400/500?random=2' },
  { id: '3', name: 'Minimalist Gold Hoops', price: 85, stock: 45, safetyBuffer: 5, image: 'https://picsum.photos/400/500?random=3' },
  { id: '4', name: 'Linen Wide-Leg Trousers', price: 150, stock: 0, safetyBuffer: 2, image: 'https://picsum.photos/400/500?random=4' },
];

const Products: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Products</h1>
          <p className="text-gray-500">Manage your inventory and safety buffers.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg shadow-green-100 hover:opacity-90 transition-all"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="flex bg-white border border-gray-100 rounded-2xl p-1">
          <button className="p-2 bg-gray-50 rounded-xl text-primary"><LayoutGrid size={20}/></button>
          <button className="p-2 text-gray-400"><List size={20}/></button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((p) => (
          <div key={p.id} className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {p.stock === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Out of Stock</span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 backdrop-blur rounded-xl text-dark shadow-sm hover:bg-white"><Edit2 size={16} /></button>
                <button className="p-2 bg-white/90 backdrop-blur rounded-xl text-dark shadow-sm hover:bg-white"><MoreVertical size={16} /></button>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-dark mb-1 truncate">{p.name}</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-primary font-bold text-lg">GHS {p.price}</p>
                  <p className="text-gray-400 text-xs mt-1">Stock: {p.stock} units</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Safety Buffer</span>
                  <span className="bg-gray-50 px-2 py-1 rounded-lg text-xs font-medium text-dark">{p.safetyBuffer} units</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-dark/20 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 relative animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-8">Add New Product</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label className="block text-sm font-bold mb-2">Product Name</label>
                <input type="text" placeholder="e.g. Summer Dress" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Price (GHS)</label>
                  <input type="number" placeholder="0.00" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Stock Level</label>
                  <input type="number" placeholder="0" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Safety Buffer</label>
                <p className="text-xs text-gray-400 mb-2">Keep this many items aside to avoid overselling.</p>
                <input type="number" defaultValue={2} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="border-2 border-dashed border-gray-100 rounded-[32px] p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-gray-500">Tap to upload product image</p>
                <input type="file" className="hidden" />
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 font-bold text-gray-400">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
