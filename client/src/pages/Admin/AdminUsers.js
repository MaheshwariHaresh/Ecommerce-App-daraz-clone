import React from "react";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";

const AdminUsers = () => {
  return (
    <AdminLayout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
