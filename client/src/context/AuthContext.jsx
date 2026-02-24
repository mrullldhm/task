import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

/// Manages user authentication state including login, registration, and logout.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Action
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user: userData } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register Action
  const register = async (email, password) => {
    try {
      const response = await api.post("/auth/register", { email, password });
      const { token, user: userData } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout Action
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
