import { Navigate } from "react-router-dom";
import storageUtils from "../utils/storageUtils";

const AssociateRoute = ({ children }) => {
  // ✅ Use storageUtils instead of direct localStorage
  const rawUser = storageUtils.getItem("user");
  const token = storageUtils.getItem("token");

  if (!rawUser || !token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const user = JSON.parse(rawUser);

    // ✅ normalize role (VERY IMPORTANT)
    const role = String(user.role || "").toLowerCase();

    // allow any non-admin logged-in user
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  } catch (error) {
    // If JSON parsing fails, redirect to auth
    console.error("Error parsing user data:", error);
    storageUtils.clear();
    return <Navigate to="/auth" replace />;
  }
};

export default AssociateRoute;