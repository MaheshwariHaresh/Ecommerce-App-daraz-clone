import React from "react";
import AdminSidebar  from'./AdminSidebar'
import AdminTopbar from './AdminTopbar'
import '../../../styles/admin/AdminLayout.css'

const AdminLayout = ({ children, title="Ecommerce app - admin-panel", description="mern stack project", keywords="mern, react,node,mongodb", author="Maheshwari" }) => {
 return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
