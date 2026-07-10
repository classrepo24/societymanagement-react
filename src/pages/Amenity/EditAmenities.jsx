import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from "../../components/Breadcrumbs";
import { useAmenity } from "../../context/AmenityContext";
import DeletePopup from "../../components/DeletePopup";

export const EditAmenities = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDeleteAmenity = () => {

  setAmenities((prev) =>
    prev.filter((item) => item.id !== Number(id))
  );

  setShowDeletePopup(false);

  navigate("/amenities");
};

  const { amenities, setAmenities } = useAmenity();

  const amenity = amenities.find((item) => item.id === Number(id));

  const [openTime, setOpenTime] = useState(amenity.operatingHours?.split(" - ")[0] || "");
const [closeTime, setCloseTime] = useState(amenity.operatingHours?.split(" - ")[1] || "");
const [errors, setErrors] = useState({});

//image
const [selectedImage, setSelectedImage] = useState(
  amenity.images?.[0] || ""
);
const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    setErrors((prev) => ({
      ...prev,
      image: "Only JPG, WEBP and PNG images are allowed",
    }));
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    setErrors((prev) => ({
      ...prev,
      image: "Image size should be less than 2MB",
    }));
    return;
  }

  setErrors((prev) => ({
    ...prev,
    image: "",
  }));

  const preview = URL.createObjectURL(file);

  setSelectedImage(preview);

  setFormData((prev) => ({
    ...prev,
    images: [preview],
  }));
};


  //facility 
  const [newFacility, setNewFacility] = useState("");
  const handleAddFacility = () => {
  const value = newFacility.trim();

  if (!value) return;

  if (formData.facilities.includes(value)) return;

  setFormData((prev) => ({
    ...prev,
    facilities: [...prev.facilities, value],
  }));

  setNewFacility("");
};
const handleRemoveFacility = (facility) => {
  setFormData((prev) => ({
    ...prev,
    facilities: prev.facilities.filter((f) => f !== facility),
  }));
};



  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    bookingType: "",
    status: "",
    capacity: "",
    description: "",
    facilities: [],
    rules: "",
    weeklyAvailability: [],
    operatingHours: "",
    advanceBookingAllowed: "",
    advanceBookingDays: "",
    bookingDuration: "",
    repeatedBooking: "",
    cancellationPolicy: "",
  });

  useEffect(() => {
    if (amenity) {
      setFormData({
        name: amenity.name || "",
        category: amenity.category || "",
        location: amenity.location || "",
        bookingType: amenity.bookingType || "",
        status: amenity.status || "",
        description: amenity.description || "",
        facilities: amenity.facilities || [],
        rules: amenity.rules?.join("\n") || "",
        weeklyAvailability: amenity.weeklyAvailability || [],
        operatingHours: amenity.operatingHours || "",
        advanceBookingAllowed: amenity.advanceBookingAllowed || "",
        advanceBookingDays: amenity.advanceBookingDays || "",
        bookingDuration: amenity.bookingDuration || "",
        repeatedBooking: amenity.repeatedBooking || "",
        cancellationPolicy: amenity.cancellationPolicy || "",
        capacity: amenity.capacity
          ? amenity.capacity.replace(" People", "")
          : "",
      });
    }
  }, [amenity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const validate = () => {

  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Amenity name is required";
  }

  if (!formData.category) {
    newErrors.category = "Category is required";
  }

  if (!formData.location.trim()) {
    newErrors.location = "Location is required";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Description is required";
  }

  if (!openTime) {
    newErrors.openTime = "Opening time is required";
  }

  if (!closeTime) {
    newErrors.closeTime = "Closing time is required";
  }

  if (openTime === closeTime && openTime) {
    newErrors.closeTime =
      "Opening and closing time cannot be the same";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSave = () => {

  if (!validate()) return;

  setAmenities((prev) =>
    prev.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            ...formData,
            images: formData.images,

            capacity: `${formData.capacity} People`,

            rules:
              typeof formData.rules === "string"
                ? formData.rules.split("\n").filter(Boolean)
                : formData.rules,

            facilities: formData.facilities,

            description: formData.description,

            advanceBookingAllowed:
              formData.advanceBookingAllowed,

            advanceBookingDays:
              formData.advanceBookingDays,

            bookingDuration:
              formData.bookingDuration,

            repeatedBooking:
              formData.repeatedBooking,

            cancellationPolicy:
              formData.cancellationPolicy,

            weeklyAvailability:
              formData.weeklyAvailability,

            operatingHours: `${openTime} - ${closeTime}`,
            
          }
        : item
    )
  );

  navigate("/amenities");
};

  if (!amenity) {
    return <div className="p-6">Amenity not found.</div>;
  }


  const timeOptions = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];





 return (
    <>
  <div className="p-6 bg-[#F8FAFC] min-h-screen">

    <Breadcrumbs
      items={[
        {
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          label: "Amenities",
          path: "/amenities",
        },
        {
          label: "Edit Amenity",
        },
      ]}
    />

    {/* Header */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

      <div>

        <h1 className="text-[36px] font-bold text-[#01214A]">
          Edit Amenity
        </h1>

        <p className="text-[#64748B] text-[15px] mt-2">
          Update the details and settings of the selected amenity.
        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => navigate(-1)}
          className="h-12 px-6 rounded-xl border border-[#D8E2F0] bg-white text-[#01214A] font-medium flex items-center gap-2 hover:bg-gray-50 transition"
        >
          <i className="bi bi-arrow-left"></i>
          Back
        </button>

        <button
          onClick={handleSave}
          className="h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium flex items-center gap-2 transition"
        >
          <i className="bi bi-floppy"></i>
          Save Changes
        </button>

      </div>

    </div>

    {/* Main Layout */}

    <div className="grid grid-cols-12 gap-6">

      {/* Left Side */}

      <div className="col-span-12 xl:col-span-8">

        {/* Basic Information */}

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

          <h2 className="text-[22px] font-bold text-[#01214A] mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/* Amenity Name */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Amenity Name <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
    placeholder="Enter Amenity Name"
  />
</div>

{/* Booking Type */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Booking Type <span className="text-red-500">*</span>
  </label>

  <select
    name="bookingType"
    value={formData.bookingType}
    onChange={handleChange}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  >
    <option>Bookable</option>
    <option>Non Bookable</option>
  </select>
</div>

{/* Category */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Category <span className="text-red-500">*</span>
  </label>

  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  >
    <option>Recreation</option>
    <option>Sports</option>
    <option>Fitness</option>
    <option>Wellness</option>
  </select>
</div>

{/* Status */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Status <span className="text-red-500">*</span>
  </label>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  >
    <option>Active</option>
    <option>Inactive</option>
  </select>
</div>

{/* Location */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Location <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
    placeholder="Enter Location"
  />
</div>

{/* Capacity */}

<div>
  <label className="block text-[14px] font-medium text-[#334155] mb-2">
    Capacity
  </label>

  <div className="flex">

    <input
      type="number"
      name="capacity"
      value={formData.capacity}
      onChange={handleChange}
      className="flex-1 h-12 rounded-l-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
      placeholder="20"
    />

    <div className="w-24 h-12 rounded-r-xl border border-l-0 border-[#CBD5E1] bg-[#F8FAFC] flex items-center justify-center text-[#64748B] text-sm">
      People
    </div>

  </div>

</div>

</div>

</div>

{/* About Amenity */}

<div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mt-6">

  <h2 className="text-[22px] font-bold text-[#01214A] mb-6">
    About Amenity
  </h2>

  {/* Description */}

  <div className="mb-6">

    <label className="block text-[14px] font-medium text-[#334155] mb-2">
      Description
      <span className="text-red-500">*</span>
    </label>

    <textarea
      rows={5}
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Enter Description"
      className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 resize-none outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
    />

  </div>

  {/* Amenities */}

  <label className="block text-sm font-medium mb-3">
  Amenities Provided
</label>

<div className="border border-[#CBD5E1] rounded-xl p-3">

  <div className="flex flex-wrap gap-2 mb-3">

    {formData.facilities.map((facility) => (

      <div
        key={facility}
        className="flex items-center gap-2 bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] px-3 py-1 rounded-full"
      >
        <span>{facility}</span>

        <button
          type="button"
          onClick={() => handleRemoveFacility(facility)}
        >
          <i className="bi bi-x-lg text-xs"></i>
        </button>

      </div>

    ))}

  </div>

  <div className="flex gap-2">

    <input
      type="text"
      value={newFacility}
      onChange={(e) => setNewFacility(e.target.value)}
      placeholder="Add Facility"
      className="flex-1 h-11 border border-[#CBD5E1] rounded-lg px-3"
    />

    <button
      type="button"
      onClick={handleAddFacility}
      className="bg-[#2563EB] text-white px-5 rounded-lg"
    >
      Add
    </button>

  </div>

</div>

  {/* Society Rules */}

  <div>

    <label className="block text-[14px] font-medium text-[#334155] mb-2">
      Society Rules
    </label>

    <textarea
      rows={6}
      name="rules"
      value={formData.rules}
      onChange={handleChange}
      placeholder="Enter Society Rules"
      className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 resize-none outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
    />

  </div>

</div>


{/* Availability Schedule */}

<div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mt-6">

  <h2 className="text-[22px] font-bold text-[#01214A] mb-6">
    Availability Schedule
  </h2>

  <div className="grid grid-cols-3 gap-6">

    {/* Operating Hours */}

    <div className="col-span-2">

      <label className="block text-[14px] font-medium mb-2">
        Operating Hours
        <span className="text-red-500">*</span>
      </label>

      <div className="flex items-center gap-3">

  <select
    value={openTime}
    onChange={(e) => setOpenTime(e.target.value)}
    className={`w-[170px] h-11 border rounded-lg px-3 ${
      errors.openTime ? "border-red-500" : "border-[#D8E2F0]"
    }`}
  >
    <option value="">Select Time</option>

    {timeOptions.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ))}
  </select>

  <span className="text-[#64748B] font-medium">
    to
  </span>

  <select
    value={closeTime}
    onChange={(e) => setCloseTime(e.target.value)}
    className={`w-[170px] h-11 border rounded-lg px-3 ${
      errors.closeTime ? "border-red-500" : "border-[#D8E2F0]"
    }`}
  >
    <option value="">Select Time</option>

    {timeOptions.map((time) => (
      <option key={time} value={time}>
        {time}
      </option>
    ))}
  </select>

</div>

{errors.openTime && (
  <p className="text-red-500 text-sm mt-1">
    {errors.openTime}
  </p>
)}

{errors.closeTime && (
  <p className="text-red-500 text-sm mt-1">
    {errors.closeTime}
  </p>
)}
    </div>

    {/* Weekly Off */}

    <div>

      <label className="block text-[14px] font-medium mb-2">
        Weekly Off
      </label>

      <select
        className="w-full h-11 border border-[#D8E2F0] rounded-lg px-3"
      >
        <option>{amenity.weeklyOff}</option>
        <option>Sunday</option>
        <option>Saturday</option>
        <option>None</option>
      </select>

    </div>

  </div>

  {/* Availability */}

  <div className="mt-7">

    <label className="block text-[14px] font-medium mb-3">
      Availability
    </label>

    <div className="flex flex-wrap gap-3">

      {formData.weeklyAvailability.map((item, index) => (

        <div
          key={index}
          className="flex items-center gap-2 border border-[#E2E8F0] rounded-lg px-3 py-2 bg-white"
        >

          <span className="text-[13px] font-medium text-[#1E293B]">
            {item.day}
          </span>

          <span className="px-2 py-[2px] rounded bg-[#DCFCE7] text-[#16A34A] text-[11px] font-medium">
            {item.status}
          </span>

        </div>

      ))}

    </div>

  </div>

</div>

</div>


<div className="col-span-12 xl:col-span-4 space-y-6">
{/* Amenity Image */}

<div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

  <h2 className="text-[22px] font-bold text-[#01214A] mb-5">
    Amenity Image
  </h2>

  <div className="rounded-2xl overflow-hidden border border-[#E2E8F0]">

    <img
      src={selectedImage || "/images/no-image.png"}
      alt={amenity.name}
      className="w-full h-[240px] object-cover"
    />

  </div>

  <input
    type="file"
    id="changeAmenityImage"
    accept="image/*"
    className="hidden"
    onChange={handleImageChange}
  />

  <label
    htmlFor="changeAmenityImage"
    className="mt-4 h-11 px-5 rounded-xl bg-white border border-[#D8E2F0] shadow-sm text-[#01214A] font-medium flex items-center justify-center gap-2 hover:bg-[#F8FAFC] cursor-pointer w-fit mx-auto"
  >
    <i className="bi bi-cloud-arrow-up text-[#2563EB]"></i>
    Change Image
  </label>

  <p className="text-xs text-[#94A3B8] mt-3 text-center">
    JPG, PNG ,WEBP up to 2MB
  </p>
  {errors.image && (
  <p className="text-red-500 text-sm mt-2 text-center">
    {errors.image}
  </p>
)}

</div>

  {/* Quick Actions */}

  {/* Quick Actions */}

<div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">

  <h2 className="text-[20px] font-bold text-[#01214A] mb-5">
    Quick Actions
  </h2>

  <div className="space-y-3">

    {/* Amenity Schedule */}
    <button
      onClick={() => navigate("/amenities/AmenitySchedule/schedule")}
      className="w-full h-11 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center gap-2 text-sm font-medium text-[#01214A]"
    >
      <i className="bi bi-calendar3"></i>
      Amenity Schedule
    </button>


    {/* Booking Settings */}
    <button
     onClick={() =>
    navigate(`/amenities/edit/${id}/booking-settings`)
  }
      className="w-full h-11 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center gap-2 text-sm font-medium text-[#01214A]"
    >
      <i className="bi bi-gear"></i>
      Booking Settings
    </button>


    {/* Maintenance History */}
    <button
      className="w-full h-11 rounded-xl border border-[#CBD5E1] hover:bg-[#F8FAFC] flex items-center justify-center gap-2 text-sm font-medium text-[#01214A]"
    >
      <i className="bi bi-tools"></i>
      Maintenance History
    </button>


    {/* Deactivate Amenity */}
    <button
      onClick={() => {
        setAmenities((prev) =>
          prev.map((item) =>
            item.id === Number(id)
              ? { ...item, status: "Inactive" }
              : item
          )
        );
      }}
      className="w-full h-11 rounded-xl border text-red-500 hover:bg-[#FEF3C7] flex items-center justify-center gap-2 text-sm font-medium "
    >
      <i className="bi bi-pause-circle"></i>
      Deactivate Amenity
    </button>


    {/* Delete Amenity */}
    <button
      onClick={() => setShowDeletePopup(true)}
      className="w-full h-11 rounded-xl border text-red-500 hover:bg-[#FEE2E2] flex items-center justify-center gap-2 text-sm font-medium text-[#DC2626]"
    >
      <i className="bi bi-trash"></i>
      Delete Amenity
    </button>

  </div>

</div>


{/* Booking & Usage Settings */}

<div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mt-6">

  <h2 className="text-[22px] font-bold text-[#01214A] mb-6">
    Booking & Usage Settings
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Advance Booking */}

    <div>

      <label className="block text-[14px] font-medium text-[#334155] mb-2">
        Advance Booking Allowed
      </label>

      <select
        name="advanceBookingAllowed"
        value={formData.advanceBookingAllowed}
        onChange={handleChange}
        className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:ring-2 focus:ring-[#DBEAFE]"
      >
        <option>Yes</option>
        <option>No</option>
      </select>

    </div>

    {/* Advance Booking Days */}

    <div>

      <label className="block text-[14px] font-medium text-[#334155] mb-2">
        Advance Booking Days
      </label>

      <input
        type="text"
        name="advanceBookingDays"
        value={formData.advanceBookingDays}
        onChange={handleChange}
        className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:ring-2 focus:ring-[#DBEAFE]"
      />

    </div>

    {/* Booking Duration */}

    <div>

      <label className="block text-[14px] font-medium text-[#334155] mb-2">
        Booking Duration
      </label>

      <input
        type="text"
        name="bookingDuration"
        value={formData.bookingDuration}
        onChange={handleChange}
        className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:ring-2 focus:ring-[#DBEAFE]"
      />

    </div>

    {/* Repeated Booking */}

    <div>

      <label className="block text-[14px] font-medium text-[#334155] mb-2">
        Repeated Booking
      </label>

      <select
        name="repeatedBooking"
        value={formData.repeatedBooking}
        onChange={handleChange}
        className="w-full h-12 rounded-xl border border-[#CBD5E1] px-4 outline-none focus:ring-2 focus:ring-[#DBEAFE]"
      >
        <option>Yes</option>
        <option>No</option>
      </select>

    </div>

  </div>

  {/* Cancellation Policy */}

  <div className="mt-6">

    <label className="block text-[14px] font-medium text-[#334155] mb-2">
      Cancellation Policy
    </label>

    <textarea
      rows={5}
      name="cancellationPolicy"
      value={formData.cancellationPolicy}
      onChange={handleChange}
      className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-[#DBEAFE]"
    />

  </div>

</div>

</div>

</div>

</div>


<DeletePopup
  isOpen={showDeletePopup}
  title="Delete Amenity"
  message="Are you sure you want to delete this amenity?"
  onCancel={() => setShowDeletePopup(false)}
  onConfirm={handleDeleteAmenity}
/>
</>

);
}
export default EditAmenities;