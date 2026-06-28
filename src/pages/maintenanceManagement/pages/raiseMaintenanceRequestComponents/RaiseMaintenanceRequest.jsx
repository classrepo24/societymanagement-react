import React, { useState } from "react";
import { RequestDetails } from "../../pages/raiseMaintenanceRequestComponents/components/RequestDetails";
import { LocationDetails } from "../../pages/raiseMaintenanceRequestComponents/components/LocationDetails";
import { UploadMedia } from "../../pages/raiseMaintenanceRequestComponents/components/UploadMedia";
import { PreferredTime } from "../../pages/raiseMaintenanceRequestComponents/components/PreferredTime";
import { CategorySidebar } from "../../pages/raiseMaintenanceRequestComponents/components/CategorySidebar";
import { EmergencyCard } from "../../pages/raiseMaintenanceRequestComponents/components/EmergencyCard";

export const RaiseMaintenanceRequest = () => {
  const [requestData, setRequestData] = useState({
    category: "",
    subCategory: "",
    priority: "",
    title: "",
    description: "",

    flat: "",
    location: "",
    landmark: "",

    preferredDate: "",
    preferredTime: "",
    anyTime: false,

    media: [],
  });
  const handleChange = (name, value) => {
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !requestData.category ||
      !requestData.priority ||
      !requestData.title.trim() ||
      !requestData.description.trim() ||
      !requestData.flat ||
      !requestData.location
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log(requestData);

    alert("Maintenance Request Submitted Successfully");

    setRequestData({
      category: "",
      subCategory: "",
      priority: "",
      title: "",
      description: "",
      flat: "",
      location: "",
      landmark: "",
      preferredDate: "",
      preferredTime: "",
      anyTime: false,
      media: []
    });
  }

  return (
    <div className="w-full bg-white px-6 py-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 m-6">
        <span className="hover:text-blue-600 cursor-pointer">
          Dashboard
        </span>

        <span>/</span>

        <span className="hover:text-blue-600 cursor-pointer">
          Maintenance
        </span>

        <span>/</span>

        <span className="font-semibold text-gray-900">
          Raise Maintenance Request
        </span>
      </div>

      {/* Heading */}
      <div className="m-6">
      <h1 className="mt-3 text-4xl font-bold text-slate-900">
        Raise Maintenance Request
      </h1>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-base">
        Provide details about the maintenance issue you want to report.
      </p>
      </div>

      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">

          {/* Left */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

            <RequestDetails
              requestData={requestData}
              handleChange={handleChange} />

            <LocationDetails
              requestData={requestData}
              handleChange={handleChange} />

            <UploadMedia requestData={requestData}
              setRequestData={setRequestData}
              handleChange={handleChange} />

            <PreferredTime requestData={requestData}
              handleChange={handleChange} />

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i className="bi bi-send"></i>
                Submit Request
              </button>
            </div>

          </form>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <CategorySidebar />
            <EmergencyCard />
          </div>

        </div>
      </div>
    </div>
  );
};