
import React, { useState } from 'react';
import { Search, MapPin, Phone, ExternalLink, CheckCircle2, Truck, Image as ImageIcon } from 'lucide-react';
import { Order, OrderStatus } from '../types';

const mockOrders: Order[] = [
  {
    id: 'QO-9921',
    customerName: 'Kofi Mensah',
    phone: '024 123 4567',
    address: 'Block 2, Adenta Housing Down',
    landmark: 'Near the blue kiosk',
    items: [{ productId: '1', quantity: 1, name: 'Silk Summer Dress' }],
    totalAmount: 250,
    status: OrderStatus.NEW,
    createdAt: '10 mins ago'
  },
  {
    id: 'QO-9920',
    customerName: 'Abena Owusu',
    phone: '055 987 6543',
    address: 'East Legon, Lagos Ave',
    landmark: 'Opposite Shell station',
    items: [{ productId: '2', quantity: 1, name: 'Leather Handbag' }],
    totalAmount: 180,
    status: OrderStatus.AWAITING_PAYMENT,
    createdAt: '2 hours ago'
  },
  {
    id: 'QO-9919',
    customerName: 'Ama Serwaa',
    phone: '020 555 1122',
    address: 'Spintex Road, Baatsona',
    landmark: 'Close to Total filling station',
    items: [{ productId: '3', quantity: 2, name: 'Minimalist Hoops' }],
    totalAmount: 170,
    status: OrderStatus.PAID,
    paymentRef: 'SEEV-7781-AX',
    createdAt: '5 hours ago'
  },
];

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');

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
        {['All', OrderStatus.NEW, OrderStatus.AWAITING_PAYMENT, OrderStatus.PAID, OrderStatus.DELIVERED].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap rounded-xl transition-all ${
              activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:text-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary font-bold text-lg">
                  {order.customerName[0]}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-dark">{order.customerName}</h3>
                    <span className="text-xs text-gray-400 font-medium">#{order.id}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-sm text-gray-500">
                    <span className="flex items-center space-x-1"><Phone size={14}/> <span>{order.phone}</span></span>
                    <span className="flex items-center space-x-1"><MapPin size={14}/> <span className="truncate max-w-[200px]">{order.address}</span></span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-xs">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Order Summary</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm mb-1">
                    <span className="text-dark font-medium">{item.quantity}x {item.name}</span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between font-bold text-primary">
                  <span>Total</span>
                  <span>GHS {order.totalAmount}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  order.status === OrderStatus.PAID ? 'bg-green-100 text-green-700' :
                  order.status === OrderStatus.AWAITING_PAYMENT ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </div>
                
                <div className="flex space-x-2">
                  {order.status === OrderStatus.AWAITING_PAYMENT && (
                    <button className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-dark text-sm font-bold border border-gray-100 hover:bg-white transition-all">
                      <ImageIcon size={16} />
                      <span>View Screenshot</span>
                    </button>
                  )}
                  {order.status === OrderStatus.PAID ? (
                     <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-green-50">
                       <Truck size={16} />
                       <span>Mark Delivered</span>
                     </button>
                  ) : (
                    <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-green-50">
                      <CheckCircle2 size={16} />
                      <span>Mark as Paid</span>
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-medium">{order.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
