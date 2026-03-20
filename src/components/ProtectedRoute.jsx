import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Auth/Login.jsx";

function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  return <>{user ? <Dashboard /> : <Login />}</>;
}

export default ProtectedRoute;
