import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/admin/CreateProduct.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");
  const [colors, setColors] = useState("");
  const [tags, setTags] = useState("");
  const [sizes, setSizes] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/${params.id}`
      );
      const p = data.product;
      setName(p.name);
      setDescription(p.description);
      setPrice(p.price);
      setStock(p.stock);
      setBrand(p.brand || "");
      setDiscount(p.discount || "");
      setColors(Array.isArray(p.colors) ? p.colors.join(", ") : "");
      setTags(Array.isArray(p.tags) ? p.tags.join(", ") : "");
      setSizes(Array.isArray(p.sizes) ? p.sizes.join(", ") : "");
      setImage(p.image && p.image[0]);
      setCategory(data.product.category);
      setSubCategory(data.product.subCategory);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        stock,
        brand,
        discount,
        colors: colors.split(",").map((c) => c.trim()),
        tags: tags.split(",").map((t) => t.trim()),
        sizes: sizes.split(",").map((s) => s.trim()),
        image,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update/${params.id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${params.id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminLayout title="Dashboard - Update Product">
      <div className="create-product-container">
        <h2>Update Product</h2>
        <form className="create-product-form" onSubmit={handleUpdateProduct}>
          {/* Product Info Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                className="form-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
              />
            </div>
            <div className="form-group">
              <label>Price (PKR)</label>
              <input
                type="number"
                className="form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div className="form-group">
              <label>Discount (%)</label>
              <input
                type="number"
                className="form-input"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                value={category?.name || "—"}
                readOnly
                style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sub Category</label>
              <input
                type="text"
                className="form-input"
                value={subCategory?.name || "—"}
                readOnly
                style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                className="form-input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock"
              />
            </div>

            <div className="form-group">
              <label>Colors (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="e.g. Red, Blue, Black"
              />
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. summer, casual"
              />
            </div>

            <div className="form-group">
              <label>Sizes (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                placeholder="e.g. S, M, L, XL"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-input"
              />
              {image && (
                <div className="img-preview">
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt="product"
                    className="preview-img"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Product
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
