import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import "../../styles/AuthStyles.css";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import FacebookIcon from "../../components/M-Designs/imageList/FacebookIcon";
import GoogleIcon from "../../components/M-Designs/imageList/GoogleIcon";
import { SocialAuthHandler } from "../../components/Utils/SocialAuthHandler";

const Register = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({ form: false, social: false });
  const navigate = useNavigate();

  // from function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, form: true }));
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, form: false }));
          toast.success("User Register Successfully");
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="login-wrapper h-100">
        <div className="login-header">
          <h3>Create your Daraz Account</h3>
          <div>
            Already member? <Link to={"/login"}>Login</Link> here
          </div>
        </div>

        <div className="outer-container">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Full Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Please enter your name"
                  disabled={loading.form}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Please enter your email"
                  disabled={loading.form}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Please enter your Password"
                  disabled={loading.form}
                  required
                />
              </div>

              <button
                style={{ backgroundColor: "#f57224", color: "#fff" }}
                type="submit"
                className="form-control"
                disabled={loading.form || loading.social}
              >
                {loading.form ? <LoadingSpinner /> : "REGISTER"}
              </button>

              <div className="login-wrap-divider">
                <hr className="divider-line" />
                <span>Or, sign up with</span>
                <hr className="divider-line" />
              </div>
              <div className="mode-login">
                <button
                  className="form-control"
                  disabled={loading.social}
                  onClick={() =>
                    SocialAuthHandler({
                      providerType: "facebook",
                      type: "register",
                      setLoading,
                      setAuth,
                      navigate,
                    })
                  }
                >
                  <span>
                    <FacebookIcon className="logos" />
                  </span>
                  Facebook
                </button>
                <button
                  className="form-control"
                  disabled={loading.social}
                  onClick={() =>
                    SocialAuthHandler({
                      providerType: "google",
                      type: "register",
                      setLoading,
                      setAuth,
                      navigate,
                    })
                  }
                >
                  <span>
                    <GoogleIcon className="logos" />
                  </span>
                  Goggle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
