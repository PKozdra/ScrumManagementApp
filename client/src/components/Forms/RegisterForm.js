// this form uses base form and creates registration form
import React, { useState } from "react";
import BlankForm from "./BlankForm";
import UseAuth from "../../hooks/UseAuth";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = UseAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      username,
      password,
    };

    console.log(user);

    registerUser(user);
  };

  async function registerUser(user) {
    setLoading(true);
    setError("");
    try {
      const response = await register(user.email, user.username, user.password);
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
          <p className="text-green-500">Registration successful!</p>
        </div>
      );
    }
  }

  return (
    <BlankForm>
      <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
        Sign up
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
            htmlFor="username"
            className="block text-sm font-semibold text-gray-800"
          >
            Username
          </label>
          <input
            type="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Register
          </button>{" "}
        </div>
      </form>

      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Already have an account?{" "}
        <a
          href="/signin"
          className="font-medium text-purple-600 hover:underline"
        >
          Sign in
        </a>
      </p>
      {handleError()}
    </BlankForm>
  );
}

export default RegisterForm;
