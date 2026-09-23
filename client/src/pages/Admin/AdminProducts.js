import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin/AdminProducts.css"

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="products-header">
          <h2>Manage Products</h2>
          <button
            className="create-btn"
            onClick={() => navigate("/admin/products/create-product")}
          >
            + Create Product
          </button>
        </div>

        <div className="admin-product-cards">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/products/${product._id}`}
                className="admin-product-card"
              >
                <div className="admin-product-img-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="admin-product-content">
                  <h4>{product.name}</h4>
                  <p>{product.description?.substring(0, 60)}...</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-products">No products found</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
