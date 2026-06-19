import React from "react";
import { Outlet, useLocation,useNavigate } from "react-router-dom";

const Registration = () => {
  const location = useLocation();
 const navigate = useNavigate();
  const steps = [
    {
      no: 1,
      title: "Personal Information",
      path: "/register/personalinfo",
    },
    {
      no: 2,
      title: "Society Information",
      path: "/register/societyinfo",
    },
    {
      no: 3,
      title: "Family Details",
      path: "/register/additionalinfo",
    },
    {
      no: 4,
      title: "Verification",
      path: "/register/verification",
    },
  ];

  const currentStep =
    steps.findIndex((step) => step.path === location.pathname) +1;

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-4">
      <div className="grid grid-cols-12 gap-3 md:gap-6">
        
        {/* LEFT PANEL */}
        <div className="col-span-5 md:col-span-4">
          <div className="sticky top-4 h-[900px] bg-gradient-to-b from-blue-700 to-blue-900 rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg flex flex-col">
            
            {/* Header */}
            <div className="flex items-center gap-2 md:gap-3">
              <i className="bi bi-buildings text-3xl md:text-5xl lg:text-7xl"></i>

              <div>
                <h1 className="text-lg md:text-2xl lg:text-4xl font-bold leading-tight">
                  SOCIETY
                </h1>

                <p className="text-[10px] md:text-sm lg:text-xl font-bold text-blue-100 tracking-wide">
                  MANAGEMENT SYSTEM
                </p>
              </div>
            </div>

            {/* Title */}
            <p className="mt-6 md:mt-10 lg:mt-20 text-lg md:text-2xl lg:text-4xl font-semibold">
              Create Your Account
            </p>

            <p className="mt-2 text-sm md:text-lg lg:text-2xl text-blue-100">
              Step {currentStep} of 4
            </p>

            {/* Stepper */}
            <div className="mt-8 md:mt-12 lg:mt-20 relative">
              
              {/* Background Line */}
              <div
                className="absolute top-4 md:top-5 h-1 bg-blue-500"
                style={{
                  left: "12%",
                  right: "12%",
                }}
              ></div>

              {/* Active Line */}
              <div
                className="absolute top-4 md:top-5 h-1 bg-white transition-all duration-300"
                style={{
                  left: "12%",
                  width: `${
                    ((currentStep - 1) / (steps.length - 1)) * 76
                  }%`,
                }}
              ></div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.no}
                    onClick={()=>navigate(step.path)}
                    className="flex flex-col items-center text-center w-10 md:w-16 lg:w-24"
                  >
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm z-10 ${
                        currentStep >= step.no
                          ? "bg-white text-blue-700"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {step.no}
                    </div>

                    <p className="mt-2 text-[7px] md:text-[10px] lg:text-xs font-medium">
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-6 md:pt-10 text-center">
              <i className="bi bi-shield-lock text-4xl md:text-6xl lg:text-9xl"></i>

              <p className="mt-3 md:mt-4 text-[10px] md:text-sm lg:text-lg text-blue-100">
                Your information is
                <br />
                secure with us
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-7 md:col-span-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Registration;