import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PreRegisterVisitorModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    idProofType: "",
    idProofNumber: "",
    vehicleNo: "",
    visitorsCount: "",
    whomToVisit: "",
    flatNo: "",
    purpose: "",
    arrivalDate: "",
    arrivalTime: "",
    outTime: "",
    remarks: "",
  });

  const navigate = useNavigate();

const handleClose = () => {
  navigate("/visitors");
};

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Visitor Information
    if (!formData.name.trim())
      newErrors.name = "Full Name is required";

    if (!formData.mobile.trim())
      newErrors.mobile = "Mobile Number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10 digit mobile number";


    if (!formData.idProofType)
      newErrors.idProofType = "Select ID Proof Type";

    if (!formData.idProofNumber?.trim())
      newErrors.idProofNumber = "ID Proof Number is required";

    if (!formData.visitorsCount)
      newErrors.visitorsCount = "Number of visitors is required";

    // Visit Details
    if (!formData.whomToVisit)
      newErrors.whomToVisit = "Select Resident";

    if (!formData.flatNo)
      newErrors.flatNo = "Flat / Wing is required";

    if (!formData.purpose)
      newErrors.purpose = "Select Purpose";

    if (!formData.arrivalDate)
      newErrors.arrivalDate = "Visit Date is required";

    if (!formData.arrivalTime)
      newErrors.arrivalTime = "In Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log({
      ...formData,
      status: "preRegistered",
    });

    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center  justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full overflow-y-auto max-w-3xl h-[95vh] p-4 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Pre-Register Visitor
          </h2>

          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between mt-2"
        >

          <div>

            {/* SECTION 1 */}
            <div className="mb-3">
              <h3 className="text-blue-600 font-semibold mb-2">
                1. Visitor Information
              </h3>

              <div className="grid grid-cols-3 gap-3">

                <div>
                  <label className="block text-sm mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.name ? "border-red-500" : ""
                      }`}
                    placeholder="Enter mobile number"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.mobile ? "border-red-500" : ""
                      }`}
                    placeholder="Enter mobile number"
                  />

                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Email(Optional)
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Company / Organization(Optional)
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    ID Proof Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.idProofType ? "border-red-500" : ""
                      }`}

                  >
                    <option value="">Select ID type</option>
                    <option>Aadhar</option>
                    <option>PAN</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                  </select>

                  {errors.idProofType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.idProofType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    ID Proof Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.idProofNumber ? "border-red-500" : ""
                      }`}
                    placeholder="Enter ID number"
                  />

                  {errors.idProofNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.idProofNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Vehicle Number(optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Vehicle Number"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Number of visitors <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="visitorsCount"
                    value={formData.visitorsCount}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.visitorsCount ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>

                  {errors.visitorsCount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.visitorsCount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Upload ID Proof(Optional)
                  </label>

                  <input
                    type="file"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <p className=" text-gray-500 text-[12px] ml-6">JPG,PNG,PDF up to 2MB</p>
                </div>

              </div>
            </div>

            {/* SECTION 2 */}
            <div className="border-t pt-4 mb-3">
              <h3 className="text-blue-600 font-semibold mb-3">
                2. Visit Details
              </h3>

              <div className="grid grid-cols-3 gap-2">

                <div>
                  <label className="block text-sm mb-1">
                    Whom To Visit <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="whomToVisit"
                    value={formData.whomToVisit}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.whomToVisit ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select Resident</option>
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                    <option value="d">d</option>

                  </select>

                  {errors.whomToVisit && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whomToVisit}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Flat / Wing <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="flatNo"
                    value={formData.flatNo}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.flatNo ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select Flat</option>
                    <option value="a">a-1</option>
                    <option value="b">b-1</option>
                    <option value="c">c-1</option>
                  </select>

                  {errors.flatNo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.flatNo}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Purpose of Visit<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.purpose ? "border-red-500" : ""
                      }`}
                  >
                    <option value="">Select Purpose</option>
                    <option>Personal</option>
                    <option>Delivery</option>
                    <option>Service</option>

                    <option>Meeting</option>
                    <option>Guest</option>
                  </select>

                  {errors.purpose && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.purpose}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Visit Date. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.arrivalDate ? "border-red-500" : ""
                      }`}
                  />

                  {errors.arrivalDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.arrivalDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Expected In Time  <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 ${errors.arrivalTime ? "border-red-500" : ""
                      }`}
                  />

                  {errors.arrivalTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.arrivalTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Expected Out Time(Optional)
                  </label>
                  <input
                    type="time"
                    name="outTime"
                    value={formData.outTime}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />


                </div>

              </div>

              <div className="mt-2">
                <label className="block text-sm mb-1">
                  Additional Notes(Optional)
                </label>

                <textarea
                  rows="1"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter any Additional notes"
                />
              </div>
            </div>

            {/* ================= SECTION 3 ================= */}
            <div className="border-t pt-3">
              <h3 className="text-blue-600 font-semibold mb-3">
                3. Notifications & Approval
              </h3>

              <div className="grid grid-cols-2 gap-4">

                {/* Notify Resident */}
                <div className=" rounded-lg px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      Notify Resident
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Send notification to the resident
                  </p>
                </div>

                {/* Notify Security */}
                <div className=" rounded-lg ">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      Notify Security
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Send notification to security
                  </p>
                </div>

                {/* Auto Approve */}
                <div className="rounded-lg p-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">
                      Auto Approve
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Visitor will be auto approved by security at gate
                  </p>
                </div>

                {/* Validity */}
                <div className=" rounded-lg  ">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Validity
                  </label>

                  <select className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option>Selected Date & Time</option>
                    <option>1 Day</option>
                    <option>3 Days</option>
                    <option>1 Week</option>
                  </select>


                </div>

              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2 pt-2 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Pre-Register Visitor
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PreRegisterVisitorModal;