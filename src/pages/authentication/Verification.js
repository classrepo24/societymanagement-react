import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  // ✅ email restore
  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem("verificationEmail") || "";
  });

  // ✅ code restore
  const [code, setCode] = useState(() => {
    return sessionStorage.getItem("verificationCode") || "";
  });

  const [errors, setErrors] = useState({});

  const [showSendPopup, setShowSendPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [codeSent, setCodeSent] = useState(() => {
    return sessionStorage.getItem("codeSent") === "true";
  });

  // ---------------------------
  // EMAIL VALIDATION FUNCTION
  // ---------------------------
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ---------------------------
  // SESSION SAVE
  // ---------------------------
  useEffect(() => {
    sessionStorage.setItem("verificationEmail", email);
  }, [email]);

  useEffect(() => {
    sessionStorage.setItem("verificationCode", code);
  }, [code]);

  useEffect(() => {
    sessionStorage.setItem("codeSent", codeSent);
  }, [codeSent]);

  // ---------------------------
  // SEND CODE
  // ---------------------------
  const handleSendCode = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter valid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCodeSent(true);
      setShowSendPopup(true);
    }
  };

  // ---------------------------
  // VERIFY
  // ---------------------------
  const handleVerify = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!codeSent) {
      newErrors.code = "Please send code first";
    }

    if (!code.trim()) {
      newErrors.code = "Verification code is required";
    } else if (code.length < 4) {
      newErrors.code = "Enter valid verification code";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // clear all session data
      sessionStorage.removeItem("personalInfo");
      sessionStorage.removeItem("societyInfo");
      sessionStorage.removeItem("additionalInfo");
      sessionStorage.removeItem("additionalTotal");

      sessionStorage.removeItem("verificationEmail");
      sessionStorage.removeItem("verificationCode");
      sessionStorage.removeItem("codeSent");

      setShowSuccessPopup(true);
    }
  };

  return (
    <div className="w-full relative">

      {/* ---------------- SEND POPUP ---------------- */}
      {showSendPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">
            <h2 className="text-xl font-bold">Code Sent 📩</h2>
            <p className="text-gray-600 mt-2">
              Verification code sent to email
            </p>

            <button
              onClick={() => setShowSendPopup(false)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------------- SUCCESS POPUP ---------------- */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">
            <h2 className="text-xl font-bold">Success 🎉</h2>
            <p className="text-gray-600 mt-2">
              Verification completed successfully
            </p>

            <button
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/login");
              }}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------------- FORM ---------------- */}
      <form
        onSubmit={handleVerify}
        className="w-full min-h-[900px] bg-white p-8 rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-6">
          Verification
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          className="w-full p-3 border rounded-lg"
          placeholder="Enter email"
        />

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        {/* SEND CODE */}
        <button
          type="button"
          onClick={handleSendCode}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
        >
          Send Code
        </button>

        {/* CODE */}
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setErrors({});
          }}
          className="w-full p-3 border rounded-lg mt-6"
          placeholder="Enter verification code"
        />

        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code}</p>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => navigate("/register/additionalinfo")}
            className="border px-6 py-2 rounded-lg"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Verify & Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification;