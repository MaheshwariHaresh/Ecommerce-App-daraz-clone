import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "../../components/Utils/AxiosConfig";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import { toast } from "react-toastify";
import "../../styles/MyProfile.css";
import AccountSidebar from "./AccountSidebar";
import Layout from "../../components/Layout/Layout";

const MyProfile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      province: "",
      city: "",
      area: "",
    },
    gender: "",
    dateOfBirth: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const { name, email, phone, address, gender, date_of_birth } =
      auth?.user || {};
    setProfile({
      name: name || "",
      email: email || "",
      phone: phone || "",
      address: {
        province: address.province || "",
        city: address.city || "",
        area: address.area || "",
      },
      gender: gender || "",
      dateOfBirth: date_of_birth ? date_of_birth.substring(0, 10) : "",
    });
  }, [auth?.user]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // handle address
  const handleAddressChange = (field, value) => {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        [field]: value,
      },
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        profile
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        setTimeout(() => {
          navigate("/user/dashboard");
          toast.success("Profile updated successfully");
          setLoading(false);
        }, 5000);
      } else {
        toast.error(data?.message || "Failed to update profile");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error updating profile");
      setLoading(false);
    }
  };

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-address`,
        {
          address: {
            province: profile.address.province,
            city: profile.address.city,
            area: profile.address.area,
          },
        }
      );
      if (data.success) {
        setAuth({ ...auth, user: data.updatedUser });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.updatedUser })
        );
        toast.success("Address updated");
      }
    } catch (error) {
      toast.error("Error updating address");
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirm = window.confirm(
        "Are You Sure You Want To Delete Your Account Permanently?"
      );
      if (!confirm) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/delete-account`
      );

      if (data?.success) {
        toast.success("Account Deleted Successfully");

        // ✅ Clear user data from context and localStorage
        localStorage.removeItem("auth");
        setAuth({ user: null, token: "" });
        navigate("/login");
      } else {
        toast.error(data?.message || "Something Went Wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error While Deleting Account");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/change-password`,
        { oldPassword, newPassword }
      );

      if (data?.success) {
        toast.success("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        window.bootstrap.Modal.getInstance(
          document.getElementById("passwordModal")
        ).hide();
      } else {
        toast.error(data?.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"My Profile"}>
      <div className="account-page">
        <AccountSidebar name={auth?.user?.name} />

        <main className="account-content">
          <div className="profile-page">
            <div className="profile-card">
              <form className="profile-form" onSubmit={handleProfileUpdate}>
                <h4 className="section-heading">Personal Information</h4>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group half">
                    <label className="form-label">Email (Not Editable)</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group half">
                    <label className="form-label">Gender</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) =>
                        handleChange("dateOfBirth", e.target.value)
                      }
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner /> : "Save All Changes"}
                  </button>
                </div>
              </form>

              <form className="profile-form" onSubmit={handleAddressUpdate}>
                <h4 className="section-heading">Address Information</h4>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Province</label>
                    <select
                      value={profile.address.province}
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
                      value={profile.address.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      value={profile.address.area}
                      onChange={(e) =>
                        handleAddressChange("area", e.target.value)
                      }
                      placeholder="eg, house no 04 main shahi bazar hyderabad"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner /> : "Save All Changes"}
                  </button>
                </div>
              </form>

              <div>
                {/* Change Password Section */}
                <div className="password-section">
                  <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#passwordModal"
                  >
                    Change Password
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Password Modal */}
            <div
              className="modal fade"
              id="passwordModal"
              tabIndex="-1"
              aria-labelledby="passwordModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="passwordModalLabel">
                      Change Password
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handlePasswordChange}>
                      <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter old password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default MyProfile;
