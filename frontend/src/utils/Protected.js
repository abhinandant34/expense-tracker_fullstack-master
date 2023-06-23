import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isLoggedIn, children }) {
  console.log("logged in 1: " + typeof isLoggedIn);


  if (!isLoggedIn) {
    console.log("logged in 2: " + isLoggedIn);
    console.log("Hello world");
    return <Navigate to="/" replace />;
  } else {
    console.log("logged in 3: " + isLoggedIn);
    console.log("Bye world");
    return children;
  }
}

export default Protected;
