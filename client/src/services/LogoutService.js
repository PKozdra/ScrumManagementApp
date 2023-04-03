// logout service

import React from "react";
import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const LogoutService = () => {
  const { isAuthenticated, logOut } = UseAuth();

  async function handleLogout() {
    try {
      const response = await logOut();
    } catch (e) {
      console.log("An error has happened: " + e);
    }
  }

  console.log("LogoutService isAuthenticated:" + isAuthenticated);
  if (isAuthenticated) {
    handleLogout();
    return <Navigate to="/signin" />;
  }
  return <Navigate to="/signin" />;
};

export default LogoutService;
