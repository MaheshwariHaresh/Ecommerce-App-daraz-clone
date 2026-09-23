import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../components/Utils/AxiosConfig";
import "../../styles/AuthStyles.css";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email }
      );
      if (data?.success) {
        window.alert(data.message);
        setLoading(false);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"forgot-password - Ecommerce App"}>
      <div className="login-wrapper">
        <div className="login-header">
          {/* <h3>Welcome to Daraz! Please login</h3> */}
          <div>
            back to <Link to={"/login"}>Login</Link> page
          </div>
        </div>

        <div className="outer-container">
          <div className="container m-60">
            <h5 className=" title">Forgot Your Password?</h5>
            <p className=" text-muted mb-4" style={{ fontSize: "14px" }}>
              Please enter the account that you want to reset the password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="example@gmail.com"
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
                {loading ? <LoadingSpinner /> : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
