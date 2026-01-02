import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123admin") {
      // simple auth (can be replaced with real auth later)
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT: Branding / Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 text-white items-center justify-center p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">OOS</h1>
          <p className="text-lg text-slate-300 mb-6">
            AI Operations Optimization System
          </p>

          

          <p className="text-sm text-slate-400 mt-6">
            Monitor • Optimize • Deliver
          </p>
        </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to AI Operations Optimization System
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 
                text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 
              rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6 text-center">
            © 2025 AI-OOS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
