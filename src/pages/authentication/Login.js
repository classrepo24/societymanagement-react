import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import bakimage2 from "../../assets/logbakimage2.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bakimage2})`,
      }}
    >
      {/* Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-blue-950/100 via-blue-950/5 to-transparent"></div>      
      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-between px-6 md:px-16">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 text-white self-start pt-10">
          <div className="flex items-center gap-4">
  <i className="bi bi-buildings text-7xl"></i>

     <div>
     <h1 className="text-4xl md:text-5xl font-bold leading-tight">
      SOCIETY
     </h1>
    <p className="text-1xl font-bold text-white-100 tracking-wide">
      MANAGEMENT SYSTEM
      </p>
      </div>
      </div>

          <div className="mt-16">
            <h2 className="text-3xl md:text-6xl font-bold leading-tight">
       Building Better
       <br />
       Communities Together
         </h2>
         <p className="mt-8 text-lg md:text-xl text-gray-100 max-w-xl leading-relaxed">
              A complete solution to manage your society <br></br>
              efficiently and transparently.
            </p>

            <ul className="mt-8 space-y-4 text-xl text-gray-100">
              <li><i class="bi bi-tools pr-6"></i>  Maintenance Management</li>
              <li><i class="bi bi-person-badge pr-6"></i> Visitor Tracking</li>
              <li><i class="bi bi-chat-dots pr-6"></i> Complaint Resolution</li>
              <li><i class="bi bi-megaphone pr-6"></i> Community Notices</li>
              <li><i class="bi bi-shield-lock pr-6"></i>Staff & Security Management</li>
              <li><i class="bi bi-bar-chart-line pr-6"></i> Reports & Analytics</li>
            </ul>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex justify-start md:pl-2 mt-10  md:mt-0">

          <form className="w-full  mr-60 max-w-xl bg-white rounded-3xl shadow-2xl p-12">
            <h1 className="text-5xl font-bold text-gray-800">
              Welcome Back! 👋
            </h1>
             
            <p className="text-lg text-gray-500 mt-3">
              Login to your account to continue
            </p>

            <div className="relative mt-3">
  {/* Icon */}
           <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-500"></i>

       {/* Input */}
        <input
        type="text"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Enter email or mobile number"
    className="w-full border border-gray-300 rounded-xl pl-12 pr-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>
            {/* Password */}
            <div className="mt-6">
  <label className="block text-base font-medium text-gray-700">
    Password
  </label>

  <div className="relative mt-3">
    
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Enter password"
      className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none pr-20"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-600 font-medium"
    >
      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
    </button>
     </div>
     <div className="flex justify-end mt-2">
  <NavLink
    to="/forgot"
    className="text-blue-600 text-sm font-medium hover:underline"
  >
    Forgot Password?
  </NavLink>
</div>
      </div>

            {/* Login Button */}
            <button
            onClick={handleSubmit}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              <i class="bi bi-lock-fill pr-2"></i>
                Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Register */}
            <p className="text-center text-lg">
              Don't have an account?{" "}
              <NavLink
              to="/register/personalinfo"
              className="text-blue-600 font-semibold hover:underline">
            Register Now
             </NavLink>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;