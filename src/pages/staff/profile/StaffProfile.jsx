import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Breadcrumb from "../../../component/Breadcrumb";
import StaffProfileCard from "./StaffProfileCard";
import StaffTabs from "./StaffTabs";
import AboutCard from "./AboutCard";
import WorkInfoCard from "./WorkInfoCard";
import AccountInfoCard from "./AccountInfoCard";

const StaffProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("Overview");

  const staffs = useSelector((state) => state.staff.staffs);

  const selectedStaff = staffs.find(
    (item) => String(item.id) === String(id)
  );

  const [isEditing, setIsEditing] = useState(
    location.state?.editMode || false
  );

  const [staff, setStaff] = useState(null);

  useEffect(() => {
    if (!selectedStaff) return;

    setStaff({
      ...selectedStaff,

      gender: selectedStaff.gender || "Male",
      dob: selectedStaff.dob || "1988-08-15",
      address:
        selectedStaff.address || "B-102, Green View Apartments",

      email:
        selectedStaff.email ||
        `${selectedStaff.name
          .toLowerCase()
          .replace(/\s/g, ".")}@society.com`,

      username:
        selectedStaff.username ||
        selectedStaff.name
          .toLowerCase()
          .replace(/\s/g, ""),

      password: selectedStaff.password || "********",
      lastLogin: selectedStaff.lastLogin || "Today, 10:30 AM",
      employmentType:
        selectedStaff.employmentType || "Full Time",
      shift: selectedStaff.shift || "Morning",
      reporting:
        selectedStaff.reporting || "Ramesh Sharma",
    });
  }, [selectedStaff]);

  if (!selectedStaff) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Staff not found
        </h2>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  const handleChange = (field, value) => {
    setStaff((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Staff", path: "/staff" },
          { label: "Staff Profile" },
        ]}
      />

      <div className="flex justify-between items-center mt-2 mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Staff Profile
          </h1>

          <p className="text-gray-500 mt-1">
            View staff details and information.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/staff")}
            className="border rounded-lg px-5 py-2 hover:bg-gray-100 text-sm"
          >
            ← Back to Staff
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`rounded-lg px-5 py-2 text-white ${
              isEditing
                ? "bg-green-600"
                : "bg-blue-600"
            }`}
          >
            {isEditing
              ? "Save Profile"
              : "Edit Profile"}
          </button>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-3">
          <StaffProfileCard
            staff={staff}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        </div>

        <div className="col-span-12 lg:col-span-9">

          <StaffTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id={id}
          />

          <div className="grid grid-cols-12 gap-6 mt-6">

            <div className="col-span-12 lg:col-span-6">
              <AboutCard
                staff={staff}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            </div>

            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">

              <WorkInfoCard
                staff={staff}
                isEditing={isEditing}
                handleChange={handleChange}
              />

              <AccountInfoCard
                staff={staff}
                isEditing={isEditing}
                handleChange={handleChange}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default StaffProfile;