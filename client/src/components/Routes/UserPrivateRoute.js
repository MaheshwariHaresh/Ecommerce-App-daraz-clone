import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "../Utils/AxiosConfig";
import Spinner from "../Utils/Spinner";

export default function UserPrivateRoute() {
  const [auth, , authLoading] = useAuth();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (authLoading) return;
    const authCheck = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
        );

        if (data?.ok) {
          setOk(true); // true if normal user
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("❌ User route check failed:", error.message);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading && auth?.token) {
      authCheck();
    } else {
      setLoading(false); //no token
    }
    //eslint-disable-next-line
  }, [auth?.token, authLoading]);

  if (authLoading || loading) return <Spinner />;
  if (!auth?.token || !ok)
    return <Navigate to="/login" state={{ from: location.pathname }} />; // redirect if not user
  return <Outlet />;
}
