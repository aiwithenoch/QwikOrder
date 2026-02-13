
import React from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Download,
  AlertCircle,
  Play
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 1200 },
  { name: 'Thu', revenue: 800 },
  { name: 'Fri', revenue: 1600 },
  { name: 'Sat', revenue: 2100 },
  { name: 'Sun', revenue: 1800 },
];

const Dashboard: React.FC = () => {
  const smsBalance = 0; // Simulated empty balance for warning

  return (
    <div className="space-y-8">
      {/* Header / SMS Warning */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Welcome back, Sarah</h1>
          <p className="text-gray-500">Here's what's happening today.</p>
        </div>
        
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-lg shadow-green-100 hover:scale-[1.02] transition-all">
          <Play size={18} fill="currentColor" />
          <span>Start Live Session</span>
        </button>
      </div>

      {smsBalance === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-4">
          <AlertCircle className="text-amber-600 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-900">SMS Balance Empty</h4>
            <p className="text-amber-700 text-sm">Your SMS balance is empty. Buy more to continue sending automatic notifications to your customers.</p>
            <button className="mt-2 text-sm font-bold text-amber-900 underline">Buy SMS Bundle</button>
          </div>
        </div>
      )}

      {/* Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Orders this week', value: '42', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Revenue this week', value: 'GHS 2,450', icon: TrendingUp, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Pending Payments', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'SMS Remaining', value: smsBalance, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
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

      {/* Charts & Links */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-8">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0FA876" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0FA876" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0FA876" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary text-white p-8 rounded-[32px] shadow-lg shadow-green-100">
            <h3 className="text-lg font-bold mb-4">Your Live Link</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">Share this link in your social bios during live sessions to capture orders automatically.</p>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 mb-6 font-mono text-sm break-all">
              qwikorder.com/store/sarah-boutique
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-white text-primary py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all">
                <ExternalLink size={18} />
                <span>Copy Link</span>
              </button>
              <button className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center hover:bg-opacity-90 transition-all">
                <Download size={20} />
              </button>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
             <div className="w-40 h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl mx-auto flex items-center justify-center mb-4">
               <p className="text-gray-400 text-sm">QR Code<br/>Generator</p>
             </div>
             <button className="text-primary font-bold hover:underline">Download Shop QR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
