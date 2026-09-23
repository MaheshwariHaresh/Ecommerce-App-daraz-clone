import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Profile.css";

const AccountSidebar = ({ name }) => {
  return (
    <aside className="account-sidebar">
      <p className="hello-text">Hello, {name}</p>

      <div className="sidebar-section">
        <h6 className="sidebar-title">
          <NavLink to="/user/dashboard">Manage My Account</NavLink>
        </h6>
        <ul>
          <li>
            <NavLink to="/user/profile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/user/address">Address Book</NavLink>
          </li>
          <li>
            <NavLink to="/user/payment">My Payment Options</NavLink>
          </li>
          <li>
            <NavLink to="/user/wallet">Daraz Wallet</NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">
          <NavLink to="/user/orders">My Orders</NavLink>
        </h6>
        <ul>
          <li>
            <NavLink to="/user/returns">My Returns</NavLink>
          </li>
          <li>
            <NavLink to="/user/cancellations">My Cancellations</NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">
          <NavLink to="/user/reviews">My Reviews</NavLink>
        </h6>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">
          <NavLink to="/user/wishlist">My Wishlist & Followed Stores</NavLink>
        </h6>
      </div>

      <div className="sidebar-section">
        <h6 className="sidebar-title">
          <NavLink to="/user/sell">Sell On Daraz</NavLink>
        </h6>
      </div>
    </aside>
  );
};

export default AccountSidebar;
