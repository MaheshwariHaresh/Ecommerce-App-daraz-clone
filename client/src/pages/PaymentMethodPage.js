import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "../components/Utils/AxiosConfig";
import "../styles/AuthStyles.css";
import { toast } from "react-toastify";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const getOrderDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/${orderId}`
      );
      setOrder(data.order);
    } catch (error) {
      toast.error("Unable to load order");
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const handleCOD = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/order/confirm-order/${orderId}`
      );
      localStorage.removeItem("checkoutProduct");
      toast.success("Order Placed Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Order Failed");
    }
  };

  return (
    <Layout>
      <div className="account-page">
        <main
          className="account-content"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <div className="account-card" style={{ fontSize: "14px" }}>
            {/* HEADER */}
            <div className="card-header">
              <h6>Review Your Order</h6>
            </div>

            <div className="card-body">
              {!order ? (
                <h6>Loading...</h6>
              ) : (
                <>
                  <h6 style={{ marginBottom: "10px", fontWeight: "600" }}>
                    Order Items
                  </h6>
                  <hr />

                  {order?.products?.map((p) => (
                    <div
                      key={p._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <img
                        src={p.product?.image}
                        alt="product"
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginRight: "15px",
                          border: "1px solid #ddd",
                        }}
                      />

                      <div style={{ lineHeight: "1.4" }}>
                        <p style={{ margin: 0 }}>
                          <strong>Product:</strong> {p.product?.name}
                        </p>
                        <p style={{ margin: "3px 0" }}>
                          <strong>Quantity:</strong> {p.quantity}
                        </p>
                        <p style={{ margin: 0 }}>
                          <strong>Price:</strong> Rs{" "}
                          {Number(p.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Total Amount:{" "}
                    <span style={{ color: "#d32f2f" }}>
                      Rs {Number(order.amount).toLocaleString("en-IN")}
                    </span>
                  </p>

                  {/* DIVIDER */}
                  <hr style={{ margin: "20px 0" }} />

                  <h6 style={{ marginBottom: "10px", fontWeight: "600" }}>
                    Shipping Information
                  </h6>

                  <p>
                    <strong>Receiver Name:</strong> {order.name}
                  </p>

                  <p>
                    <strong>Phone Number:</strong> {order.phone}
                  </p>

                  <p>
                    <strong>Full Address:</strong> {order.address?.area},{" "}
                    {order.address?.city}, {order.address?.province}
                  </p>

                  {/* DIVIDER */}
                  <hr style={{ margin: "20px 0" }} />

                  {/* ------------------------------------------------------ */}
                  {/* PAYMENT METHOD */}
                  {/* ------------------------------------------------------ */}
                  <h6 style={{ fontWeight: 600 }}>Payment Method</h6>
                  <p className="text-muted" style={{ fontSize: "13px" }}>
                    Cash on Delivery (COD)
                  </p>

                  <button
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "15px",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                    onClick={handleCOD}
                  >
                    Place Order (Pay with Cash)
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
