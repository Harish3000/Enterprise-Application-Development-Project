import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Track user role (admin,vendor, CSR)

  useEffect(() => {
    const checkAuth = () => {
      const vendorInfo = JSON.parse(localStorage.getItem("vendorInfo"));
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
      const csrInfo = JSON.parse(localStorage.getItem("csrInfo"));

      if (vendorInfo) {
        setIsAuthenticated(true);
        setUser(vendorInfo);
        setRole("vendor");
      } else if (adminInfo) {
        setIsAuthenticated(true);
        setUser(adminInfo);
        setRole("admin");
      } else if (csrInfo) {
        setIsAuthenticated(true);
        setUser(csrInfo);
        setRole("csr");
      }
    };

    checkAuth();
  }, []);

  const vendorlogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Auth/vendor-login",
        { email, password }
      );
      localStorage.setItem("vendorInfo", JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setRole("vendor");
    } catch (error) {
      console.error("Vendor Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Auth/admin-login",
        { email, password }
      );
      localStorage.setItem("adminInfo", JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setRole("admin");
    } catch (error) {
      console.error("Admin Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const csrLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Auth/csr-login",
        { email, password }
      );
      localStorage.setItem("csrInfo", JSON.stringify(response.data));
      setIsAuthenticated(true);
      setUser(response.data);
      setRole("csr");
    } catch (error) {
      console.error("CSR Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("csrInfo");
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        vendorlogin,
        adminLogin,
        csrLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
