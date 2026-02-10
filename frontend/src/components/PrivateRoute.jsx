import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Loader } from "lucide-react";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader className="size-5 animate-spin" />;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
