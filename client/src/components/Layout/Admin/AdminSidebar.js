import React from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/admin/AdminSidebar.css";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const [auth, setAuth]= useAuth()


  const handleLogout = () => {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      localStorage.removeItem('checkoutProduct')
      // localStorage.removeItem('')
      toast.success("Logout Successfully");
    };
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">Daraz Admin</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" end>
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products">
            <i className="fa-solid fa-box"></i> Products
          </NavLink>
        </li>
         <li>
          <NavLink to="/admin/categories">
            <i className="fa-solid fa-box"></i> Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders">
            <i className="fa-solid fa-receipt"></i> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <i className="fa-solid fa-user"></i> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/login"
          onClick={handleLogout}>
            <i className="fa-solid fa-user"></i> Logout
          </NavLink>
        </li>
         
      </ul>
    </aside>
  );
};

export default AdminSidebar;
