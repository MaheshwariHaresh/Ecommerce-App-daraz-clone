import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import axios from "../Utils/AxiosConfig";
import Spinner from "../Utils/Spinner";

export default function AdminPrivateRoute() {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );
        if (data?.ok) {
          setOk(true); // true if admin
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("❌ Admin route check failed:", error.message);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) authCheck();
    else setLoading(false);
  }, [auth?.token]);

  if (loading) return <Spinner />;
  if (!auth?.token || !ok) return <Navigate to="/" />; // redirect if not admin
  return <Outlet />;
}
