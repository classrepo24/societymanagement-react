import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Personalinfo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    email: "",
    mobile: "",
    alternateMobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full Name is required";

    if (!form.dob)
      newErrors.dob = "Date of Birth is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/register/societyinfo");
    }
  };

  return (
    <div className="w-full">
      <form className="w-full  bg-white shadow-lg rounded-xl p-8 flex flex-col">
        <h1 className="flex items-center gap-3 text-3xl font-bold mb-6">
         <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
           1
           </span>
           Personal Information
           </h1>

        {/* Content Area */}
        <div className=" flex flex-col">
          <div className="space-y-2 max-w-[90%]  w-full">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3"
                />
              </div>

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-2 font-medium">
                Date of Birth <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />

              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-2 font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <i className="bi bi-telephone absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3"
                />
              </div>

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Alternate Mobile */}
            <div>
              <label className="block mb-2 font-medium">
                Alternate Mobile Number
              </label>

              <div className="relative">
                <i className="bi bi-telephone absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="number"
                  name="alternateMobile"
                  value={form.alternateMobile}
                  onChange={handleChange}
                  placeholder="Enter alternate mobile number"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg pl-12 pr-14 p-3"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg pl-12 pr-14 p-3"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <i
                    className={`bi ${
                      showConfirmPassword
                        ? "bi-eye-slash"
                        : "bi-eye"
                    }`}
                  ></i>
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Button Bottom */}
          <div className="  flex justify-end  pb-6 pt-8">
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600  text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-6"
            >
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Personalinfo;