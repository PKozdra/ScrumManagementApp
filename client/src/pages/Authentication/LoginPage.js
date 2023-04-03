// it's home with LoginForm prop
import React from "react";
import LoginForm from "../../components/Forms/LoginForm";
import Home from "../Home/Home";
import UserGuard from "../../guards/UserGuard";

function LoginPage() {
  return (
    <UserGuard>
      <Home>
        <LoginForm />
      </Home>
    </UserGuard>
  );
}

export default LoginPage;
