import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSendCode = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Verification code sent successfully");
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!code.trim()) {
      newErrors.code = "Please enter verification code";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/login");
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleVerify}
        className="w-full min-h-[900px] bg-white shadow-lg rounded-xl p-8 flex flex-col"
      >
        <h1 className="flex items-center gap-3 text-3xl font-bold mb-6">
        <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
        4
        </span>
         Verification
        </h1>

        <p className="text-center text-1xl font-bold text-gray-600 mb-8">
          A verification code has been sent to your email address.
        </p>

        <div className="w-full max-w-[90%]">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className={`w-full rounded-lg p-3 border focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Send Code */}
            <div>
              <button
                type="button"
                onClick={handleSendCode}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Code
              </button>
            </div>

            {/* Verification Code */}
            <div>
              <label className="block mb-2 font-medium">
                Verification Code
              </label>

              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setErrors({ ...errors, code: "" });
                }}
                className={`w-full rounded-lg p-3 border focus:outline-none focus:ring-2 ${
                  errors.code
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />

              {errors.code && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.code}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-8 mt-8">
            <button
              type="button"
              onClick={() =>
                navigate("/register/additionalinfo")
              }
              className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Verify & Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Verification;