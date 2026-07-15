import React from "react";

export const ContactSupport = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

      {/* Heading */}
      <h2 className="text-[28px] font-bold text-[#1B2559]">
        Contact Support
      </h2>

      <p className="text-[15px] text-gray-500 mt-1">
        Choose a way to reach our support team.
      </p>

      {/* Contact List */}
      <div className="mt-8 space-y-5">

        {/* Helpdesk */}
        <div className="flex gap-5 items-start">

          <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <i className="bi bi-headset text-[30px] text-blue-600"></i>
          </div>

          <div className="flex-1">

            <h3 className="font-bold text-[#1B2559] text-lg">
              Helpdesk Number
            </h3>

            <p className="text-blue-600 font-bold text-2xl mt-1">
              +91 98765 43210
            </p>

            <p className="text-gray-500 mt-1">
              Mon - Sat (9:00 AM - 7:00 PM)
            </p>

          </div>

        </div>

        <hr />

        {/* Email */}

        <div className="flex gap-5 items-start">

          <div className="w-16 h-16 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <i className="bi bi-envelope text-[28px] text-green-600"></i>
          </div>

          <div className="flex-1">

            <h3 className="font-bold text-[#1B2559] text-lg">
              Email Support
            </h3>

            <p className="text-blue-600 font-semibold text-lg mt-1 break-all">
              support@societymanagement.com
            </p>

            <p className="text-gray-500 mt-1">
              We usually reply within 24 hours
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};