import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backimage from "../../assets/logbakimage2.png"

const ForgotCodeVerification = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setMessage("Please enter verification code");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    console.log("Email Code:", code);

    navigate("/resetpassword");
  };

  const handleResend = () => {
    console.log("Email code resent");

    setMessage("Verification code sent again to your email ✔");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backimage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl w-full max-w-xl">
        
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <i className="bi bi-envelope-check text-2xl text-blue-600"></i>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center">
          Code Verification
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter the verification code sent to your email address
        </p>

        {message && (
          <p className="text-green-600 text-center mt-3 text-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          
          <div className="relative">
            <i className="bi bi-shield-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text"
              placeholder="Enter email code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Verify Code
          </button>

          <p className="text-center text-sm mt-4 text-gray-500">
            Didn't receive code?{" "}
            <span
              onClick={handleResend}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Resend Email Code
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotCodeVerification;