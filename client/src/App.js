import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import UserPrivateRoute from "./components/Routes/UserPrivateRoute";
import AdminPrivateRoute from "./components/Routes/AdminPrivateRoute";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminSubCategories from "./pages/Admin/AdminSubCategories";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";

import Dashboard from "./pages/user/Dashboard";
import MyOrders from "./pages/user/MyOrders";
import MyProfile from "./pages/user/MyProfile";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import FullPageLoaderSpinner from "./components/Utils/FullPageLoaderSpinner";

function App() {
  return (
    <div>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/payment-method/:orderId"
          element={<PaymentMethodPage />}
        />

        {/* USER ROUTES */}
        <Route element={<UserPrivateRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/orders" element={<MyOrders />} />
          <Route path="/user/profile" element={<MyProfile />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products/create-product" element={<CreateProduct />} />
          <Route path="products/:id" element={<UpdateProduct />} />
          <Route path="category/:id" element={<AdminSubCategories />} />
        </Route>

        {/* 404  */}
        <Route path="*" element={<PageNotFound />} />

        <Route path="loader" element={<FullPageLoaderSpinner />} />
      </Routes>
    </div>
  );
}

export default App;
