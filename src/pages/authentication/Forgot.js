import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backimage from "../../assets/logbakimage2.png"
const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = (e) => {
    e.preventDefault();

    // Empty check
    if (!email.trim()) {
      setError("Please enter email");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    alert("Code sent successfully");
    navigate("/forgotcodeverification", { state: { email } });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backimage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <form
        onSubmit={handleSendOTP}
        className="w-full max-w-xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-12"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <i className="bi bi-unlock2-fill text-2xl text-blue-600"></i>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mt-2 text-sm">
          Enter your registered email
        </p>

        {/* Email Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <div className="relative">
            <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Send Code
        </button>

        {/* Back to Login */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Remember password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-medium hover:underline"
          >
            Back to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Forgot;