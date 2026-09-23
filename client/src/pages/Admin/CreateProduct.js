import React, { useState } from "react";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import uploadImage from "../../components/Utils/UploadImage";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import "../../styles/AuthStyles.css";
import "../../styles/admin/CreateProduct.css";

const CreateProduct = () => {
  const { categories } = useCategory() || [];
  const [subCategories, setSubCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    subCategory: "",
    stock: 1,
    image: "",
    brand: "",
    discount: "",
    colors: "",
    tags: "",
    sizes: "",
  });

  // Handle input change
const handleChange = async (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (name === "category") {
    setFormData((prev) => ({ ...prev, subCategory: "" })); // reset subcategory

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/get-subcategories/${value}`
    );

    if (data?.success) {
      setSubCategories(data.subCategories);
      console.log("Fetched Subcategories:", data.subCategories); // correct logging
    }
  }
};


  // Handle product creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const imgUrl = await uploadImage(image);
      if (!imgUrl) {
        return toast.error("Url Not Provided");
      }
      const productData = {
        ...formData,
        colors: formData.colors?.split(",").map((v) => v.trim()),
        tags: formData.tags?.split(",").map((v) => v.trim()),
        image: [imgUrl],
        sizes:formData.sizes?.split(",").map((s)=>s.trim())
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        setLoading(false);
        toast.success("Product created successfully!");
        navigate("/admin/products");
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong while creating product");
    }
  };

  return (
    <AdminLayout>
      <div className="create-product-container">
        <h2>Create New Product</h2>

        <form onSubmit={handleSubmit} className="create-product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Discount %</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Price (PKR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Category</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                >
                <option value="">Select category</option>
              
                {subCategories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image && (
                <div className="img-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="preview-img"
                  />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="submit-btn">
            {loading ? <LoadingSpinner /> : "Create Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;
