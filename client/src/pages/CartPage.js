import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import "../styles/CartPage.css";
import EmptyCart from "./EmptyCartPage";
import { DeleteOutlined } from "@ant-design/icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useCart } from "../context/Cart";

const CartPage = () => {
  const { cart, setCart, loadCartItems } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [shippingFees, setShippingFees] = useState(0);
  const [totalSelectedQty, setTotalSelectedQty] = useState(0);

  const navigate = useNavigate();

  // ✅ Fetch cart

  useEffect(() => {
    loadCartItems();
  }, []);

  // ✅ Select All toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      const allIds = cart.map((item) => item.product._id);
      setSelectedItems(allIds);
      setSelectAll(true);
    }
  };

  // ✅ Toggle single item
  const handleItemSelect = (pid) => {
    if (selectedItems.includes(pid)) {
      setSelectedItems(selectedItems.filter((id) => id !== pid));
      setSelectAll(false);
    } else {
      const updated = [...selectedItems, pid];
      setSelectedItems(updated);
      if (updated.length === cart.length) setSelectAll(true);
    }
  };

  // ✅ Remove selected items
  const removeSelectedItems = async () => {
    if (selectedItems.length === 0) {
      toast.info("No items selected");
      return;
    }

    try {
      await Promise.all(
        selectedItems.map((pid) =>
          axios.delete(
            `${process.env.REACT_APP_API}/api/v1/cart/delete-cart-item/${pid}`
          )
        )
      );
      toast.success("Selected items deleted");
      setSelectedItems([]);
      setSelectAll(false);
      loadCartItems();
    } catch (error) {
      toast.error("Error while deleting selected items");
    }
  };

  // ✅ Handle quantity change
  const updateQuantity = async (pid, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item.product._id === pid ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);

    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/cart/update-cart-item`,
        {
          productId: pid,
          quantity: newQty,
        }
      );
    } catch {
      console.log("Local only update");
    }
  };

  // ✅ Total price (only selected)
  const totalPrice = () =>
    cart
      .filter((item) => selectedItems.includes(item.product._id))
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // set shipping fees
  useEffect(() => {
    const qty = cart
      .filter((item) => selectedItems.includes(item.product._id))
      .reduce((sum, item) => sum + item.quantity, 0);

    setTotalSelectedQty(qty);
    setShippingFees(qty * 100);
  }, [selectedItems, cart]);

  // Handle Proceed To Checkout
  const handleProceedToCheckout = () => {
    localStorage.removeItem("checkoutProduct");
    navigate("/checkout");
  };
  return (
    <Layout>
      {cart?.length > 0 ? (
        <div className="cart-container">
          {/* LEFT SIDE */}
          <div className="cart-left">
            <div className="cart-header">
              <label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                SELECT ALL ({cart.length} ITEM{cart.length > 1 ? "S" : ""})
              </label>
              <button className="delete-btn" onClick={removeSelectedItems}>
                <DeleteOutlined />
                Delete
              </button>
            </div>

            {cart
              .filter((item) => item?.product)
              .map((item) => (
                <div key={item._id} className="cart-seller-section">
                  <div className="cart-item">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.product._id)}
                      onChange={() => handleItemSelect(item.product._id)}
                    />
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item-img"
                    />

                    <div className="cart-item-info">
                      <h6>{item.product.name}</h6>
                      <p className="cart-item-desc">
                        {item.product.description?.substring(0, 150)}...
                      </p>
                    </div>

                    <div className="cart-item-price">
                      <p className="new-price">
                        Rs.{" "}
                        {Number(item?.product?.price).toLocaleString("en-IN")}
                      </p>
                      <div className="cart-item-actions">
                        <span className="wishlist">
                          <FavoriteBorderOutlinedIcon />
                        </span>
                        <span
                          className="delete"
                          onClick={() =>
                            axios
                              .delete(
                                `${process.env.REACT_APP_API}/api/v1/cart/delete-cart-item/${item.product._id}`
                              )
                              .then(() => {
                                toast.success("Item removed");
                                loadCartItems();
                              })
                          }
                        >
                          <DeleteOutlined />
                        </span>
                      </div>
                    </div>

                    {/* ✅ Quantity controls */}
                    <div className="cart-item-qty">
                      <button
                        onClick={() =>
                          updateQuantity(item?.product?._id, item.quantity - 1)
                        }
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item?.product?._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-right">
            <div className="order-summary">
              <h5>Order Summary</h5>

              <div className="summary-row">
                <span>Subtotal ({totalSelectedQty} items)</span>
                <span>Rs. {Number(totalPrice()).toLocaleString("en-IN")}</span>
              </div>

              <div className="summary-row">
                <span>Shipping Fee</span>
                <span>Rs. {Number(shippingFees).toLocaleString("en-IN")}</span>
              </div>

              <div className="voucher-section">
                <input type="text" placeholder="Enter Voucher Code" />
                <button>APPLY</button>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>
                  Rs.{" "}
                  {Number(totalPrice() + shippingFees).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={handleProceedToCheckout}
                disabled={selectedItems.length === 0}
                style={{
                  cursor: selectedItems.length === 0 ? "not-allowed" : "",
                  backgroundColor: selectedItems.length === 0 ? "#ccc" : "",
                }}
              >
                PROCEED TO CHECKOUT ({selectedItems.length})
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart
          messageText={"There are no items in this cart"}
          btnText={"Continue Shopping"}
        />
      )}
    </Layout>
  );
};

export default CartPage;
