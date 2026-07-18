import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Additionalinfo = () => {
  const navigate = useNavigate();

  // Load members from sessionStorage
  const [members, setMembers] = useState(() => {
    const saved = sessionStorage.getItem("additionalInfo");
    return saved ? JSON.parse(saved) : [{ name: "", relation: "" }];
  });

  // Load total from sessionStorage
  const [total, setTotal] = useState(() => {
    const saved = sessionStorage.getItem("additionalTotal");
    return saved ? JSON.parse(saved) : 1;
  });

  // ➕ Add member
  const plus = (e) => {
    e.preventDefault();

    const newTotal = total + 1;
    const updated = [...members, { name: "", relation: "" }];

    setTotal(newTotal);
    setMembers(updated);

    sessionStorage.setItem("additionalInfo", JSON.stringify(updated));
    sessionStorage.setItem("additionalTotal", JSON.stringify(newTotal));
  };

  // ➖ Remove member
  const minus = (e) => {
    e.preventDefault();

    if (total > 1) {
      const newTotal = total - 1;
      const updated = members.slice(0, -1);

      setTotal(newTotal);
      setMembers(updated);

      sessionStorage.setItem("additionalInfo", JSON.stringify(updated));
      sessionStorage.setItem("additionalTotal", JSON.stringify(newTotal));
    }
  };

  // 📝 Update input
  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;

    setMembers(updated);
    sessionStorage.setItem("additionalInfo", JSON.stringify(updated));
  };

  // 🚀 Next step
  const handleNext = () => {
    navigate("/register/verification");
  };

  return (
    <div className="w-full">
      <form className="w-full min-h-[900px] bg-white shadow-lg rounded-xl p-8 flex flex-col">

        {/* Title */}
        <h1 className="flex items-center gap-3 text-3xl font-bold mb-6">
          <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg">
            3
          </span>
          Family Details
        </h1>

        <div className="w-full max-w-[90%]">

          {/* Counter */}
          <div className="mb-8 flex flex-col items-center">
            <label className="block mb-4 text-lg font-semibold">
              No. of Family Members
            </label>

            <div className="flex items-center gap-6">
              <button
                onClick={minus}
                className="w-12 h-12 bg-gray-200 rounded-lg text-2xl font-bold"
              >
                -
              </button>

              <span className="text-2xl font-bold">{total}</span>

              <button
                onClick={plus}
                className="w-12 h-12 bg-blue-600 text-white rounded-lg text-2xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Members */}
          <div className="space-y-6">
            {members.map((member, index) => (
              <div key={index} className="border p-5 rounded-lg">

                <h3 className="text-lg font-semibold mb-4">
                  Family Member {index + 1}
                </h3>

                {/* Name */}
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    placeholder="Enter Name"
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                {/* Relation */}
                <div>
                  <label className="block mb-2 font-medium">
                    Relation
                  </label>

                  <select
                    value={member.relation}
                    onChange={(e) =>
                      handleChange(index, "relation", e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                  >
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
            ))}
          </div>

          {/* Add Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={plus}
              className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg"
            >
              + Add Another Member
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-8 mt-8">

            <button
              type="button"
              onClick={() => navigate("/register/societyinfo")}
              className="border px-8 py-3 rounded-lg"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg"
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