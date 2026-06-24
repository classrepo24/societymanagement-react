import React, { useState } from "react";

const PreRegisterVisitorModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    flatNo: "",
    purpose: "",
    vehicleNo: "",
    arrivalDate: "",
    arrivalTime: "",
    visitorsCount: "",
    remarks: "",
  });

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

    if (!formData.name.trim()) {
      newErrors.name = "Visitor name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.flatNo.trim()) {
      newErrors.flatNo = "Flat number is required";
    }

    if (!formData.purpose) {
      newErrors.purpose = "Please select a purpose";
    }

    if (!formData.arrivalDate) {
      newErrors.arrivalDate = "Arrival date is required";
    }

    if (!formData.arrivalTime) {
      newErrors.arrivalTime = "Arrival time is required";
    }

    if (!formData.visitorsCount) {
      newErrors.visitorsCount = "Number of visitors is required";
    }

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Pre Register Visitor
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-1">
                Visitor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter Visitor Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.mobile ? "border-red-500" : ""
                }`}
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter Email Address"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Flat No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.flatNo ? "border-red-500" : ""
                }`}
                placeholder="Enter Flat Number"
              />
              {errors.flatNo && (
                <p className="text-red-500 text-xs mt-1">{errors.flatNo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Purpose <span className="text-red-500">*</span>
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.purpose ? "border-red-500" : ""
                }`}
              >
                <option value="">Select Purpose</option>
                <option value="Personal">Personal</option>
                <option value="Guest">Guest</option>
                <option value="Delivery">Delivery</option>
                <option value="Service">Service</option>
                <option value="Meeting">Meeting</option>
                <option value="Others">Others</option>
              </select>
              {errors.purpose && (
                <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Enter Vehicle Number"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Arrival Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.arrivalDate ? "border-red-500" : ""
                }`}
              />
              {errors.arrivalDate && (
                <p className="text-red-500 text-xs mt-1">{errors.arrivalDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Arrival Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.arrivalTime ? "border-red-500" : ""
                }`}
              />
              {errors.arrivalTime && (
                <p className="text-red-500 text-xs mt-1">{errors.arrivalTime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Number of Visitors <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                name="visitorsCount"
                value={formData.visitorsCount}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${
                  errors.visitorsCount ? "border-red-500" : ""
                }`}
                placeholder="Enter Count"
              />
              {errors.visitorsCount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.visitorsCount}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm mb-1">
                Remarks
              </label>
              <textarea
                name="remarks"
                rows="3"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Additional Notes"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Pre Register Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreRegisterVisitorModal;