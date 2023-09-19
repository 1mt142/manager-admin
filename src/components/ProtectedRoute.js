import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
