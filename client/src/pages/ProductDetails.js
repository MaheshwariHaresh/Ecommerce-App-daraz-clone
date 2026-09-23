import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "../components/Utils/AxiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Rating } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import RefreshSharpIcon from "@mui/icons-material/RefreshSharp";
import NotificationsOffSharpIcon from "@mui/icons-material/NotificationsOffSharp";
import "../styles/ProductDetails.css";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setCart } = useCart();
  const [auth] = useAuth();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/${params.id}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // BUY NOW
  const handleBuyNow = (product) => {
    const item = {
      product,
      quantity,
      color: product.colors[colorIndex] || "",
      size: product.sizes[sizeIndex] || "",
    };

    localStorage.setItem("checkoutProduct", JSON.stringify(item));
    navigate("/checkout");
  };
  // add to Cart
  const addToCart = async (p) => {
    try {
      if (!auth?.token) {
        navigate("/login");
        return;
      }
      // Make API call to add/update cart in the database
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/cart/add-to-cart`,
        {
          productId: p._id,
          quantity,
        }
      );
      if (data?.success) {
        setCart(data.cart.products); //update the local state with the new cart data
        toast.success("Item Added to Cart Successfully");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while adding item to cart");
    }
  };

  return (
    <Layout>
      <div className="product-page-container">
        {/* LEFT: Product Images */}
        <div className="product-images">
          {product?._id && (
            <>
              <img
                src={product.image}
                alt={product.name}
                className="main-image"
              />
              <div className="thumbnail-row">
                <img
                  src={product.image}
                  alt="thumb"
                  className="thumbnail active-thumb"
                />
                <img src={product.image} alt="thumb" className="thumbnail" />
              </div>
            </>
          )}
        </div>

        {/* CENTER: Product Info */}
        <div className="product-info">
          <h4 className="product-title">{product.description}</h4>
          <div className="rating">
            <Rating
              value={product.rating || 4}
              readOnly
              precision={0.5}
              style={{ fontSize: "1rem" }}
            />
            <Link to={"#"}>Ratings {product.totalRatings}</Link>
          </div>

          <div className="price-row">
            <p className="product-price">
              Rs. {Number(product.price || 0).toLocaleString("en-IN")}
            </p>
            <div>
              <p className="old-price">Rs. {product.oldPrice || "108"}</p>
              <p className="discount">-{product.discount}%</p>
            </div>
          </div>

          {product?.colors && (
            <div className="color-row">
              <div className="color-label">Color Family</div>
              {product?.colors?.map((color, index) => (
                <p
                  key={index}
                  className={`option ${colorIndex === index ? "selected" : ""}`}
                  onClick={() => setColorIndex(index)}
                >
                  {color}
                </p>
              ))}
            </div>
          )}

          {product?.sizes && (
            <div className="color-row">
              <div className="color-label">Size</div>
              {product?.sizes?.map((size, index) => (
                <p
                  key={index}
                  className={`option ${sizeIndex === index ? "selected" : ""}`}
                  onClick={() => setSizeIndex(index)}
                >
                  {size}
                </p>
              ))}
            </div>
          )}

          <div className="quantity-control">
            <span>Quantity:</span>
            <div className="quantity-box">
              <IndeterminateCheckBoxIcon
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                sx={{ cursor: quantity === 1 ? "not-allowed" : "pointer" }}
              />
              <input type="text" value={quantity} readOnly />
              <AddBoxIcon
                onClick={() => quantity < 2 && setQuantity(quantity + 1)}
                sx={{ cursor: quantity > 1 ? "not-allowed" : "pointer" }}
              />
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="buy-now-btn"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* RIGHT: Delivery Info */}
        <div className="delivery-info">
          <div className="info-section">
            <p className="section-title">
              Delivery Options <InfoOutlinedIcon fontSize="small" />
            </p>
            <p className="info-line">
              <LocationOnOutlinedIcon fontSize="small" /> Sindh, Karachi
            </p>
            <p className="info-line">
              <StarBorderPurple500Icon fontSize="small" /> Standard Delivery
            </p>
            <p className="info-line">
              <MonetizationOnIcon fontSize="small" /> Cash on Delivery Available
            </p>
          </div>
          <hr />
          <div className="info-section">
            <p className="section-title">
              Return & Warranty <InfoOutlinedIcon fontSize="small" />
            </p>
            <p className="info-line">
              <RefreshSharpIcon fontSize="small" /> 14 days easy return
            </p>
            <p className="info-line">
              <NotificationsOffSharpIcon fontSize="small" /> Warranty not
              available
            </p>
          </div>
          <div className="dowload-daraz-app-wrapper">
            <img src="/images/download-daraz-app.png" alt="daraz-logo" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
