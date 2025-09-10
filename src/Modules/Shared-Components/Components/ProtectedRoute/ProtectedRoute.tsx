import React, { Children, useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { loginData } = useContext(AuthContext);

  if (loginData || localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
