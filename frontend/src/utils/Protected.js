import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    console.log("1 2 ka 4")
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}

export default Protected;
