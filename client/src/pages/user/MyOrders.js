import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "../../components/Utils/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../styles/MyOrders.css";
import AccountSidebar from "./AccountSidebar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/my-orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout title={"my-orders"}>
      <div className="account-page">
        {/* Sidebar */}
        <AccountSidebar name={auth?.user?.name} />

        {/* Main Content */}
        <main className="account-content">
          <div className="my-orders-container">
            <h4>My Orders</h4>

            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-left">
                  <img src={order.products[0].product.image} alt="product" />
                  <div>
                    <p className="order-id">Order ID: #{order._id.slice(-6)}</p>
                    <p className="order-status">{order.status}</p>
                  </div>
                </div>

                <div className="order-right">
                  <p className="order-price">Rs {order.amount}</p>
                  <button
                    onClick={() => navigate(`/order-details/${order._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default MyOrders;
