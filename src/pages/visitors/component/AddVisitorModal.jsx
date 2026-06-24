import React, { useState } from "react";

const AddVisitorModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    purpose: "",
    flatNo: "",
    vehicleNo: "",
    expectedTime: "",
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

    if (!formData.vehicleNo.trim()) {
      newErrors.vehicleNo = "Vehicle number is required";
    }

    if (!formData.expectedTime) {
      newErrors.expectedTime = "Expected exit time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Add New Visitor
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
            {/* Visitor Name */}
            <div>
              <label className="block text-sm mb-1">
                Visitor Name{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Visitor Name"
                className={`w-full border rounded-lg p-2 ${errors.name ? "border-red-500" : ""
                  }`}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm mb-1">
                Mobile Number{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className={`w-full border rounded-lg p-2 ${errors.mobile ? "border-red-500" : ""
                  }`}
              />

              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Flat No */}
            <div>
              <label className="block text-sm mb-1">
                Flat No{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleChange}
                placeholder="Enter Flat Number"
                className={`w-full border rounded-lg p-2 ${errors.flatNo ? "border-red-500" : ""
                  }`}
              />

              {errors.flatNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.flatNo}
                </p>
              )}
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm mb-1">
                Purpose{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${errors.purpose ? "border-red-500" : ""
                  }`}
              >
                <option value="">Select Purpose</option>
                <option value="Personal">Personal</option>
                <option value="Delivery">Delivery</option>
                <option value="Service">Service</option>
                <option value="Meeting">Meeting</option>
                <option value="Others">Others</option>
              </select>

              {errors.purpose && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purpose}
                </p>
              )}
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block text-sm mb-1">
                Vehicle Number{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                placeholder="Enter Vehicle Number"
                className={`w-full border rounded-lg p-2 ${errors.vehicleNo ? "border-red-500" : ""
                  }`}
              />

              {errors.vehicleNo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.vehicleNo}
                </p>
              )}
            </div>

            {/* Expected Exit Time */}
            <div>
              <label className="block text-sm mb-1">
                Expected Exit Time{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="datetime-local"
                name="expectedTime"
                value={formData.expectedTime}
                onChange={handleChange}
                className={`w-full border rounded-lg p-2 ${errors.expectedTime
                    ? "border-red-500"
                    : ""
                  }`}
              />

              {errors.expectedTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.expectedTime}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisitorModal;