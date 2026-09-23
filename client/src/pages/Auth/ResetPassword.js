import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import "../../styles/AuthStyles.css";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/reset-password`,
        { token, password },
      );

      if (data?.success) {
        setTimeout(() => {
          toast.success(data.message);
          setLoading(false);
          navigate("/login");
        }, 5000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid or expired link");
    }
  };

  return (
    <Layout title={"Reset Password - Ecommerce App"}>
      <div className="login-wrapper">
        <div className="login-header">
          <h3>Welcome to Daraz! Please login</h3>
        </div>

        <div className="outer-container">
          <div className="container m-60">
            <h5 className=" title">Reset Password</h5>
            <p className=" text-muted mb-4" style={{ fontSize: "14px" }}>
              Enter your new password below.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter new password"
                  disabled={loading}
                  required
                />
              </div>

              <button
                style={{ backgroundColor: "#f57224", color: "#fff" }}
                type="submit"
                className="form-control"
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
