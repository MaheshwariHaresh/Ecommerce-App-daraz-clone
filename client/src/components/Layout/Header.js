import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/Cart";

// Components
import SearchInput from "../Form/SearchInput";
import CategoryDropDown from "./CategoryDropDown";

// Icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material";
import "../../styles/Header.css";

const Header = () => {
  const { cart } = useCart();
  const [auth, setAuth] = useAuth();

  const [showAppPopup, setShowAppPopup] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const isDisabled = auth?.user?.role === 1;

  /* ---------------------------------------------------------
      LOGOUT
  --------------------------------------------------------- */
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("checkoutProduct");
  };

  /* ---------------------------------------------------------
      HIDE DROPDOWNS IF CLICKED OUTSIDE
  --------------------------------------------------------- */

  // help dropdown
  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest(".help-dropdown") &&
        !e.target.closest(".help-btn")
      ) {
        setShowHelp(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // app popup
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".app-popup") && !e.target.closest(".app-btn")) {
        setShowAppPopup(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // profile dropdown
  useEffect(() => {
    const handler = (e) => {
      if (
        !e.target.closest(".profile-dropdown") &&
        !e.target.closest(".profile-btn")
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ---------------------------------------------------------
      CART BADGE STYLE
  --------------------------------------------------------- */
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: 14,
      top: 8,
      backgroundColor: "#fff",
      color: "#f85606",
      padding: "0 4px",
    },
  }));

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light h-110 shadow-sm">
        <div className="container-fluid px-4">
          {/* ---------------- TOP NAV LINKS ---------------- */}
          <div className="top-nav">
            <ul className="navbar-nav">
              {/* APP POPUP */}
              <li className="nav-item position-relative">
                <button
                  className="nav-link small-text fw-semibold text-uppercase app-btn border-0 bg-transparent"
                  onClick={() => setShowAppPopup(!showAppPopup)}
                >
                  SAVE MORE ON APP
                </button>

                {showAppPopup && (
                  <div className="app-popup">
                    <div className="popup-arrow"></div>
                    <div className="popup-content text-center">
                      <h6 className="fw-semibold mb-3">Download the App</h6>
                      <img
                        src="http://localhost:3000/images/daraz-qr-code.jpg"
                        alt="QR"
                        style={{ width: 200, height: 200 }}
                      />
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <a
                          href="https://apps.apple.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="http://localhost:3000/images/app-store.svg"
                            alt="App Store"
                            style={{ width: 150 }}
                          />
                        </a>
                        <a
                          href="https://play.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="http://localhost:3000/images/google-play.png"
                            alt="Google Play"
                            style={{ width: 150 }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* SELL ON DARAZ */}
              <li className="nav-item">
                <NavLink to="#" className="nav-link small-text fw-semibold">
                  SELL ON DARAZ
                </NavLink>
              </li>

              {/* HELP & SUPPORT */}
              <li className="nav-item position-relative">
                <button
                  className="nav-link small-text fw-semibold text-uppercase help-btn border-0 bg-transparent"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  HELP & SUPPORT
                </button>

                {showHelp && (
                  <div className="help-dropdown">
                    <div className="popup-arrow"></div>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <Link to="#" className="dropdown-link">
                          <ManageAccountsIcon /> Help Center
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-link">
                          <AddIcCallIcon /> Customer Care
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-link">
                          <BookmarkBorderIcon /> Order
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-link">
                          <LocalShippingIcon /> Shipping & Delivery
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-link">
                          <PaidIcon /> Payment
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="dropdown-link">
                          <KeyboardReturnIcon /> Returns & Refunds
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              {/* LOGIN / SIGNUP */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link small-text fw-semibold"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link small-text fw-semibold"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              ) : (
                /* ---------------- USER PROFILE MENU ---------------- */
                <li className="nav-item position-relative">
                  <button
                    className="nav-link small-text fw-semibold text-uppercase profile-btn border-0 bg-transparent"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    {auth?.user?.name}
                  </button>

                  {showProfile && (
                    <div className="profile-dropdown help-dropdown">
                      <div className="popup-arrow"></div>
                      <ul className="list-unstyled mb-0">
                        {/* ADMIN ONLY */}
                        {auth?.user?.role === 1 && (
                          <li>
                            <Link
                              to="/admin/dashboard"
                              className="dropdown-link"
                            >
                              <DashboardCustomizeIcon /> Dashboard
                            </Link>
                          </li>
                        )}

                        {/* NORMAL USER */}
                        <li>
                          <Link
                            to={isDisabled ? "#" : "/user/dashboard"}
                            className={
                              isDisabled ? "disabled-link" : "dropdown-link"
                            }
                          >
                            <SentimentSatisfiedAltOutlinedIcon /> Manage My
                            Account
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={isDisabled ? "#" : "/user/orders"}
                            className={
                              isDisabled ? "disabled-link" : "dropdown-link"
                            }
                          >
                            <BookmarkBorderOutlinedIcon /> My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className={
                              isDisabled ? "disabled-link" : "dropdown-link"
                            }
                          >
                            <FavoriteBorderOutlinedIcon /> Wishlist & Stores
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className={
                              isDisabled ? "disabled-link" : "dropdown-link"
                            }
                          >
                            <StarBorderPurple500OutlinedIcon /> My Reviews
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className={
                              isDisabled ? "disabled-link" : "dropdown-link"
                            }
                          >
                            <HighlightOffOutlinedIcon /> Return & Cancel
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/login"
                            onClick={handleLogout}
                            className="dropdown-link"
                          >
                            <AssignmentReturnOutlinedIcon /> Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              )}

              {/* LANGUAGE */}
              <li className="nav-item">
                <NavLink to="#" className="nav-link small-text fw-semibold">
                  Language
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ---------------- LOGO + SEARCH + CART ---------------- */}
          <div className="daraz-logo me-3">
            <Link to="/">
              <img
                src="http://localhost:3000/images/daraz logo.png"
                alt="daraz"
                style={{ height: 45 }}
              />
            </Link>
          </div>

          <div className="main-nav">
            <div className="search-cart-row">
              <SearchInput />

              {/* CART BADGE */}
              {auth?.token && cart?.length > 0 ? (
                <StyledBadge badgeContent={cart.length}>
                  <Link to="/cart" className="nav-link">
                    <ShoppingCartOutlinedIcon style={{ fontSize: 28 }} />
                  </Link>
                </StyledBadge>
              ) : (
                <Link to="/cart" className="nav-link">
                  <ShoppingCartOutlinedIcon style={{ fontSize: 28 }} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ---------------- CATEGORY DROPDOWN ---------------- */}
      <CategoryDropDown />
    </>
  );
};

export default Header;
