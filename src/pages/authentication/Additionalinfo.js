import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Additionalinfo = () => {
  const navigate = useNavigate();

  const [total, setTotal] = useState(1);

  const [members, setMembers] = useState([
    { name: "", relation: "" },
  ]);

  const minus = (e) => {
    e.preventDefault();

    if (total > 1) {
      setTotal(total - 1);
      setMembers(members.slice(0, -1));
    }
  };

  const plus = (e) => {
    e.preventDefault();

    setTotal(total + 1);
    setMembers([
      ...members,
      { name: "", relation: "" },
    ]);
  };

  return (
    <div className="w-full">
      <form className="w-full min-h-[900px] bg-white shadow-lg rounded-xl p-8 flex flex-col">
          <h1 className="flex items-center gap-3 text-3xl font-bold mb-6">
         <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
           3
          </span>
         Family Details
         </h1>

        <div className="w-full max-w-[90%]">
          {/* Total Members */}
          <div className="mb-8 flex flex-col items-center">
            <label className="block mb-4 text-lg font-semibold text-center">
              No. of Family Members
            </label>

            <div className="w-full max-w-md flex items-center justify-center gap-6">
              <button
                onClick={minus}
                className="w-12 h-12 bg-gray-200 rounded-lg text-2xl font-bold hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-2xl font-bold min-w-[40px] text-center">
                {total}
              </span>

              <button
                onClick={plus}
                className="w-12 h-12 bg-blue-600 text-white rounded-lg text-2xl font-bold hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Family Members */}
          <div className="space-y-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Family Member {index + 1}
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Relation */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Relation
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Relation</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Member Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={plus}
              className="w-full bg-white text-blue-600 border border-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              + Add Another Member
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8">
            <button
              type="button"
              onClick={() => navigate("/register/societyinfo")}
              className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={() => navigate("/register/verification")}
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

export default Additionalinfo;