import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../styles/Profile.css";
import AccountSidebar from "./AccountSidebar";

const Dashboard = () => {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const { name, email } = auth?.user || {};
    setName(name);
    setEmail(email);
  }, [auth?.user]);

  return (
    <Layout title={"Manage My Account"}>
      <div className="account-page">
        {/* Sidebar */}
        <AccountSidebar name={name}/>

        {/* Main Content */}
        <main className="account-content">
         
            <div className="account-grid">
              {/* Personal Profile */}
              <div className="account-card">
                <div className="card-header">
                  <h6>Personal Profile</h6>
                  <span className="edit-link">Edit</span>
                </div>
                <div className="card-body">
                  <p>{name}</p>
                  <p>{email}</p>
                  <label className="checkbox-label">
                    <input type="checkbox" /> Receive marketing emails
                  </label>
                </div>
              </div>

              {/* Address Book */}
              <div className="account-card">
                <div className="card-header">
                  <h6>Address Book</h6>
                  <span className="add-link">Add</span>
                </div>
                <div className="card-body">
                  <p>Save your shipping address here.</p>
                  <hr />
                  <p>Save your billing address here.</p>
                </div>
              </div>
            </div>
          
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
