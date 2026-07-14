import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAmenity } from "../../context/AmenityContext";
import { useNavigate } from "react-router-dom";
export const AddNewAmenities = () => {
  const { amenities, setAmenities } = useAmenity();
  const navigate = useNavigate();

  //validation
  const [amenityName, setAmenityName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [accessType, setAccessType] = useState("");
  const [errors, setErrors] = useState({});
const [description, setDescription] = useState("");

const [enableOperatingHours, setEnableOperatingHours] = useState(false);

const [closedOnSpecificDays, setClosedOnSpecificDays] = useState(false);

const [selectedDay, setSelectedDay] = useState("");

const [capacity, setCapacity] = useState("");

const [rules, setRules] = useState("");

const [bookingRequired, setBookingRequired] = useState("");

const [showInResidentsApp, setShowInResidentsApp] = useState(true);

const [displayOrder, setDisplayOrder] = useState("");
  //image
  const [images, setImages] = useState([]);

  //time validation state
  const [openTime, setOpenTime] = useState("");
const [closeTime, setCloseTime] = useState("");

  //draft
  useEffect(() => {
    const draft = localStorage.getItem("amenityDraft");

    if (draft) {
      const data = JSON.parse(draft);

      setAmenityName(data.amenityName || "");
      setCategory(data.category || "");
      setLocation(data.location || "");
      setAvailabilityStatus(data.availabilityStatus || "");
      setAccessType(data.accessType || "");
        setAmenityName(data.amenityName || "");
    setCategory(data.category || "");
    setLocation(data.location || "");
    setDescription(data.description || "");
    setAvailabilityStatus(data.availabilityStatus || "");
    setAccessType(data.accessType || "");
    setOpenTime(data.openTime || "");
    setCloseTime(data.closeTime || "");
    setEnableOperatingHours(data.enableOperatingHours || false);
    setClosedOnSpecificDays(data.closedOnSpecificDays || false);
    setSelectedDay(data.selectedDay || "");
    setCapacity(data.capacity || "");
    setRules(data.rules || "");
    setBookingRequired(data.bookingRequired || "");
    setShowInResidentsApp(data.showInResidentsApp ?? true);
    setDisplayOrder(data.displayOrder || "");
  
    }
  }, []);

  const handleSaveDraft = () => {
    const draftData = {
  amenityName,
  category,
  location,
  description,
  availabilityStatus,
  accessType,
  openTime,
  closeTime,
  enableOperatingHours,
  closedOnSpecificDays,
  selectedDay,
  capacity,
  rules,
  bookingRequired,
  showInResidentsApp,
  displayOrder,
};

    localStorage.setItem("amenityDraft", JSON.stringify(draftData));

    
  };

  //   validation
  const handleSave = () => {
    const newErrors = {};

    const isDuplicate = amenities.some(
      (item) =>
        item.name.toLowerCase().trim() === amenityName.toLowerCase().trim(),
    );

    if (isDuplicate) {
      newErrors.amenityName = "This amenity already exists";
    }

    if (!amenityName.trim()) {
      newErrors.amenityName = "Amenity name is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!availabilityStatus) {
      newErrors.availabilityStatus = "Please select availability status";
    }

    if (!accessType) {
      newErrors.accessType = "Please select access type";
    }
if (!openTime) {
  newErrors.openTime = "Open Time is required";
}

if (!closeTime) {
  newErrors.closeTime = "Close Time is required";
}

if (
  openTime &&
  closeTime &&
  openTime === closeTime
) {
  newErrors.closeTime =
    "Open Time and Close Time cannot be the same";
}

if (
  openTime &&
  closeTime &&
  closeTime < openTime
) {
  newErrors.closeTime =
    "Close Time must be greater than Open Time";
}
    setErrors(newErrors);

    // rendering to th Amenity
    const imageUrls = images.map((file) => URL.createObjectURL(file));
    if (Object.keys(newErrors).length === 0) {
      const newAmenity = {
        id: Date.now(),
        name: amenityName,
        description: "",
        category,
        location,
        status: "Active",
        availability: availabilityStatus,
        timings: "Open",
        icon: "bi-house-door",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
        images: imageUrls,
      };

      setAmenities((prev) => [newAmenity, ...prev]);
      localStorage.removeItem("amenityDraft"); //draft
      navigate("/amenities");
    }
  };

  //   image
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <div className="p-6 bg-[#f5f7fb] min-h-screen">
        <Breadcrumbs
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Amenity", path: "/amenities" },
            { label: "AddNewAmenity", path: "/amenities/add" },
          ]}
        />
        <h1 className="text-[40px] font-bold text-[#0F172A] mt-3">
          Add New Amenity
        </h1>
        <p className="text-[#64748B] mt-1 mb-4 text-[16px]">
          Add details for a new amenity in the society.
        </p>
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            {/* Basic Information */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h3 className="text-[20px] font-semibold text-[#0F172A] mb-6">
                Basic Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Amenity Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={amenityName}
                    onChange={(e) => setAmenityName(e.target.value)}
                    placeholder="Enter amenity name (e.g., Swimming Pool)"
                    className={`w-full h-12 rounded-xl px-4 outline-none border ${
                      errors.amenityName ? "border-red-500" : "border-[#CBD5E1]"
                    }`}
                  />

                  {errors.amenityName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.amenityName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full h-12 rounded-xl px-4 outline-none border ${
                        errors.category ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    >
                      <option value="">Select category</option>
                      <option>Recreation</option>
                      <option>Fitness</option>
                      <option>Community</option>
                      <option>Wellness</option>
                      <option>Sport</option>
                    </select>

                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location (e.g., Block A, Ground Floor)"
                      className={`w-full h-12 rounded-xl px-4 outline-none border ${
                        errors.location ? "border-red-500" : "border-[#CBD5E1]"
                      }`}
                    />

                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Description
                  </label>

                  <textarea
  rows={5}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter a brief description about this amenity..."
  className="w-full border border-[#CBD5E1] rounded-xl p-4 outline-none resize-none"
/>
                  <div className="text-right text-sm text-[#64748B] mt-1">
                    0/500 characters
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h3 className="text-[20px] font-semibold text-[#0F172A] mb-6">
                Availability & Timings
              </h3>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-4">
                    Availability Status <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="AvailabilityStatus"
                        value="Available"
                        checked={availabilityStatus === "Available"}
                        onChange={(e) => setAvailabilityStatus(e.target.value)}
                      />
                      <span>Available</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="AvailabilityStatus"
                        value="Not Available"
                        checked={availabilityStatus === "Not Available"}
                        onChange={(e) => setAvailabilityStatus(e.target.value)}
                      />
                      <span>Not Available</span>
                    </label>
                  </div>

                  {errors.availabilityStatus && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.availabilityStatus}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Access Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={accessType}
                    onChange={(e) => setAccessType(e.target.value)}
                    className={`w-full h-12 rounded-xl px-4 border ${
                      errors.accessType ? "border-red-500" : "border-[#CBD5E1]"
                    }`}
                  >
                    <option value="">Select access type</option>
                    <option>Public</option>
                    <option>Members Only</option>
                    <option>Booking Required</option>
                  </select>

                  {errors.accessType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.accessType}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-[#0F172A] mb-4">
                  Operating Hours
                </h4>

                <label className="flex items-center gap-2 mb-5">
                  <input type="checkbox" />
                  <span>Enable operating hours</span>
                </label>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm mb-2">Open Time</label>

                    <input
  type="time"
  value={openTime}
  onChange={(e) => setOpenTime(e.target.value)}
  className={`w-full h-12 border rounded-xl px-4 ${
    errors.openTime ? "border-red-500" : "border-[#CBD5E1]"
  }`}
/>

{errors.openTime && (
  <p className="text-red-500 text-sm mt-1">
    {errors.openTime}
  </p>
)}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Close Time</label>

                    <input
  type="time"
  value={closeTime}
  onChange={(e) => setCloseTime(e.target.value)}
  className={`w-full h-12 border rounded-xl px-4 ${
    errors.closeTime ? "border-red-500" : "border-[#CBD5E1]"
  }`}
/>

{errors.closeTime && (
  <p className="text-red-500 text-sm mt-1">
    {errors.closeTime}
  </p>
)}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-2 mb-3">
                    <input
  type="checkbox"
  checked={closedOnSpecificDays}
  onChange={(e) => setClosedOnSpecificDays(e.target.checked)}
/>
                    <span>Closed on specific days</span>
                  </label>

<select
  value={selectedDay}
  onChange={(e) => setSelectedDay(e.target.value)}
  className="w-full h-12 border border-[#CBD5E1] rounded-xl px-4 bg-[#F8FAFC]"
>                    <option value="">Select days</option>
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}

          <div className="col-span-12 xl:col-span-4 space-y-6">
            {/* Upload */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h3 className="text-[20px] font-semibold text-[#0F172A] mb-5">
                Upload Images
              </h3>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border border-dashed border-[#CBD5E1] rounded-2xl min-h-[260px] flex flex-col items-center justify-center text-center p-4"
              >
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <i className="bi bi-cloud-upload text-4xl text-[#64748B]"></i>

                <p className="mt-4 text-[#0F172A] font-medium">
                  Drag & drop images here
                </p>

                <label
                  htmlFor="imageUpload"
                  className="text-[#2563EB] text-sm cursor-pointer"
                >
                  or click to browse
                </label>

                <p className="text-xs text-[#64748B] mt-4">
                  Supported formats: JPG, PNG, WebP
                </p>

                <p className="text-xs text-[#64748B]">
                  Max file size: 5MB each
                </p>

                <label
                  htmlFor="imageUpload"
                  className="mt-5 border border-[#CBD5E1] h-11 px-6 rounded-xl flex items-center cursor-pointer"
                >
                  Choose Files
                </label>

                {images.length > 0 && (
                  <div className="mt-4 w-full space-y-2">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm truncate">{file.name}</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
              <h3 className="text-[20px] font-semibold text-[#0F172A] mb-6">
                Additional Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Capacity (Optional)
                  </label>

                  <input
  type="text"
  value={capacity}
  onChange={(e) => setCapacity(e.target.value)}
  placeholder="Enter capacity (e.g., 50 people)"
  className="w-full h-12 border border-[#CBD5E1] rounded-xl px-4"
/>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rules (Optional)
                  </label>

                  <textarea
  rows={4}
  value={rules}
  onChange={(e) => setRules(e.target.value)}
  placeholder="Enter rules or guidelines..."
  className="w-full border border-[#CBD5E1] rounded-xl p-4 resize-none"
/>

                  <div className="text-right text-sm text-[#64748B] mt-1">
                    0/300 characters
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Booking Required
                  </label>

                  <div className="flex gap-8">
                   <input
  type="radio"
  name="booking"
  value="Yes"
  checked={bookingRequired === "Yes"}
  onChange={(e) => setBookingRequired(e.target.value)}
/>

<input
  type="radio"
  name="booking"
  value="No"
  checked={bookingRequired === "No"}
  onChange={(e) => setBookingRequired(e.target.value)}
/>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-[#0F172A] mb-4">
                    Display Settings
                  </h4>

                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-medium">Show in Residents App</p>
                      <p className="text-xs text-[#64748B]">
                        Make this amenity visible to residents
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                     <input
  type="checkbox"
  className="sr-only peer"
  checked={showInResidentsApp}
  onChange={(e) => setShowInResidentsApp(e.target.checked)}
/>

                      <div
                        className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full
    relative after:content-[''] after:absolute after:top-[2px] after:left-[2px]
    after:bg-white after:h-5 after:w-5 after:rounded-full
    after:transition-all peer-checked:after:translate-x-5"
                      ></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Display Order
                    </label>

                    <input
  type="text"
  value={displayOrder}
  onChange={(e) => setDisplayOrder(e.target.value)}
  placeholder="Enter display order (e.g., 1, 2, 3...)"
  className="w-full h-12 border border-[#CBD5E1] rounded-xl px-4"
/>
                  </div>
                </div>
                {/* Display Settings */}
              </div>
              {/* space-y-5 */}
            </div>
            {/* Additional Information */}
          </div>
          {/* Right Section */}
        </div>
        {/* Grid */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-12 px-8 rounded-xl font-medium"
            >
              Save Amenity
            </button>

            <button
              onClick={handleSaveDraft}
              className="border border-[#CBD5E1] h-12 px-8 rounded-xl font-medium"
            >
              Save as Draft
            </button>
          </div>

          <button
  onClick={() => {
    localStorage.removeItem("amenityDraft");
    navigate("/amenities");
  }}
  className="border border-[#CBD5E1] h-12 px-8 rounded-xl font-medium"
>
  Cancel
</button>
        </div>
      </div>
      {/* Main Container */}
    </>
  );
};
