import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userDataString = localStorage.getItem("user");

  useEffect(() => {
    console.log("🔐 Checking Authentication...");
    console.log("📌 Allowed Roles:", allowedRoles);
    console.log("📌 Token from localStorage:", token);
    console.log("📌 Raw User Data from localStorage:", userDataString);
  }, []);

  if (!token || !userDataString) {
    console.warn("🚨 No user or token found, redirecting to login...");
    return <Navigate to="/" replace />;
  }

  // let user;
  // try {
  //   user = JSON.parse(userDataString);
  //   console.log("✅ Parsed User Data:", user);

  //   if (!user.role) {
  //     console.warn("⛔ User role is missing!");
  //     return <Navigate to="/unauthorized" replace />;
  //   }

  //   if (!allowedRoles.includes(user.role.toLowerCase())) {
  //     console.warn("⛔ Unauthorized access detected:", user.role);
  //     return <Navigate to="/unauthorized" replace />;
  //   }
  // } catch (error) {
  //   console.error("❌ Error parsing user data:", error);
  //   localStorage.clear(); 
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
