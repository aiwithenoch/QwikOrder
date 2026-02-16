
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { supabase } from '../supabase.ts';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', stock: '', safetyBuffer: '2' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('products').insert({
      seller_id: user.id,
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      safety_buffer: parseInt(newProduct.safetyBuffer),
    });

    if (!error) {
      setShowModal(false);
      setNewProduct({ title: '', price: '', stock: '', safetyBuffer: '2' });
      fetchProducts();
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Products ({products.length})</h1>
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
          <button className="p-2 bg-gray-50 rounded-xl text-primary"><LayoutGrid size={20} /></button>
          <button className="p-2 text-gray-400"><List size={20} /></button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {products.map((p) => (
          <div key={p.id} className="group bg-white rounded-[24px] md:rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <img src={p.image_url || 'https://picsum.photos/400/500?random=' + p.id} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {p.stock === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[8px] md:text-xs font-bold uppercase tracking-widest">Out of Stock</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-dark shadow-sm hover:bg-white"><Edit2 size={14} /></button>
                <button className="p-1.5 bg-white/90 backdrop-blur rounded-lg text-dark shadow-sm hover:bg-white"><MoreVertical size={14} /></button>
              </div>
            </div>
            <div className="p-3 md:p-4">
              <h4 className="font-bold text-dark text-xs md:text-sm mb-1 truncate">{p.title}</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-primary font-bold text-sm md:text-base">GHS {p.price}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">Stock: {p.stock}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[8px] text-gray-400 font-bold uppercase block mb-0.5">Buffer</span>
                  <span className="bg-gray-50 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-dark">{p.safety_buffer}</span>
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
            <form className="space-y-6" onSubmit={handleAddProduct}>
              <div>
                <label className="block text-sm font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Summer Dress"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Price (GHS)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Stock Level</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="0"
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none" required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Safety Buffer</label>
                <input
                  type="number"
                  value={newProduct.safetyBuffer}
                  onChange={(e) => setNewProduct({ ...newProduct, safetyBuffer: e.target.value })}
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                />
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
