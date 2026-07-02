import React, { useState } from "react";

export const AddMemberPopup = ({
  onClose,
  onAddMember,
}) => {
  const [member, setMember] = useState({
    name: "",
    role: "",
    type: "",
    contact: "",
    email: "",
    status: "Active",
    joinDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddMember({
      id: Date.now(),
      image: "https://i.pravatar.cc/150?img=10",
      ...member,
    });

    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 outline-none";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Add Society Member
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Full Name"
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Role"
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  role: e.target.value,
                })
              }
            />

            <select
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  type: e.target.value,
                })
              }
            >
              <option value="">
                Select Member Type
              </option>

              <option value="Committee Member">
                Committee Member
              </option>

              <option value="General Member">
                General Member
              </option>
            </select>

            <input
              type="text"
              placeholder="Contact Number"
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  contact: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  email: e.target.value,
                })
              }
            />

            <select
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  status: e.target.value,
                })
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <input
              type="date"
              className={inputClass}
              onChange={(e) =>
                setMember({
                  ...member,
                  joinDate: e.target.value,
                })
              }
            />

          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};