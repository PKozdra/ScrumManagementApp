import { Navigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

export default GuestGuard;
