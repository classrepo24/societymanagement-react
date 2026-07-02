import React from "react";

const contacts = [
  {
    title: "Security Control Room",
    number: "+91 91234 56789",
  },
  {
    title: "Maintenance Team",
    number: "+91 99887 66554",
  },
  {
    title: "Fire Emergency",
    number: "101",
  },
  {
    title: "Ambulance",
    number: "108",
  },
];

export const EmergencyContact = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <i className="bi bi-shield-fill-check text-red-500 text-xl"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#1B2559]">
            Emergency Contacts
          </h2>

          <p className="text-gray-500 mt-1">
            For urgent issues, please contact:
          </p>
        </div>

      </div>

      {/* Contact Table */}
      <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">

        {contacts.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 items-center px-5 py-4 bg-gray-50 ${
              index !== contacts.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            {/* Left */}
            <p className="font-semibold text-[#1B2559]">
              {item.title}
            </p>

            {/* Right */}
            <div className="flex items-center justify-end gap-3">

              <i className="bi bi-telephone-fill text-blue-600"></i>

              <span className="font-semibold text-[#1B2559]">
                {item.number}
              </span>

            </div>
          </div>
        ))}

      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">

        <p className="text-gray-600">
          In case of any life-threatening emergency, please call
        </p>

        <div className="bg-red-50 border border-red-200 text-red-600 font-bold px-4 py-2 rounded-lg flex items-center gap-2">
          <i className="bi bi-telephone-fill"></i>
          112
        </div>

      </div>

    </div>
  );
};