import React from "react";
import { useNavigate } from "react-router-dom";
import backimage from "../../assets/logbakimage2.png"

const PassSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backimage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl text-center w-full max-w-xl">
        
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-5 rounded-full">
            <i className="bi bi-check-lg text-6xl text-green-600"></i>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Password Reset Successful
        </h1>

        <p className="text-gray-500 mt-3">
          Your password has been updated successfully.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default PassSuccess;