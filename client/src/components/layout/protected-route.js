import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../layout/authcontext.js";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (isAuthenticated !== null) {
      setLoading(false);
    }
  }, [isAuthenticated]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    
    return <Navigate to="/" replace />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;
