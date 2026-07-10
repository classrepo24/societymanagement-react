import React, { useState } from "react";

import ScheduleCalendar from "./ScheduleCalendar";
import ScheduleTable from "./ScheduleTable";
import AmenityDetails from "./AmenityDetails";
// import BookingModal from "./BookingModal";
// import FilterModal from "./FilterModal";
import { useRef } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";


// Context API )
import { useAmenity } from "../../../context/AmenityContext";
import {  useNavigate } from "react-router-dom";

const AmenitySchedule = () => {
  const { amenities, bookings } = useAmenity();

  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [viewMode, setViewMode] = useState("day");
  const today = new Date().toISOString().split("T")[0];

const navigate =useNavigate()
  
const dayRef = useRef(null);
const weekRef = useRef(null);
const monthRef = useRef(null);



const selectedAmenityData =
  amenities?.find(
    (item) => String(item.id) === String(selectedAmenity)
  ) || amenities?.[0];



  const breadcrumbItems = [
  { label: "Dashboard", path: "/" },
  { label: "Amenities", path: "/amenities" },
  { label: "Amenity Schedule" },
];

  return (
<div className="px-7 pt-5 pb-6 bg-[#f5f7fb]">

  {/* Breadcrumb */}
  <Breadcrumbs items={breadcrumbItems} />
  {/* Heading + Actions */}
  <div className="flex items-end justify-between mt-5">

    {/* Left */}
    <div>

      <h1 className="text-[46px] leading-none font-bold text-[#16216C]">
        Amenity Schedule
      </h1>

      <p className="mt-3 text-[18px] text-[#16216C] font-medium">
        Manage and view amenity availability and bookings.
      </p>

    </div>

    {/* Right */}
    <div className="flex items-center gap-4">

      {/* Amenity */}

      <div className="relative">

        <i className="bi bi-barbell absolute left-4 top-1/2 -translate-y-1/2 text-[#16216C]"></i>

        <select
          value={selectedAmenity}
          onChange={(e) =>
            setSelectedAmenity(e.target.value)
          }
          className="w-[210px] h-[52px] border border-[#D8E2F0] rounded-lg pl-11 pr-10 text-[15px] font-semibold text-[#16216C] appearance-none outline-none bg-white"
        >
          {amenities?.map((item) => (
            <option
              key={item.id || item._id}
              value={item.id || item._id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#16216C]"></i>

      </div>

      {/* Date */}

      <div className="relative">
  <i className="bi bi-calendar3 absolute left-4 top-1/2 -translate-y-1/2 text-[#16216C]"></i>

  <input
  type="date"
  defaultValue={new Date().toISOString().split("T")[0]}
  min={new Date().toISOString().split("T")[0]}
  className="w-[170px] h-[52px] border border-[#D8E2F0] rounded-lg pl-11 pr-4 outline-none text-[15px] font-semibold text-[#16216C]"
/>
</div>

     
    <button
  onClick={() =>
    navigate("/amenities/amenitybooking", {
      state: {
        amenity: selectedAmenityData,
      },
    })
  }
  className="w-[170px] h-[52px] rounded-lg bg-[#0D4CFF] hover:bg-[#0A43E5] text-white font-semibold flex items-center justify-center gap-2"
>
  <i className="bi bi-plus-lg"></i>
  New Booking
</button>

    </div>

  </div>



        {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 mt-9">

        {/* Left Section */}
        <div className="col-span-12 xl:col-span-4 space-y-6">

  <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-5">
    <h2 className="text-lg font-semibold text-[#111827] mb-5">
      Calendar
    </h2>

 <ScheduleCalendar
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  amenity={selectedAmenityData}
  bookings={bookings}
/>
  </div>

  <AmenityDetails amenity={selectedAmenityData} />

</div>

        {/* Right Section */}
        <div className="col-span-12 xl:col-span-8">

          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 border-b border-[#E5E7EB]">

              <div>
                <h2 className="text-lg font-semibold text-[#111827]">
                  Schedule
                </h2>

                <p className="text-sm text-[#6B7280] mt-1">
                  View and manage bookings
                </p>
              </div>


              <div className="flex items-center gap-3">

  <button
    onClick={() => {
      setViewMode("day");
      dayRef.current?.showPicker();
    }}
    className="px-4 py-2 rounded-lg border flex items-center gap-2"
  >
    <i className="bi bi-calendar-day"></i>
    Day
  </button>

  <button
    onClick={() => {
      setViewMode("week");
      weekRef.current?.showPicker();
    }}
    className="px-4 py-2 rounded-lg border flex items-center gap-2"
  >
    <i className="bi bi-calendar-week"></i>
    Week
  </button>

  <button
    onClick={() => {
      setViewMode("month");
      monthRef.current?.showPicker();
    }}
    className="px-4 py-2 rounded-lg border flex items-center gap-2"
  >
    <i className="bi bi-calendar3"></i>
    Month
  </button>

  {/* Day Picker */}
  <input
    ref={dayRef}
    type="date"
    className="absolute opacity-0 w-0 h-0"
    onChange={(e) => setSelectedDate(new Date(e.target.value))}
  />

  {/* Week Picker */}
  <input
    ref={weekRef}
    type="week"
    className="absolute opacity-0 w-0 h-0"
    onChange={(e) => console.log("Week:", e.target.value)}
  />

  {/* Month Picker */}
  <input
    ref={monthRef}
    type="month"
    className="absolute opacity-0 w-0 h-0"
    onChange={(e) => console.log("Month:", e.target.value)}
  />

</div>



            </div>

            <ScheduleTable
              amenity={selectedAmenityData}
              selectedDate={selectedDate}
              viewMode={viewMode}
            />

          </div>

        </div>

      </div>
      </div>
           

    
  );
};

export default AmenitySchedule;