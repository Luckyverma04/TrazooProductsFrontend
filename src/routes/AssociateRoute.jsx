import { Navigate } from "react-router-dom";

const AssociateRoute = ({ children }) => {
  const rawUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!rawUser || !token) {
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(rawUser);

  // ✅ normalize role (VERY IMPORTANT)
  const role = String(user.role || "").toLowerCase();

  // allow any non-admin logged-in user
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AssociateRoute;
