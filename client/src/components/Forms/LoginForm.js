// this form uses base form and creates registration form
import React, { useState } from "react";
import BlankForm from "./BlankForm";
import UseAuth from "../../hooks/UseAuth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { logIn } = UseAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);
    login(user);
  };

  async function login(user) {
    setLoading(true);
    setError("");
    try {
      const response = await logIn(user.email, user.password);
      if (response != undefined) {
        console.log("response: ", response.props.children);
        setError(response.props.children);
      }
      else {
        setError("null");
      }
      setLoading(false);
    } catch (e) {
      console.log("An error has happened: " + e);
    }
  }
  
  const handleError = () => {
    if (error != "" && error != "null") {
      return (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }
    else if (error == "null") {
      return (
        <div className="text-center">
          <p className="text-green-500">Login successful!</p>
        </div>
      );
    }
  }

    return (
    // handlers
    <div>
      <BlankForm>
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="/signin" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className={
                loading
                  ? "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-not-allowed"
                  : "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              }
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </a>
          </p>
          {handleError()}
      </BlankForm>
    </div>
  );
}

export default LoginForm;
