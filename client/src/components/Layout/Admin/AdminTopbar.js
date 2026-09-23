import React from "react";
import "../../../styles/admin/AdminTopbar.css";

const AdminTopbar = () => {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h3>Admin Panel</h3>
      </div>
      <div className="topbar-right">
        <input type="text" placeholder="Search..." className="topbar-search" />
        <div className="admin-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />
          <span className="admin-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
