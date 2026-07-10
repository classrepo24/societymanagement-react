
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useAmenity } from "../../../context/AmenityContext";


const CancelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookings, setBookings } = useAmenity();

  const { booking } = location.state || {};

    const [cancelReason, setCancelReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [errors, setErrors] = useState({});

    if (!booking) {
    return (
      <div className="p-6 text-center">
        Booking not found
      </div>
    );
  }

console.log("Booking Object:", booking);
console.log("Time Slot:", booking.timeSlot);




const validateForm = () => {
  const newErrors = {};

  if (!cancelReason) {
    newErrors.cancelReason = "Cancellation reason is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleCancelBooking = () => {
  if (!validateForm()) return;

  const updatedBookings = bookings.map((item) =>
    item.bookingId === booking.bookingId
      ? {
          ...item,
          status: "Cancelled",
          cancellationReason: cancelReason,
          cancellationRemarks: additionalDetails,
          cancelledAt: new Date().toISOString(),
        }
      : item
  );

  setBookings(updatedBookings);

  localStorage.setItem(
    "amenityBookings",
    JSON.stringify(updatedBookings)
  );

navigate("/amenities/AmenitySchedule/schedule");
};



const breadcrumbItems=[
{label:"Dashboard",path:"/"},
{label:"Amenities",path:"/amenities"},
{label:"Booking Details",path:"/amenities/booking"},
{label:"Re-schedule Booking"},
];


const startTime = booking.timeSlot.split("-")[0].trim();

const bookingStartTime = new Date(
  `${booking.bookingFor} ${startTime}`
);

console.log("Booking Start Time:", bookingStartTime);


const currentTime = new Date();

const diffInHours =
  (bookingStartTime - currentTime) / (1000 * 60 * 60);

const isRefundEligible = diffInHours >= 2;

const refundAmount = isRefundEligible
  ? booking.amountPaid
  : 0;




    return (
    <div className="p-6">



        
  <Breadcrumbs items={breadcrumbItems} />

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-3xl font-bold text-[#16216C]">
        Cancel Booking
      </h1>

      <p className="text-gray-500 mt-1">
        Cancel this booking. Please select a reason for cancellation.
      </p>
    </div>

    <button
      onClick={() => navigate(-1)}
      className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
    >
      <i className="bi bi-arrow-left"></i>
      Back to Booking Details
    </button>
  </div>
{/* Booking Summary */}
<div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
  <h3 className="text-lg font-bold text-[#16216C] mb-5">
    Booking Summary
  </h3>

  <div className="flex flex-col lg:flex-row items-center lg:items-start">

    {/* Left Section */}
    <div className="flex items-center gap-5 lg:w-[35%] pr-6">
      <img
        src="/images/clubhouse1.jpg"
        alt={booking.amenityName}
        className="w-40 h-28 rounded-xl object-cover"
      />

      <div>
        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
          <i className="bi bi-calendar-event text-2xl text-purple-600"></i>
        </div>

        <h2 className="text-2xl font-bold text-[#16216C]">
          {booking.amenityName}
        </h2>

        <p className="text-gray-500 mt-1">Hall</p>

        <p className="text-[#16216C] font-medium mt-2">
          {booking.amenityLocation}
        </p>
      </div>
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px bg-gray-200 mx-6 self-stretch"></div>

    {/* Booking Info */}
    <div className="lg:w-[20%] py-4 lg:py-0">
      <p className="text-gray-500 text-sm">Booking ID</p>
      <p className="font-bold text-[#16216C] text-xl">
        {booking.bookingId}
      </p>

      <p className="text-gray-500 text-sm mt-5">Booking Type</p>

      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
        Hourly
      </span>
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px bg-gray-200 mx-6 self-stretch"></div>

    {/* Date & Time */}
    <div className="lg:w-[25%] py-4 lg:py-0">
      <p className="text-gray-500 text-sm">Date</p>
      <p className="font-bold text-[#16216C] text-lg">
        {booking.bookingFor}
      </p>

      <p className="text-gray-500 text-sm mt-5">Time</p>
      <p className="font-bold text-[#16216C]">
        {booking.timeSlot}
      </p>
    </div>

    {/* Divider */}
    <div className="hidden lg:block w-px bg-gray-200 mx-6 self-stretch"></div>

    {/* Right Section */}
    <div className="lg:w-[20%] py-4 lg:py-0">
      <p className="text-gray-500 text-sm">Booked By</p>
      <p className="font-bold text-[#16216C] text-lg">
        {booking.residentName}
      </p>

      <p className="text-gray-500 text-sm mt-5">Amount Paid</p>
      <p className="font-bold text-[#16216C] text-2xl">
        ₹{booking.amountPaid}
      </p>

      <p className="text-gray-500 text-sm mt-5">Status</p>

      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
        {booking.status}
      </span>
    </div>

  </div>
</div>


  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* Card 1 */}
 <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
      <i className="bi bi-x-circle text-red-600 text-lg"></i>
    </div>

    <div>
      <h2 className="text-lg font-bold text-[#16216C]">
        Cancellation Reason
      </h2>
      <p className="text-sm text-gray-500">
        Please select a reason for cancelling this booking
      </p>
    </div>
  </div>

  {/* Reason */}
  <div className="mb-5">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Reason for Cancellation <span className="text-red-500">*</span>
    </label>

    <select
      value={cancelReason}
      onChange={(e) => {
        setCancelReason(e.target.value);

        if (errors.cancelReason) {
          setErrors({
            ...errors,
            cancelReason: "",
          });
        }
      }}
      className={`w-full px-4 py-3 rounded-xl border outline-none ${
        errors.cancelReason
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <option value="">Select cancellation reason</option>
      <option value="Personal Reason">
        Personal / Family Reason
      </option>
      <option value="Schedule Conflict">
        Schedule Conflict
      </option>
      <option value="Changed Plans">
        Changed Plans
      </option>
      <option value="Duplicate Booking">
        Duplicate Booking
      </option>
      <option value="Maintenance Issue">
        Maintenance Issue
      </option>
      <option value="Other">
        Other
      </option>
    </select>

    {errors.cancelReason && (
      <p className="text-red-500 text-sm mt-1">
        {errors.cancelReason}
      </p>
    )}
  </div>

  {/* Additional Details */}
  <div className="mb-5">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Additional Details
    </label>

    <textarea
      rows={5}
      value={additionalDetails}
      onChange={(e) => setAdditionalDetails(e.target.value)}
      placeholder="Please provide additional details if required..."
      className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none"
    />
  </div>

  {/* Warning Box */}
  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
    <div className="flex gap-3">
      <i className="bi bi-exclamation-triangle-fill text-yellow-600 text-lg"></i>

      <div>
        <h3 className="font-semibold text-yellow-800">
          Important Note
        </h3>

        <p className="text-sm text-yellow-700 mt-1">
          Once cancelled, this booking cannot be restored automatically.
          You will need to create a new booking if required in future.
        </p>
      </div>
    </div>
  </div>

</div>

  {/* Card 2 */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

  {/* Header */}
  <div className="mb-6">
    <h2 className="text-xl font-bold text-[#16216C]">
      2. Refund Information
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      Refund details based on cancellation policy.
    </p>
  </div>

  {/* Refund Eligible Box */}
  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <i className="bi bi-shield-check text-green-600 text-lg"></i>
      </div>

      <div>
       
<p className="font-semibold text-green-700">
  {isRefundEligible ? "Refund Eligible" : "Refund Not Eligible"}
</p>

<p className="text-sm text-green-600">
  {isRefundEligible
    ? "You are eligible for a full refund."
    : "This booking is not eligible for a refund."}
</p>
      </div>
    </div>
  </div>

  {/* Refund Details */}
  <div className="space-y-4">
    <div className="flex justify-between">
      <span className="text-gray-500">
        Amount Paid
      </span>

      <span className="font-semibold text-[#16216C]">
        ₹{booking.amountPaid}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">
        Cancellation Time
      </span>
<span className="font-medium text-[#16216C]">
  {new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</span>
    </div>

    <div className="flex justify-between">
      
  <span className="text-gray-500">
    Refund Amount
  </span>

  <span className="font-bold text-green-600 text-lg">
    ₹{refundAmount}
  </span>
</div>
    </div>
  

  {/* Bottom Note */}
  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
    <div className="flex gap-3">
      <i className="bi bi-info-circle text-blue-600 text-lg"></i>

      <p className="text-sm text-blue-700">
        Refund will be processed within 3-5 working days
        to the original payment method.
      </p>
    </div>
  </div>

</div>




  {/* Card 3 */}
  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
      <i className="bi bi-exclamation-triangle text-orange-600 text-lg"></i>
    </div>

    <div>
      <h2 className="text-lg font-bold text-[#16216C]">
        Cancellation Impact
      </h2>

      <p className="text-sm text-gray-500">
        Please review the impact before proceeding
      </p>
    </div>
  </div>

  {/* Impact Items */}
  <div className="space-y-4">

    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-calendar-x text-blue-600"></i>
      </div>

      <div>
        <h4 className="font-semibold text-[#16216C]">
          Time Slot Released
        </h4>

        <p className="text-sm text-gray-500">
          Your booked slot will become available for other residents.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-graph-up text-green-600"></i>
      </div>

      <div>
        <h4 className="font-semibold text-[#16216C]">
          Booking Statistics Updated
        </h4>

        <p className="text-sm text-gray-500">
          Amenity usage statistics will be updated automatically.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-bell text-purple-600"></i>
      </div>

      <div>
        <h4 className="font-semibold text-[#16216C]">
          Notification Sent
        </h4>

        <p className="text-sm text-gray-500">
          Cancellation confirmation will be sent to your registered contact details.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-arrow-counterclockwise text-red-600"></i>
      </div>

      <div>
        <h4 className="font-semibold text-[#16216C]">
          Action Cannot Be Undone
        </h4>

        <p className="text-sm text-gray-500">
          Once cancelled, this booking cannot be restored automatically.
        </p>
      </div>
    </div>

  </div>

</div>

</div>



<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-6">

  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
      <i className="bi bi-shield-check text-blue-600 text-lg"></i>
    </div>

    <div>
      <h2 className="text-lg font-bold text-[#16216C]">
        Cancellation Policy
      </h2>

      <p className="text-sm text-gray-500">
        Please review the cancellation policy before proceeding.
      </p>
    </div>
  </div>

  <div className="space-y-4">

    <div className="flex items-start gap-3">
      <i className="bi bi-check-circle-fill text-green-600 mt-1"></i>
      <p className="text-gray-600">
        Full refund available if cancelled before the allowed cancellation window.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <i className="bi bi-check-circle-fill text-green-600 mt-1"></i>
      <p className="text-gray-600">
        Late cancellations may be subject to cancellation charges.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <i className="bi bi-check-circle-fill text-green-600 mt-1"></i>
      <p className="text-gray-600">
        Refunds are processed to the original payment method.
      </p>
    </div>

    <div className="flex items-start gap-3">
      <i className="bi bi-check-circle-fill text-green-600 mt-1"></i>
      <p className="text-gray-600">
        Management reserves the right to review exceptional cases.
      </p>
    </div>

  </div>

</div>




<div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

    {/* Left Side Warning */}
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-exclamation-triangle-fill text-red-600"></i>
      </div>

      <div>
        <h3 className="font-semibold text-red-600">
          Warning
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Once cancelled, this booking cannot be restored.
          You will need to create a new booking if required in future.
        </p>
      </div>
    </div>

    {/* Right Side Buttons */}
    <div className="flex gap-3">

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
      >
        Keep Booking
      </button>

      <button
        onClick={handleCancelBooking}
        className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
      >
        Confirm Cancellation
      </button>

    </div>
  </div>
</div>



       
    </div>
  );
};

export default CancelBooking;
