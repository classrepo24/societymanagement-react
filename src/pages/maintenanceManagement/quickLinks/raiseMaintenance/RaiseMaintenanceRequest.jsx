import React, { useState } from "react";
import { RequestDetails } from "./RequestDetails";
import { LocationDetails } from "./LocationDetails";
import { UploadMedia } from "./UploadMedia";
import { PreferredTime } from "./PreferredTime";
import { CategorySidebar } from "./CategorySidebar";
import { EmergencyCard } from "./EmergencyCard";
import { Breadcrumb } from "../../../../components/Breadcrumb";

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
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          { label: "Maintenance" },
          { label: "Raise Maintenance Request" },
        ]}
        title="Raise Maintenance Request"
        subtitle="Provide details about the maintenance issue you want to report."
      />

      <div className="min-h-screen ">
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