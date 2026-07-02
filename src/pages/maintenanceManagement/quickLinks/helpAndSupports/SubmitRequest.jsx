import React, { useState } from "react";

export const SubmitRequest = () => {
  const [formData, setFormData] = useState({
    requestType: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="px-7 pt-7">
        <h2 className="text-[30px] font-bold text-[#1B2559]">
          Submit a Request
        </h2>

        <p className="text-gray-500 mt-1 text-[15px]">
          Can't find what you're looking for? Send us a request and we'll get
          back to you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-7">
        {/* Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Request Type */}
          <div>
            <label className="block text-[15px] font-semibold text-[#1B2559] mb-2">
              Request Type
            </label>

            <div className="relative">
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-300 px-4 pr-10 appearance-none outline-none focus:border-blue-600"
              >
                <option>Select request type</option>
                <option>Technical Issue</option>
                <option>Billing</option>
                <option>Maintenance</option>
                <option>Complaint</option>
              </select>

              <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[15px] font-semibold text-[#1B2559] mb-2">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-gray-300 px-4 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Description */}

        <div className="mt-6">
          <label className="block text-[15px] font-semibold text-[#1B2559] mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            placeholder="Describe your issue in detail..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-4 resize-none outline-none focus:border-blue-600"
          />
        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">
          {/* Attach */}

          <label className="border border-gray-300 rounded-lg h-11 px-5 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
            <i className="bi bi-paperclip text-[#1B2559]"></i>

            <span className="font-medium text-[#1B2559]">
              Attach File (Optional)
            </span>

            <input type="file" className="hidden" />
          </label>

          {/* Submit */}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-8 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <i className="bi bi-send"></i>
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};