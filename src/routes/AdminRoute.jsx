import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const rawUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Check if user is logged in
  if (!rawUser || !token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const user = JSON.parse(rawUser);
    const role = String(user.role || "").toLowerCase();

    // Check if user is admin
    if (role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    // If JSON parsing fails, redirect to auth
    console.error("Error parsing user data:", error);
    localStorage.clear();
    return <Navigate to="/auth" replace />;
  }
};

export default AdminRoute;