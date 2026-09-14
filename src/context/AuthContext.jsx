import { createContext, useState, useEffect } from "react";

/**
 * AuthContext - Global authentication state
 * 
 * Use this file to set up proper authentication in your app
 * 
 * Installation:
 * 1. Create folder: src/context/
 * 2. Create file: src/context/AuthContext.jsx
 * 3. Copy this entire code
 * 4. Update App.jsx to wrap with AuthProvider
 */

export const AuthContext = createContext();

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ========================================
  // CHECK IF USER IS LOGGED IN ON MOUNT
  // ========================================
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid data
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ========================================
  // LOGIN FUNCTION
  // ========================================
  const login = (userData) => {
    try {
      setUser(userData);
      setIsLoggedIn(true);

      // Store in localStorage
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", userData.role || "user");

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // ========================================
  // LOGOUT FUNCTION
  // ========================================
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);

    // Clear from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
  };

  // ========================================
  // UPDATE USER FUNCTION
  // ========================================
  const updateUser = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error("Update user failed:", error);
      return false;
    }
  };

  // ========================================
  // CONTEXT VALUE
  // ========================================
  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;