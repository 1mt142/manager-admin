import { authChecker } from "core/authChecker";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // const token = localStorage.getItem("token");
  let authStatus = authChecker();
  if (authStatus) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
