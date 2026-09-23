import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/CartPage.css";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState({
    province: "",
    city: "",
    area: "",
  });
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const handleAddressChange = (field, value) => {
    setAddress({
      ...address,
      [field]: value,
    });
  };

  // ✅ Fetch cart
  const getCartItems = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/cart/get-cart-items`
      );

      // filter out invalid items safely
      const validItems =
        data?.cart?.products?.filter((item) => item?.product) || [];
      setCart(validItems);
    } catch (error) {
      toast.error("Error While Fetching Cart Items");
    }
  };

  // reading checoutPrdouct from loacalstorage
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("checkoutProduct"));
    if (local) {
      setCart([local]);
    } else {
      getCartItems();
    }
  }, []);

  // ✅ Total price (only selected)
  const totalPrice = () =>
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  //  Handle Proceed to Pay
  const handleProceedToPay = async () => {
    console.log("btn clicked");
    try {
      const payload = {
        buyer: auth?.user?._id,
        products: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          color: item.color,
          size: item.size,
        })),
        amount: totalPrice() + 100,
        name,
        phone,
        address,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/create-order`,
        payload
      );
      if (data?.success) {
        toast.success("Order Created Successfully");
        navigate(`/payment-method/${data.order._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("order failed");
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        {/* LEFT SIDE */}
        <div className="cart-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAddressSaved(true);
              toast.success("Data Saved");
            }}
          >
            <h4 className="title">Delivery Information</h4>
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group half">
                <label htmlFor="name" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Province</label>
                <select
                  value={address.province}
                  onChange={(e) =>
                    handleAddressChange("province", e.target.value)
                  }
                  className="form-select"
                >
                  <option value="">Select Province</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="KPK">KPK</option>
                  <option value="Bolochistan">Bolochistan</option>
                </select>
              </div>

              <div className="form-group half">
                <label className="form-label">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="Your City"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  value={address.area}
                  onChange={(e) => handleAddressChange("area", e.target.value)}
                  placeholder="eg, house no 04 main shahi bazar hyderabad"
                  className="form-input"
                />
              </div>
            </div>

            <button
              style={{ backgroundColor: "#f57224", color: "#fff" }}
              type="submit"
              className="form-control"
            >
              SAVE
            </button>
          </form>

          {/* DISPLAY PRODUCT CARDS */}
          <div>
            {cart
              .filter((item) => item?.product)
              .map((item) => (
                <div key={item._id} className="cart-seller-section">
                  <div className="cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-info">
                      <h6>{item.product.name}</h6>
                      <p className="cart-item-desc">
                        {item.product.description?.substring(0, 200)}...
                      </p>
                    </div>

                    <div className="cart-item-price">
                      <p className="new-price">
                        Rs.{" "}
                        {Number(item?.product?.price).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="cart-item-actions">
                      <span
                        className="delete"
                        onClick={() =>
                          axios
                            .delete(
                              `${process.env.REACT_APP_API}/api/v1/cart/delete-cart-item/${item.product._id}`
                            )
                            .then(() => {
                              toast.success("Item removed");
                              getCartItems();
                            })
                        }
                      >
                        <DeleteOutlined />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-right">
          <div className="order-summary">
            <h5>Order Summary</h5>

            <div className="summary-row">
              <span>Items Total {cart?.length} items</span>
              <span>Rs. {Number(totalPrice()).toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>Rs. 100</span>
            </div>

            <div className="voucher-section">
              <input type="text" placeholder="Enter Voucher Code" />
              <button>APPLY</button>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>
                Rs. {Number(totalPrice() + 100).toLocaleString("en-IN")}
              </span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleProceedToPay}
              disabled={!isAddressSaved}
              style={{
                cursor: isAddressSaved ? "" : "not-allowed",
                backgroundColor: isAddressSaved ? "" : "#ccc",
              }}
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
