// it's home with RegisterForm prop
import React from "react";
import RegisterForm from "../../components/Forms/RegisterForm";
import Home from "../Home/Home";
import UserGuard from "../../guards/UserGuard";

function RegisterPage() {
  return (
    <UserGuard>
      <Home>
        <RegisterForm />
      </Home>
    </UserGuard>
  );
}

export default RegisterPage;
