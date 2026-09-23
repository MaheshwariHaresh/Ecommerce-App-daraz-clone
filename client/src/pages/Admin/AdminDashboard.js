import React from "react";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
const AdminDashboard = () => {
  const [auth] = useAuth();
return (
    <AdminLayout>
      <div className="dashboard-header">
        <h2>Welcome, {auth?.user?.name}</h2>
        <p>Here’s your admin overview.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Products</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Orders</h3>
          <p>45</p>
        </div>
        <div className="card">
          <h3>Users</h3>
          <p>89</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
