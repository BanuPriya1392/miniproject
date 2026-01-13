import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage so login persists on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("nexus_user");
    return savedUser ? JSON.parse(savedUser) : { name: "GUEST", email: "guest@nexus.core" };
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("nexus_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ name: "GUEST", email: "guest@nexus.core" });
    localStorage.removeItem("nexus_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);