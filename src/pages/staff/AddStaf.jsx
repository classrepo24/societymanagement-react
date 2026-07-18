import { useDispatch, useSelector } from "react-redux";
import { addStaff } from "../../redux/staffSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../component/Breadcrumb";

const AddStaf = () => {

    const dispatch = useDispatch();
const staffs = useSelector((state) => state.staff.staffs);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("staffForm");
        return savedData
            ? JSON.parse(savedData)
            : {
                fullName: "",
                employeeId: "",
                dob: "",
                aadhar: "",
                gender: "",
                address: "",
                department: "",
                designation: "",
                reportingTo: "",
                joiningDate: "",
                employmentType: "",
                workShift: "",
                basicSalary: "",
                allowances: "",
                notes: "",
                mobile: "",
                email: "",
                whatsapp: "",
                landline: "",
                role: "",
                loginAccess: "",
                status: "Active",
                emergencyName: "",
                relationship: "",
                emergencyMobile: "",
                profilePhotoName: "",
                staffId: "",
                bloodGroup: "",
                maritalStatus: "",
                nationality: "",
                languagesKnown: "",
                probationPeriod: "",
                weeklyOff: "",
                location: "",
                accessLevel: "",
            };
    });

    useEffect(() => {
        localStorage.setItem("staffForm", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
    //validation
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!formData.fullName.trim())
            newErrors.fullName = "Full Name is required";

        if (!formData.employeeId.trim())
            newErrors.employeeId = "Employee ID is required";

        if (!formData.mobile.match(/^[6-9]\d{9}$/))
            newErrors.mobile = "Enter valid mobile number";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter valid email address";
        }

        if (!formData.department)
            newErrors.department = "Department required";

        if (!formData.designation)
            newErrors.designation = "Designation required";

        if (!formData.role)
            newErrors.role = "Role required";

        if (!formData.emergencyMobile.match(/^[6-9]\d{9}$/))
            newErrors.emergencyMobile =
                "Invalid emergency mobile";
        if (!formData.dob)
            newErrors.dob = "Date of Birth is required";

        if (!formData.gender)
            newErrors.gender = "Gender is required";

        if (!formData.address.trim())
            newErrors.address = "Address is required";

        if (!formData.joiningDate)
            newErrors.joiningDate = "Joining Date is required";

        if (!formData.employmentType)
            newErrors.employmentType = "Employment Type is required";

        if (!formData.basicSalary.trim())
            newErrors.basicSalary = "Basic Salary is required";

        if (!formData.loginAccess)
            newErrors.loginAccess = "Login Access is required";

        if (!formData.status)
            newErrors.status = "Status is required";

        if (!formData.emergencyName.trim())
            newErrors.emergencyName = "Emergency Contact Name is required";

        if (!formData.relationship.trim())
            newErrors.relationship = "Relationship is required";

        setErrors(newErrors);
        console.log(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    //form submit
    const handleSubmit = () => {
        console.log("Save button clicked");

        if (!validate()) {
            console.log("Validation Failed");
            return;
        }

        console.log("Validation Passed");

        // Check duplicate Employee ID
        const exists = staffs.some(
  (staff) =>
    staff.id.toLowerCase() === formData.employeeId.toLowerCase()
);

if (exists) {
  setErrors((prev) => ({
    ...prev,
    employeeId: "Employee ID already exists",
  }));
  return;
}

const newStaff = {
  id: formData.employeeId,
  name: formData.fullName,
  role: formData.designation || formData.role,
  department: formData.department,
  phone: `+91 ${formData.mobile}`,
  status: formData.status,
  joiningDate: new Date(formData.joiningDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ),

  email: formData.email,
  profilePhoto: formData.profilePhoto || "",
  dob: formData.dob,
  gender: formData.gender,
  address: formData.address,
  employmentType: formData.employmentType,
  basicSalary: formData.basicSalary,
  emergencyName: formData.emergencyName,
  emergencyMobile: formData.emergencyMobile,
  relationship: formData.relationship,
  designation: formData.designation,
  reportingTo: formData.reportingTo,
  workShift: formData.workShift,
  accessLevel: formData.accessLevel,
};
dispatch(addStaff(newStaff));

        localStorage.removeItem("staffForm");
        setErrors({});

        setShowSuccess(true);

        setTimeout(() => {
            navigate("/staff");
        }, 2500);
    };

    // image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({
                ...formData,
                profilePhoto: reader.result,
                profilePhotoName: file.name,
            });
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Staff", path: "/staff" },
                    { label: "Add Staff" },
                ]}
            />

            {/* Title */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-[#0B1F66]">
                        Add Staff
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill in the details below to add a new staff member.
                    </p>
                </div>

                <button onClick={() => navigate("/staff")} className="border border-gray-300 rounded-lg px-5 py-2 hover:bg-gray-100">
                    ← Back to Staff List
                </button>
            </div>

            {/* Main Layout */}

            <div className="grid grid-cols-12 gap-6 items-stretch">
                {/* LEFT */}

                <div className="col-span-8 flex flex-col gap-6 h-full">
                    {/* Personal Information */}

                    <div className="bg-white rounded-xl border p-6">
                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div>
                                <label className="text-sm font-medium">
                                    Full Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full mt-2 border rounded-lg px-4 py-3"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Employee ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    placeholder="Enter employee ID"
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
                                />
                                {errors.employeeId && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.employeeId}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Date of Birth<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
                                />
                                {errors.dob && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.dob}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Aadhar Number</label>
                                <input
                                    type="text"
                                    name="aadhar"
                                    value={formData.aadhar}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhar Number"
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
                                />
                            </div>
                            {/* Blood Group */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"

                                >
                                    <option value="">Select Blood Group</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>

                            {/* Marital Status */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Marital Status</label>
                                <select
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"

                                >
                                    <option value="">Select Status</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </select>
                            </div>

                            {/* Nationality */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Nationality</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"

                                    placeholder="Enter Nationality"
                                />
                            </div>

                            {/* Languages Known */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Languages Known</label>
                                <input
                                    type="text"
                                    name="languagesKnown"
                                    value={formData.languagesKnown}
                                    onChange={handleChange}
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"

                                    placeholder="e.g. English, Hindi, Marathi"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>

                                <div className="flex gap-8 mt-2">

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={formData.gender === "Male"}
                                            onChange={handleChange}
                                        />
                                        Male
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={formData.gender === "Female"}
                                            onChange={handleChange}
                                        />
                                        Female
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Other"
                                            checked={formData.gender === "Other"}
                                            onChange={handleChange}
                                        />
                                        Other
                                    </label>

                                </div>
                                {errors.gender && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Address <span className="text-red-500">*</span>

                                </label>

                                <textarea
                                    rows="3"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter Full Address"
                                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>



                            <div className="-mt-20">
                                <label className="block text-sm font-medium mb-2">
                                    Profile Photo
                                </label>

                                <div className="border-2 border-dashed rounded-lg h-[180px] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />

                                    {formData.profilePhoto ? (
                                        <img
                                            src={formData.profilePhoto}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="text-5xl">
                                                <i className="bi bi-cloud-arrow-up"></i>
                                            </div>

                                            <p className="font-semibold mt-2">Upload Photo</p>

                                            <p className="text-gray-500 text-sm">
                                                JPG, PNG up to 2MB
                                            </p>
                                        </>
                                    )}

                                </div>
                                {formData.profilePhoto && (
                                    <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={formData.profilePhoto}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />

                                            <span className="text-sm text-gray-700">
                                                {formData.profilePhotoName}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    profilePhoto: "",
                                                    profilePhotoName: "",
                                                })
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>

                    {/* Job Information */}
                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            Job Information
                        </h2>

                        <div className="grid grid-cols-3 gap-6">

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >

                                    <option value="">Select Department</option>
                                    <option>HR</option>
                                    <option>Security</option>
                                    <option>Accounts</option>
                                </select>
                                {errors.department && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.department}
                                    </p>
                                )}
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Designation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >

                                    <option value="">Select Designation</option>
                                    <option>Housekeeping</option>
                                    <option>Security Guard</option>
                                </select>
                                {errors.designation && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.designation}
                                    </p>
                                )}
                            </div>

                            {/* Reporting To */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Reporting To
                                </label>
                                <select
                                    name="reportingTo"
                                    value={formData.reportingTo}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="">Select Reporting Manager</option>
                                    <option>Society Manager</option>
                                    <option>HR Manager</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            {/* Date of Joining */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Date of Joining <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                                {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}

                            </div>

                            {/* Employment Type */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Employment Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="">Select Employment Type</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Internship">Internship</option>
                                </select>
                                {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>}

                            </div>

                            {/* Work Shift */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Work Shift
                                </label>
                                <select
                                    name="workShift"
                                    value={formData.workShift}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="">Select Work Shift</option>
                                    <option>Morning</option>
                                    <option>Evening</option>
                                    <option>Night</option>
                                    <option>General</option>
                                </select>
                            </div>
                            {/* Probation Period */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Probation Period</label>
                                <input
                                    type="text"
                                    name="probationPeriod"
                                    value={formData.probationPeriod}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="e.g. 3 Months"
                                />
                            </div>

                            {/* Weekly Off */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Weekly Off</label>
                                <select
                                    name="weeklyOff"
                                    value={formData.weeklyOff}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"

                                >
                                    <option value="">Select Day</option>
                                    <option>Sunday</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Enter Work Location"
                                />
                            </div>

                            {/* Basic Salary */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Basic Salary()<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="basicSalary"
                                    value={formData.basicSalary}
                                    onChange={handleChange}
                                    placeholder="Enter Basic Salary"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                                {errors.basicSalary && <p className="text-red-500 text-sm mt-1">{errors.basicSalary}</p>}

                            </div>

                            {/* Allowances */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Additional Allowances()
                                </label>
                                <input
                                    type="text"
                                    name="allowances"
                                    value={formData.allowances}
                                    onChange={handleChange}
                                    placeholder="Enter allowances (if any)"
                                    className="w-full border rounded-lg px-4 py-3"
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Notes(optional)
                                </label>
                                <textarea
                                    rows="4"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Enter any Additional Notes"
                                    className="w-full border rounded-lg px-4 py-3 resize-none"
                                />
                            </div>



                            {/* Access Level */}
                            <div className="-mt-20">
                                <label className="block text-sm font-medium mb-2">Access Level</label>
                                <select
                                    name="accessLevel"
                                    value={formData.accessLevel}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="">Select Access</option>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Supervisor</option>
                                    <option>Staff</option>
                                    <option>Security</option>
                                </select>
                            </div>

                        </div>

                    </div>
                </div>

                {/* RIGHT */}

                <div className="col-span-4 flex flex-col gap-5 h-full">
                    {/* Contact */}
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            Contact Information
                        </h2>

                        <div className="space-y-5">

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>

                                <div className="flex">
                                    <select className="w-24 border border-r-0 rounded-l-lg px-2 py-3 outline-none">
                                        <option>+91</option>

                                    </select>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter 10 digit mobile number"
                                        className="flex-1 border rounded-r-lg px-4 py-3 outline-none"
                                    />

                                </div>
                                {errors.mobile && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.mobile}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    WhatsApp Number
                                </label>

                                <div className="flex">
                                    <select className="w-24 border border-r-0 rounded-l-lg px-2 py-3 outline-none">
                                        <option>+91</option>
                                    </select>

                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        placeholder="Enter WhatsApp number (optional)"
                                        className="flex-1 border rounded-r-lg px-4 py-3 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Landline */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Landline Number(optional)
                                </label>

                                <input
                                    type="text"
                                    name="landline"
                                    value={formData.landline}
                                    onChange={handleChange}
                                    placeholder="Enter landline number"
                                    className="w-full border rounded-lg px-4 py-3 outline-none"
                                />
                            </div>

                        </div>

                    </div>
                    {/* Access */}

                    {/* Access & Role */}
                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            Access & Role
                        </h2>

                        <div className="space-y-6">

                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-6">

                                {/* User Role */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        User Role <span className="text-red-500">*</span>
                                    </label>

                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-4 py-3"
                                    >

                                        <option value="">Select User Role</option>
                                        <option>Admin</option>
                                        <option>Manager</option>
                                        <option>Security</option>
                                        <option>Staff</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                {/* Login Access */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Login Access<span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex items-center gap-4 h-[50px]">
                                        <label className="flex items-center mt-4 gap-2">
                                            <input
                                                type="radio"
                                                name="loginAccess"
                                                value="Allow"
                                                checked={formData.loginAccess === "Allow"}
                                                onChange={handleChange}
                                            />
                                            Allow System Login
                                        </label>

                                        <label className="flex items-center mt-4 gap-2">
                                            <input
                                                type="radio"
                                                name="loginAccess"
                                                value="Deny"
                                                checked={formData.loginAccess === "Deny"}
                                                onChange={handleChange}
                                            />
                                            Deny system login
                                        </label>
                                    </div>
                                    {errors.loginAccess && (
                                        <p className="text-red-500 text-sm ml-5 mt-6">
                                            {errors.loginAccess}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Status<span className="text-red-500">*</span>
                                </label>

                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Active"
                                            checked={formData.status === "Active"}
                                            onChange={handleChange}
                                        />
                                        Active
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="status"
                                            value="Inactive"
                                            checked={formData.status === "Inactive"}
                                            onChange={handleChange}
                                        />
                                        Inactive
                                    </label>
                                </div>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>
                    {/* Emergency */}

                    {/* Emergency Contact */}
                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            Emergency Contact
                        </h2>

                        <div className="space-y-6">

                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Emergency Contact Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyName"
                                        value={formData.emergencyName}
                                       onChange={handleChange}
                                        placeholder="Enter emergency contact name"
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                    {errors.emergencyName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.emergencyName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Relationship <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleChange}
                                        placeholder="Enter Relationship"
                                        className="w-full border rounded-lg px-4 py-3"
                                    />
                                    {errors.relationship && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.relationship}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Emergency Contact Number <span className="text-red-500">*</span>
                                </label>

                                <div className="flex">
                                    <select className="w-24 border border-r-0 rounded-l-lg px-2 py-3 outline-none">
                                        <option>+91</option>
                                    </select>

                                    <input
                                        type="tel"
                                        name="emergencyMobile"
                                        value={formData.emergencyMobile}
                                        onChange={handleChange}
                                        placeholder="Enter 10 digit mobile number"
                                        className="flex-1 border rounded-r-lg px-4 py-3"
                                    />

                                </div>
                                {errors.emergencyMobile && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.emergencyMobile}
                                    </p>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}

            <div className="flex justify-end gap-4 -mt-20">

                <button onClick={() => navigate("/staff")} className="border hover:bg-gray-200 border-gray-300 px-8 py-3 rounded-lg">
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
                >
                    <i className="bi bi-save"></i> Save Staff
                </button>

            </div>

            {showSuccess && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl text-center">

            <div className="text-green-600 text-5xl mb-3">
                <i className="bi bi-check-circle-fill"></i>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
                Staff Added Successfully
            </h2>

            <p className="text-gray-500 mt-2">
                New staff member has been added.
            </p>

            <button
                onClick={() => navigate("/staff")}
                className="mt-5 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
                OK
            </button>

        </div>

    </div>
)}

        </div>
        
    );
};

export default AddStaf;