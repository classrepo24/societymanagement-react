import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useAmenity } from "../../../context/AmenityContext";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const RescheduleBooking = () => {

const navigate = useNavigate();
const location = useLocation();

const { amenities, bookings, setBookings } = useAmenity();

const booking =
location.state?.booking ||
bookings[bookings.length-1];

const amenity = amenities.find(
item=>item.id===booking?.amenityId
);

const breadcrumbItems=[
{label:"Dashboard",path:"/"},
{label:"Amenities",path:"/amenities"},
{label:"Booking Details",path:"/amenities/booking"},
{label:"Re-schedule Booking"},
];


const initialDate = booking?.bookingFor
  ? new Date(booking.bookingFor)
  : new Date();

const [selectedDate, setSelectedDate] = useState(initialDate);

const [currentDate, setCurrentDate] = useState(initialDate);


const [selectedSlot,setSelectedSlot]=useState(null);

const daysInMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();


const handleReschedule = () => {
  if (!selectedSlot) return;

  const updatedBookings = bookings.map((item) =>
    item.bookingId === booking.bookingId
      ? {
          ...item,
bookingFor: formatDate(selectedDate),
bookingDate: formatDate(selectedDate),
         timeSlot: selectedSlot.time,
        }
      : item
  );

  setBookings(updatedBookings);

  navigate("/amenities/booking", {
    state: {
      booking: updatedBookings.find(
        (b) => b.bookingId === booking.bookingId
      ),
    },
  });
};

return (
  <div className="p-6 bg-[#F8FAFC] min-h-screen">

    {/* ===========================
        Breadcrumb
    ============================ */}

    <Breadcrumbs items={breadcrumbItems} />



    {/* ===========================
        Header
    ============================ */}

    <div className="flex items-center justify-between mt-5 mb-6">

      <div>
        <h1 className="text-[40px] font-bold text-[#0F172A]">
          Re-schedule Booking
        </h1>

        <p className="text-[#64748B] text-lg mt-2">
          Select a new date and time for this booking.
        </p>
      </div>

      <button
        onClick={() =>
          navigate("/amenities/booking", {
            state: { booking },
          })
        }
        className="bg-white border border-[#E2E8F0] hover:bg-gray-50 px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition"
      >
        <i className="bi bi-arrow-left"></i>
        Back to Booking Details
      </button>

    </div>



  {/* ===========================
    Current Booking Details
=========================== */}


<div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 mb-4">
 <div className="mb-3 text-[18px] font-bold text-[#16216C]">
    <h2>Current Booking Details</h2>
  </div>

  <div className="grid grid-cols-12">

    {/* Left Section */}
    <div className="col-span-12 lg:col-span-4 flex items-center gap-5 pr-6">

      <img
        src={amenity?.images?.[0]}
        alt={amenity?.name}
        className="w-[140px] h-[110px] rounded-lg object-cover"
      />

      <div className="flex gap-4">

        <div
          className="
            w-12 h-12
            rounded-xl
            bg-[#EEF2FF]
            flex items-center justify-center
          "
        >
          <i
            className={`bi ${amenity?.icon || "bi-calendar-event"} text-[22px] text-[#4F46E5]`}
          ></i>
        </div>

        <div>

          <h3 className="text-[28px] font-bold text-[#16216C]">
            {amenity?.name}
          </h3>

          <p className="text-[15px] font-semibold text-[#16216C] mt-2">
            {amenity?.category}
          </p>

          <p className="text-[14px] text-[#64748B] mt-1">
            {amenity?.location}
          </p>

        </div>

      </div>

    </div>

    {/* Booking ID */}
    <div className="col-span-12 lg:col-span-3 border-l border-[#E2E8F0] px-6">

      <div className="mb-5">
        <p className="text-[13px] text-[#64748B]">
          Booking ID
        </p>

        <h4 className="text-[24px] font-bold text-[#16216C] mt-1">
          {booking?.bookingId}
        </h4>
      </div>

      <div className="mb-5">
        <p className="text-[13px] text-[#64748B]">
          Booked By
        </p>

        <h4 className="text-[18px] font-semibold text-[#16216C] mt-1">
          {booking?.residentName}
        </h4>
      </div>

      <div>
        <p className="text-[13px] text-[#64748B]">
          Booking Type
        </p>

        <span className="inline-flex mt-2 px-3 py-1 rounded-lg bg-[#EEF2FF] text-[#4F46E5] text-[13px] font-semibold">
          {booking?.bookingType || "Hourly"}
        </span>
      </div>

    </div>

    {/* Current Date & Time */}
    <div className="col-span-12 lg:col-span-3 border-l border-[#E2E8F0] px-6">

      <div className="mb-6 flex items-start gap-3">

        <i className="bi bi-calendar3 text-[#16216C] text-[18px]"></i>

        <div>

          <p className="text-[13px] text-[#64748B]">
            Current Date
          </p>

          <p className="text-[18px] font-bold text-[#16216C] mt-1">
            {booking?.bookingDate
              ? new Date(booking.bookingDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    weekday: "long",
                  }
                )
              : "-"
            }
          </p>

        </div>

      </div>

      <div className="flex items-start gap-3">

        <i className="bi bi-clock text-[#16216C] text-[18px]"></i>

        <div>

          <p className="text-[13px] text-[#64748B]">
            Current Time
          </p>

          <p className="text-[18px] font-bold text-[#16216C] mt-1">
            {booking?.timeSlot}
            <span className="text-[14px] font-medium text-[#64748B] ml-1">
              (1 Hour)
            </span>
          </p>

        </div>

      </div>

    </div>

    {/* Amount */}
    <div className="col-span-12 lg:col-span-2 border-l border-[#E2E8F0] pl-6">

      <div className="mb-5">

        <p className="text-[13px] text-[#64748B]">
          Price (Per Hour)
        </p>

        <p className="text-[20px] font-bold text-[#16216C] mt-1">
          ₹{booking?.hourlyPrice || booking?.amountPaid}
        </p>

      </div>

      <div className="mb-5">

        <p className="text-[13px] text-[#64748B]">
          Total Amount
        </p>

        <p className="text-[20px] font-bold text-[#16216C] mt-1">
          ₹{booking?.amountPaid}
        </p>

      </div>

      <div>

        <p className="text-[13px] text-[#64748B] mb-2">
          Status
        </p>

        <span className="inline-flex items-center px-4 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[14px] font-semibold">
          {booking?.status || "Confirmed"}
        </span>

      </div>

    </div>

  </div>

</div>


   {/* ===========================
    Main Layout
============================ */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Calendar */}

<div>

  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">

    {/* Title */}
    <h2 className="text-[18px] font-bold text-[#0F172A] mb-5">
      1. Select New Booking Date
    </h2>

    {/* Month Header */}
    <div className="flex items-center justify-between mb-6">

      <button
        onClick={() =>
          setCurrentDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              1
            )
          )
        }
        className="text-[#16216C] text-[20px]"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <h3 className="text-[22px] font-bold text-[#16216C]">
        {currentDate.toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        })}
      </h3>

      <button
        onClick={() =>
          setCurrentDate(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            )
          )
        }
        className="text-[#16216C] text-[20px]"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

    </div>

    {/* Days */}
    <div className="grid grid-cols-7 text-center mb-4">
      <div className="text-[14px] font-semibold text-[#16216C]">Sun</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Mon</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Tue</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Wed</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Thu</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Fri</div>
      <div className="text-[14px] font-semibold text-[#16216C]">Sat</div>
    </div>

    {/* Dates */}
    <div className="grid grid-cols-7 gap-y-5 text-center">

      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => (

        <div
          key={date}
          onClick={() =>
            setSelectedDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                date
              )
            )
          }
          className={`
            w-10 h-10 mx-auto
            flex items-center justify-center
            text-[15px] font-semibold
            cursor-pointer
            rounded-lg
            ${
              selectedDate.getDate() === date &&
              selectedDate.getMonth() === currentDate.getMonth() &&
              selectedDate.getFullYear() === currentDate.getFullYear()
                ? "bg-[#0D4BFF] text-white"
                : "text-[#16216C] hover:bg-[#EFF6FF]"
            }
          `}
        >
          {date}
        </div>

      ))}

    </div>

    {/* Selected Date */}
    <div className="mt-8 flex items-center gap-3 text-[#16216C]">

      <i className="bi bi-calendar-event text-[18px]"></i>

      <span className="text-[14px] font-medium">
        Selected Date:
      </span>

      <span className="text-[14px] font-bold">
        {selectedDate.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>

    </div>

  </div>

</div>

{/* Time Slots */}
<div>

  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">

    <div className="flex items-center justify-between mb-5">

      <div>
        <h2 className="text-[18px] font-bold text-[#0F172A]">
          Available Time Slots
        </h2>

        <p className="text-[14px] text-[#64748B] mt-1">
          Select a new time slot for rescheduling
        </p>
      </div>

    </div>

    <div className="grid grid-cols-3 gap-4">

      {amenity?.timeSlots?.map((slot) => (

        <button
          key={slot.id}
          onClick={() => slot.status === "available" && setSelectedSlot(slot)}
          className={`
            relative border rounded-xl p-4 text-center transition-all

            ${
              selectedSlot?.id === slot.id
                ? "border-[#22C55E] bg-[#F0FDF4]"
                : slot.status === "booked"
                ? "border-[#FECACA] bg-[#FEF2F2]"
                : slot.status === "maintenance"
                ? "border-[#FED7AA] bg-[#FFF7ED]"
                : "border-[#E2E8F0] bg-white hover:border-[#22C55E]"
            }
          `}
        >

          {selectedSlot?.id === slot.id && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
              <i className="bi bi-check text-white text-[12px]"></i>
            </div>
          )}

          <p
            className={`
              text-[15px] font-semibold
              ${
                slot.status === "booked"
                  ? "text-[#DC2626]"
                  : slot.status === "maintenance"
                  ? "text-[#EA580C]"
                  : "text-[#0F172A]"
              }
            `}
          >
            {slot.time}
          </p>

          <p className="text-[13px] text-[#64748B] mt-1">
            ₹{slot.price}
          </p>

          {slot.status === "booked" && (
            <p className="text-[12px] text-[#DC2626] font-medium mt-1">
              Booked
            </p>
          )}

          {slot.status === "maintenance" && (
            <p className="text-[12px] text-[#EA580C] font-medium mt-1">
              Maintenance
            </p>
          )}

        </button>

      ))}

    </div>

    {selectedSlot && (
      <div className="mt-5 border border-[#BBF7D0] bg-[#F0FDF4] rounded-xl p-4">

        <p className="text-[14px] font-medium text-[#15803D] flex items-center gap-2">
          <i className="bi bi-check-circle-fill"></i>

          Selected Time:
          {selectedSlot.time}
        </p>

      </div>
    )}

  </div>
  </div>




  {/* Booking Summary */}
  <div>

   {/* Booking Summary */}
{/* Booking Summary */}
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">

  <h2 className="text-[16px] font-bold text-[#0F172A] mb-3">
    3. Booking Summary
  </h2>

  {/* Current Booking */}
  <div className="border border-[#D9E2FF] rounded-lg overflow-hidden mb-3">

    <div className="bg-[#F5F8FF] px-3 py-2">
      <h3 className="text-[13px] font-bold text-[#1E40AF]">
        Current Booking (Old)
      </h3>
    </div>

    <div className="p-2.5 space-y-2">

      <div className="flex justify-between items-start">
        <p className="text-[12px] text-[#64748B]">
          Date & Time
        </p>

        <div className="text-right">
          <p className="text-[13px] font-semibold text-[#0F172A]">
           {booking?.bookingFor}
          </p>

          <p className="text-[11px] text-[#64748B]">
          {booking?.timeSlot}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-[12px] text-[#64748B]">
          Amount
        </p>

        <p className="text-[14px] font-bold text-[#0F172A]">
        ₹{booking?.amountPaid}
        </p>
      </div>

    </div>

  </div>


  {/* Arrow */}
  <div className="flex justify-center my-2">
    <i className="bi bi-arrow-down text-[18px] text-[#F97316]"></i>
  </div>


  {/* New Booking */}
  <div className="border border-[#CDEFD9] rounded-lg overflow-hidden mb-3">

    <div className="bg-[#ECFDF3] px-3 py-2">
      <h3 className="text-[13px] font-bold text-[#15803D]">
        New Booking (Re-scheduled)
      </h3>
    </div>

    <div className="p-2.5 space-y-2">

      <div className="flex justify-between items-start">
        <p className="text-[12px] text-[#64748B]">
          Date & Time
        </p>

        <div className="text-right">
          <p className="text-[13px] font-semibold text-[#0F172A]">
{selectedDate.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  weekday: "short",
})}
          </p>

          <p className="text-[11px] text-[#64748B]">
           {selectedSlot?.time || "Select Slot"}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-[12px] text-[#64748B]">
          Amount
        </p>

        <p className="text-[14px] font-bold text-[#0F172A]">
        ₹{selectedSlot?.price || booking?.amountPaid}
        </p>
      </div>

    </div>

  </div>


  {/* Reschedule Policy */}
  <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-2.5">

    <div className="flex items-start gap-2">

      <i className="bi bi-info-circle-fill text-[#D97706] text-[15px] mt-0.5"></i>

      <div>

        <h4 className="text-[12px] font-bold text-[#92400E] mb-1">
          Reschedule Policy
        </h4>

        <ul className="list-disc ml-4 space-y-0 text-[10px] text-[#92400E]">
          <li>
            You can re-schedule this booking up to 2 hours before the start time.
          </li>

          <li>
            Re-scheduling is allowed only once per booking.
          </li>
        </ul>

      </div>

    </div>

  </div>

</div>

  </div>



  {/* Reason for Reschedule */}
  <div>

   {/* Reason for Reschedule */}
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">


  <div className="mb-5">

    <h2 className="text-[18px] font-bold text-[#0F172A]">
      Reason for Reschedule
    </h2>


    <p className="text-[14px] text-[#64748B] mt-1">
      Please provide a reason for changing your booking schedule.
    </p>

  </div>



  <textarea
    placeholder="Enter reason for reschedule..."
    className="
      w-full
      h-32
      resize-none
      border border-[#E2E8F0]
      rounded-xl
      p-4
      text-[14px]
      text-[#0F172A]
      placeholder:text-[#94A3B8]
      focus:outline-none
      focus:ring-2
      focus:ring-[#2563EB]
    "
  />



  <div className="flex justify-end mt-3">

    <p className="text-[13px] text-[#64748B]">
      0 / 250 characters
    </p>

  </div>


</div>

  </div>



  {/* Additional Options */}
  <div>

{/* Additional Options */}
{/* Additional Options */}
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 min-h-[300px]">
  <h2 className="text-[20px] font-bold text-[#16216C] mb-14">
    5. Additional Options
  </h2>

  <div className="space-y-9">

    {/* Notify Resident */}
    <label className="flex items-start gap-3 cursor-pointer">

      <input
        type="checkbox"
        defaultChecked
        className="
          w-5 h-5 mt-1
          accent-[#1D4ED8]
          cursor-pointer
        "
      />

      <div>

        <p className="text-[16px] font-semibold text-[#16216C]">
          Notify resident about this change
        </p>

        <p className="text-[14px] text-[#64748B] mt-1">
          An email and SMS will be sent to the resident.
        </p>

      </div>

    </label>


    {/* Adjust Payment */}
    <label className="flex items-start gap-3 cursor-pointer">

      <input
        type="checkbox"
        className="
          w-5 h-5 mt-1
          accent-[#1D4ED8]
          cursor-pointer
        "
      />

      <div>

        <p className="text-[16px] font-semibold text-[#16216C]">
          Adjust payment if there is a price difference
        </p>

        <p className="text-[14px] text-[#64748B] mt-1">
          (Not applicable for same rate bookings)
        </p>

      </div>

    </label>

  </div>

</div>

  </div>



  {/* Quick Actions */}
  <div>
{/* Quick Actions */}
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 h-full min-h-[190px]">

  <h2 className="text-[20px] font-bold text-[#16216C] mb-5">
    Quick Actions
  </h2>

  <div
    className="
      border border-[#D6E4FF]
      bg-[#F8FAFF]
      rounded-xl
      p-5
      flex items-start gap-4
      h-[110px]
    "
  >
    <div
      className="
        w-10 h-10
        rounded-full
        border border-[#D6E4FF]
        flex items-center justify-center
        text-[#2952FF]
        text-[18px]
        shrink-0
      "
    >
      <i className="bi bi-clock-history"></i>
    </div>

    <p className="text-[14px] text-[#16216C] leading-7">
      By confirming, the current booking will be updated with the new
      date and time.
    </p>
  </div>

</div>

{/* Bottom Buttons */}
<div className="col-span-3 flex justify-end gap-4 mt-6">

  <button
    className="
      w-[180px]
      h-[52px]
      border border-[#E2E8F0]
      rounded-xl
      bg-white
      text-[#16216C]
      font-semibold
      hover:bg-[#F8FAFC]
    "
  >
    Cancel
  </button>

  <button
  onClick={handleReschedule}
  disabled={!selectedSlot}
  className={`
    w-[260px]
    h-[52px]
    rounded-xl
    text-white
    font-semibold
    flex items-center justify-center gap-3
    ${
      selectedSlot
        ? "bg-[#2952FF] hover:bg-[#1E40FF]"
        : "bg-gray-300 cursor-not-allowed"
    }
  `}
>
    <i className="bi bi-calendar-check"></i>
    Confirm Reschedule
  </button>

</div>

  </div>


</div>
</div>



);
}