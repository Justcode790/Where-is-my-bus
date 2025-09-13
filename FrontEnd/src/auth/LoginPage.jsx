import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("demo@agency.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState("official");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password, role });

      if (data.user.role === "official") return navigate("/official");
      if (data.user.role === "driver") return navigate("/driver");

      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };


  
  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('./people-waiting-bus-bus-stop.png')" }}
    >
      <div className="bg-white/50 p-10 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Agency Portal Login</h1>
          <p className="text-gray-500">National Bus Tracking Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Agency ID / Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.agency@gov.in"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            >
              <option value="official">Official</option>
              <option value="driver">Driver</option>
              <option value="conductor">Conductor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full transition focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>

            <Link to="/signup" className="w-full">
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full transition focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;