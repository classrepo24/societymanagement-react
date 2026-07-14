import React, { useState } from "react";
import StaffProfileCard from "./StaffProfileCard";
import StaffTabs from "./StaffTabs";
import AboutCard from "./AboutCard";
import WorkInfoCard from "./WorkInfoCard";
import AccountInfoCard from "./AccountInfoCard";
import { useParams } from "react-router-dom";
import staffData from "../../../data/staff.json";
import { useLocation, useNavigate } from "react-router-dom";

const StaffProfile = () => {
    const [activeTab, setActiveTab] = useState("Overview");


    const Navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [isEditing, setIsEditing] = useState(
        location.state?.editMode || false
    );
    const selectedStaff = staffData.staff.find(
        (item) => item.id === id
    );



    const [staff, setStaff] = useState(() => {
        if (!selectedStaff) return null;

        return {
            ...selectedStaff,

            gender: "Male",
            dob: "15 Aug 1988",
            address: "B-102, Green View Apartments",

            email: `${selectedStaff.name
                .toLowerCase()
                .replace(/\s/g, ".")}@society.com`,

            username: selectedStaff.name
                .toLowerCase()
                .replace(/\s/g, ""),

            password: "********",
            lastLogin: "Today, 10:30 AM",
            employmentType: "Full Time",
            shift: "Morning",
            reporting: "Ramesh Sharma",
        };
    });

    if (!staff) {
        return <h2 className="p-6"></h2>;
    }
    const handleChange = (field, value) => {
        setStaff((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500">
                <button onClick={() => Navigate("/dashboard")}> Dashboard </button>/
                <span className="text-sm text-gray-500"><button onClick={() => Navigate("/staff")}>Staff</button></span> /
                <span className="font-bold text-black">
                    {" "}
                    Staff Profile
                </span>
            </p>

            {/* Header */}
            <div className="flex justify-between items-center mt-2 mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Staff Profile</h1>

                    <p className="text-gray-500 mt-1">
                        View staff details and information.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => Navigate("/staff")}
                        className="border rounded-lg px-5 py-2 hover:bg-gray-100 text-sm "
                    >
                        ← Back to Staff
                    </button>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`rounded-lg px-5 py-2 text-sm  text-white ${isEditing ? "bg-green-600" : "bg-blue-600"
                            }`}
                    >
                        {isEditing ? (
                            "Save Profile"
                        ) : (
                            <>
                                <i className="bi bi-pencil-square mr-2"></i>
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6">

                {/* Left Profile */}
                <div className="col-span-12 lg:col-span-3">
                    <StaffProfileCard staff={staff}
                        isEditing={isEditing}
                        handleChange={handleChange}
                    />
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-9">

                    <StaffTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        id={id}
                    />

                    <div className="grid grid-cols-12 gap-6 mt-6">

                        {/* About */}
                        <div className="col-span-12 lg:col-span-6">
                            <AboutCard staff={staff}
                                isEditing={isEditing}
                                handleChange={handleChange}
                            />

                        </div>

                        {/* Work + Account */}
                        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">

                            <div className="flex-1">
                                <WorkInfoCard staff={staff}
                                    isEditing={isEditing}
                                    handleChange={handleChange} />
                            </div>

                            <div className="flex-1">
                                <AccountInfoCard staff={staff}
                                    isEditing={isEditing}
                                    handleChange={handleChange} />
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </div>

    );
};

export default StaffProfile;