import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backimage from "../../assets/logbakimage2.png"

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    console.log({ password, confirmPassword });

    navigate("/passsuccess");
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

      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <i className="bi bi-shield-lock text-2xl text-blue-600"></i>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          
          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative mt-1">
              <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative mt-1">
              <i className="bi bi-lock-fill absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;