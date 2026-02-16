
import React from 'react';
import { Settings, CreditCard, Bell, Shield, Map } from 'lucide-react';

const AdminSettings: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-dark">System Settings</h1>
                <p className="text-gray-500">Configure global platform parameters and API integrations.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Shield className="text-primary" size={24} />
                        <h3 className="text-lg font-bold">General Config</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Platform Fee (%)</label>
                            <input type="number" defaultValue="2.5" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Free Monthly SMS</label>
                            <input type="number" defaultValue="200" className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Bell className="text-primary" size={24} />
                        <h3 className="text-lg font-bold">SMS Gateways (Ghana)</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div>
                                <p className="font-bold text-sm">Hubtel</p>
                                <p className="text-xs text-gray-400">Status: Active</p>
                            </div>
                            <button className="text-xs font-bold text-primary">Configure</button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div>
                                <p className="font-bold text-sm text-gray-400">Arkesel</p>
                                <p className="text-xs text-gray-400">Status: Disabled</p>
                            </div>
                            <button className="text-xs font-bold text-primary">Enable</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Map className="text-primary" size={24} />
                        <h3 className="text-lg font-bold">Maps Integration</h3>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500 leading-relaxed italic">Currently using HERE Maps for address autocomplete and geocoding.</p>
                        <button className="w-full py-4 bg-gray-50 text-dark font-bold rounded-2xl hover:bg-gray-100 transition-colors">Test HERE API Key</button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <CreditCard className="text-primary" size={24} />
                        <h3 className="text-lg font-bold">Payment Methods</h3>
                    </div>
                    <div className="space-y-4 text-sm text-gray-500">
                        <p>Platform default is manual SeevCash/MoMo verification.</p>
                        <p className="text-xs">Paystack integration planned for v2.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold shadow-lg shadow-green-100 hover:scale-[1.02] transition-all">
                    Save Platform Settings
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;
