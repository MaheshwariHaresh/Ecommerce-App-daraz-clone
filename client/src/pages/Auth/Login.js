import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../components/Utils/AxiosConfig";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import LoadingSpinner from "../../components/Utils/LoadingSpinner";
import FacebookIcon from "../../components/M-Designs/imageList/FacebookIcon";
import GoogleIcon from "../../components/M-Designs/imageList/GoogleIcon";
import OpenEyeIcon from "../../components/M-Designs/imageList/OpenEyeIcon";
import CloseEyeIcon from "../../components/M-Designs/imageList/CloseEyeIcon";
import { SocialAuthHandler } from "../../components/Utils/SocialAuthHandler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState({
    form: false,
    social: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading((prev) => ({ ...prev, form: true }));
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (data?.success) {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem("auth", JSON.stringify(data));
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, form: false }));
          toast.success("Welcome to Daraz!");
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="login-wrapper">
        <div className="login-header">
          <h3>Welcome to Daraz! Please login</h3>
          <div>
            New member? <Link to={"/register"}>Register</Link> here
          </div>
        </div>

        <div className="outer-container">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <h5 className="title">Login with Password</h5>

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
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label w-100"
                >
                  <div className="password-label">
                    <span>
                      Password<span style={{ color: "red" }}>*</span>
                    </span>
                    <Link to={"/forgot-password"}>forgot password?</Link>
                  </div>
                </label>
                <div className="password-input-container">
                  <input
                    type={isPasswordVisible ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Please enter your password"
                    disabled={loading.form}
                    required
                  />
                  <span
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <CloseEyeIcon /> : <OpenEyeIcon />}
                  </span>
                </div>
              </div>

              <button
                style={{ backgroundColor: "#f57224", color: "#fff" }}
                type="submit"
                className="form-control"
                disabled={loading.form || loading.social}
              >
                {loading.form ? <LoadingSpinner /> : "LOGIN"}
              </button>

              <div className="login-wrap-divider">
                <hr className="divider-line" />
                <span>Or, login with</span>
                <hr className="divider-line" />
              </div>
              <div className="mode-login">
                <button
                  type="botton"
                  className="form-control"
                  disabled={loading.social}
                  onClick={() =>
                    SocialAuthHandler({
                      providerType: "facebook",
                      type: "login",
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
                  type="button"
                  className="form-control"
                  disabled={loading.social}
                  onClick={() =>
                    SocialAuthHandler({
                      providerType: "google",
                      type: "login",
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

export default Login;
