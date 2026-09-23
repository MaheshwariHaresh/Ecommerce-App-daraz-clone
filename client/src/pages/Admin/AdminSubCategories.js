import  {  useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import axios from "../../components/Utils/AxiosConfig";
import { Modal, Card } from "antd";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import {  EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../components/Form/CategoryForm";
import { Link } from "react-router-dom";
import uploadImage from '../../components/Utils/UploadImage.js'
import "../../styles/AuthStyles.css";
import "../../styles/admin/AdminCategories.css"


const AdminSubCategories = () => {
  const {id}= useParams()
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading]= useState(false);
  
// getting sub-categories
const getData= async()=>{
  const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category/${id}`)
  if(data?.success){
    setSubCategories(data.category.subCategories)
  }
}

useEffect(()=>{
  getData()
},[])
  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      const imgUrl= await uploadImage(image)
    if(!imgUrl){
     return toast.error('URL not provided')
    }
      const subCategoryData = {
        name:name,
        image:imgUrl,
        categoryId: id,
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/subcategory/create`,
        subCategoryData
      );

      if (data?.success) {
        toast.success(`${name} created successfully`);
        setName("");
        setImage("");
        setShowCreateModal(false);
        setLoading(false)
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Something went wrong while creating category");
    }
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true)
      const imgUrl= await uploadImage(image);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName , image:imgUrl }
      );
      if (data?.success) {
        toast.success(`Category updated`);
        setVisible(false);
        setLoading(false)
      } else {
        setLoading(false)
        toast.error(data.message);

      };
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {

    
    try {
      const confirm =window.confirm('Are you sure you want to delete this category?')
      if(!confirm) return
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
      } else toast.error(data.message);
    } catch (error) {
      toast.error("Something went wrong while deleting category");
    }
  };

  return (
    <AdminLayout title={"Dashboard - Manage Categories"}>
      <div className="admin-categories-container">
        <div className="admin-categories-header">
          <h2>Manage Sub Categories</h2>
          <button
            className="btn btn-outline-warning"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Category
          </button>
        </div>

        {/* Categories grid*/}
        <div className="admin-categories-grid">
          {subCategories?.map((category) => (
            <Card
              key={category._id}
              hoverable
              className="admin-category-card"
              cover={
                <img
                  alt={category.name}
                  src={category.image}
                  className="admin-category-card-img"
                />
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    setVisible(true);
                    setSelected(category);
                    setUpdatedName(category.name);
                  }}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(category._id)}
                />,
              ]}
            >
              <Card.Meta
                title={
                  <Link
                    to={`/admin/category/${category._id}`}
                    className="admin-category-link"
                  >
                    {category.name}
                  </Link>
                }
                description="Click edit or delete to manage this category"
              />
            </Card>
          ))}
        </div>

        {/* Create Category Modal */}
        <Modal
          title="Create New Category"
          open={showCreateModal}
          onCancel={() => setShowCreateModal(false)}
          footer={null}
        >
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            image={image}
            setName={setName}
            setImage={setImage}
            btnName={loading? <LoadingSpinner/> : "Create"}
          />
        </Modal>

        {/* Edit Category Modal */}
        <Modal
          title="Edit Category"
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <CategoryForm
            handleSubmit={handleUpdate}
            name={updatedName}
            setName={setUpdatedName}
            btnName={loading? <LoadingSpinner/> : "Update"} 
          />
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminSubCategories;
