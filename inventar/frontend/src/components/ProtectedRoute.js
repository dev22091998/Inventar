import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // yoki sizning auth context

  if (!token) {
    // Agar token yo'q bo'lsa, login sahifasiga yo'naltiradi
    return <Navigate to="/login" replace />;
  }

  return children; // token mavjud bo'lsa, admin sahifasini ko'rsatadi
};

export default ProtectedRoute;
