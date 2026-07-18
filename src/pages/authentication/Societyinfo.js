import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Societyinfo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    const savedData = sessionStorage.getItem("societyInfo");

    return savedData
      ? JSON.parse(savedData)
      : {
          societyName: "",
          towerWing: "",
          flatNumber: "",
          residentType: "",
        };
  });

  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm);

    sessionStorage.setItem(
      "societyInfo",
      JSON.stringify(updatedForm)
    );
  };

  return (
    <div className="w-full">
      <form className="w-full h-[900px] bg-white shadow-lg rounded-xl p-8 flex flex-col">
        <h1 className="flex items-center gap-3 text-3xl font-bold mb-6">
          <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
            2
          </span>
          Society Information
        </h1>

        <div className="flex-1 flex flex-col">
          <div className="space-y-4 w-full max-w-[90%]">
            
            {/* Society Name */}
            <div>
              <label className="block mb-2 font-medium">
                Society Name
              </label>

              <div className="relative">
                <i className="bi bi-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="text"
                  name="societyName"
                  value={form.societyName}
                  onChange={handleChange}
                  placeholder="Enter Society Name"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Tower/Wing */}
            <div>
              <label className="block mb-2 font-medium">
                Tower / Wing
              </label>

              <div className="relative">
                <i className="bi bi-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <select
                  name="towerWing"
                  value={form.towerWing}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Tower/Wing</option>
                  <option value="A">A Wing</option>
                  <option value="B">B Wing</option>
                  <option value="C">C Wing</option>
                  <option value="D">D Wing</option>
                  <option value="E">E Wing</option>
                  <option value="F">F Wing</option>
                  <option value="G">G Wing</option>
                  <option value="H">H Wing</option>
                </select>
              </div>
            </div>

            {/* Flat Number */}
            <div>
              <label className="block mb-2 font-medium">
                Flat / House Number
              </label>

              <div className="relative">
                <i className="bi bi-house-door absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

                <input
                  type="text"
                  name="flatNumber"
                  value={form.flatNumber}
                  onChange={handleChange}
                  placeholder="Enter Flat / House Number"
                  className="w-full border border-gray-300 rounded-lg pl-12 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Resident Type */}
            <div>
              <label className="block mb-3 font-medium">
                Resident Type
              </label>

              <div className="flex gap-8">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="residentType"
                    value="Owner"
                    checked={form.residentType === "Owner"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Owner
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="residentType"
                    value="Tenant"
                    checked={form.residentType === "Tenant"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Tenant
                </label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-auto flex justify-between pt-8">
            <button
              type="button"
              onClick={() => navigate("/register/personalinfo")}
              className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem(
                  "societyInfo",
                  JSON.stringify(form)
                );

                navigate("/register/additionalinfo");
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Societyinfo;