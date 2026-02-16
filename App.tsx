
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Products from './pages/Products.tsx';
import Orders from './pages/Orders.tsx';
import Customers from './pages/Customers.tsx';
import Billing from './pages/Billing.tsx';
import Store from './pages/Store.tsx';
import Layout from './components/Layout.tsx';
import AdminLayout from './components/AdminLayout.tsx';
import AdminDashboard from './pages/admin/Dashboard.tsx';
import Vendors from './pages/admin/Vendors.tsx';
import AdminOrders from './pages/admin/Orders.tsx';
import AdminSettings from './pages/admin/Settings.tsx';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Marketing */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer Facing Store */}
        <Route path="/store/:sellerSlug" element={<Store />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/customers" element={<Layout><Customers /></Layout>} />
        <Route path="/billing" element={<Layout><Billing /></Layout>} />

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/vendors" element={<AdminLayout><Vendors /></AdminLayout>} />
        <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
