import React, {  useMemo, useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Breadcrumbs from "../../../components/Breadcrumbs";

import {BookingCalendar} from "./BookingCalendar";
import TimeSlotGrid from "./TimeSlotGrid";
import BookingSummary from "./BookingSummary";
import BookingDetailsForm from "./BookingDetailsForm";
import BookingRules from "./BookingRules";
import BookingQuickActions from "./BookingQuickActions";

import { useAmenity } from "../../../context/AmenityContext";
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const AmenityBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Amenity Data from Amenities Page
  const amenity = location.state?.amenity;

  // Context
const {
  bookings,
  setBookings,
  amenities,
  setAmenities,
} = useAmenity();

  // Calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Selected Slot
  const [selectedSlot, setSelectedSlot] = useState(null);



const dayName = selectedDate.toLocaleDateString("en-US", {
  weekday: "short",
});


 const currentAmenity = amenities.find(
  (item) => item.id === amenity.id
);
useEffect(()=>{
 if(
  currentAmenity &&
  currentAmenity.availability !== "Available"
 ){
   navigate("/amenities");
 }
},[currentAmenity]);



const selectedDateString = formatDate(selectedDate);

const isSpecialTiming =
  currentAmenity?.availabilitySettings?.specialTimings?.some(
    (item) => {
      if (item.dateType === "Single Date") {
        return item.fromDate === selectedDateString;
      }

      return (
        selectedDateString >= item.fromDate &&
        selectedDateString <= item.toDate
      );
    }
  );




const bookingSlots = useMemo(() => {
const selectedDateString = `${selectedDate.getFullYear()}-${String(
  selectedDate.getMonth() + 1
).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
const special = currentAmenity?.availabilitySettings?.specialTimings?.find(
  (item) => {
    if (item.dateType === "Single Date") {
      return item.fromDate === selectedDateString;
    }

    return (
      selectedDateString >= item.fromDate &&
      selectedDateString <= item.toDate
    );
  }
);
console.log("CURRENT AMENITY", currentAmenity);

console.log(
  "SPECIAL TIMINGS",
  currentAmenity?.availabilitySettings?.specialTimings
);

console.log(
  "BLOCKED DATES",
  currentAmenity?.availabilitySettings?.blockedDates
);




const isBlocked = currentAmenity?.availabilitySettings?.blockedDates?.some(
  (item) => item.date === selectedDateString
);



if (isBlocked) {
  return [];
}


if (special) {
  return [
    {
      id: 1,
      time: special.allDay
        ? "Not Available"
        : `${special.fromTime} - ${special.toTime}`,
      status: special.allDay ? "blocked" : "available",
      price: amenity?.timeSlots?.[0]?.price || 1000,
    },
  ];
}
if (!currentAmenity?.availabilitySettings?.weeklySlots) return [];

  const today = currentAmenity.availabilitySettings.weeklySlots.find(
    (day) => day.day === dayName
  );
  






  if (!today) return [];
return today.slots.map((slot,index)=>{

  const slotTime = `${slot.from} - ${slot.to}`;
const isBooked = bookings?.some((booking)=>{
     console.log("BOOKING DATE CHECK", booking.bookingDate);
  console.log("BOOKING TIME CHECK", booking.timeSlot);
  console.log("CURRENT DATE", formatDate(selectedDate));
  console.log("CURRENT SLOT", slotTime);

  return (
    Number(booking.amenityId) === Number(currentAmenity.id) &&
booking.bookingDate === formatDate(selectedDate) &&
    booking.timeSlot?.trim() === slotTime.trim()
  );

});

  console.log("SLOT CHECK", {
    slotTime,
    isBooked,
    bookings
  });

  return {
    id:index+1,
    time:slotTime,
    status:isBooked ? "booked" : "available",
    price: amenity?.timeSlots?.[0]?.price || 1500,
  };

});
},  [currentAmenity, dayName, amenity, bookings, selectedDate]);


  // Booking Form
  const [formData, setFormData] = useState({
    residentName: "",
    flatNumber: "",
    apartmentName: "",
    mobile: "",
    email: "",
    purpose: "",
    numberOfPeople: "",
    notes: "",
    agreed: false,
  });


  const [errors, setErrors] = useState({});

  // Pricing
  const pricePerHour = Number(amenity?.price || 1500);

  const cleaningCharges = 500;


 


  const totalAmount = useMemo(() => {
    return selectedSlot ? pricePerHour + cleaningCharges : 0;
  }, [selectedSlot, pricePerHour]);

  // Breadcrumb
  const breadcrumbItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Amenities",
      path: "/amenities",
    },
    {
      label: "Amenity Booking",
    },
  ];

  // Confirm Booking
  const handleConfirmBooking = () => {
 console.log("handleConfirmBooking called");
 
  let newErrors = {};

const today = new Date();

const maxBookingDate = new Date();
maxBookingDate.setDate(
  today.getDate() + Number(amenity?.advanceBookingDays || 0)
);

if(selectedDate > maxBookingDate){
  newErrors.date =
  `Booking allowed only ${amenity?.advanceBookingDays} days in advance`;
}



  if(!selectedSlot){
    newErrors.slot = "Please select time slot";
  }


  if(!formData.purpose){
    newErrors.purpose = "Purpose / Event is required";
  }


  if(!formData.numberOfPeople){
    newErrors.numberOfPeople = "Expected attendees is required";
  }


  if(!formData.residentName){
    newErrors.residentName = "Resident / Booker is required";
  }


  if(!formData.mobile){
    newErrors.mobile = "Contact number is required";
  }
if (!formData.agreed) {
  newErrors.agreed =
    "Please accept the rules & guidelines";
}


  setErrors(newErrors);

console.log("errors =>", newErrors);

  if(Object.keys(newErrors).length > 0){
    return;
    
  }




  const newBooking = {

    id: Date.now(),
        amenityName: amenity?.name,

    amenityLocation: amenity?.location,

    amenityCategory: amenity?.category,

  amenityId: currentAmenity.id,

    bookingId:`BK-${Date.now()}`,

    residentName: formData.residentName,

    flatNumber: formData.flatNumber,

    apartmentName: formData.apartmentName,

    mobile: formData.mobile,

    email: formData.email,

   bookingDate: formatDate(selectedDate),
timeSlot: selectedSlot.time,

bookingFor: formatDate(selectedDate),

    status:"Confirmed",

    purpose:formData.purpose,

    numberOfPeople:formData.numberOfPeople,

    duration:"1 Hour",

    paymentStatus:"Pending",

    amountPaid:totalAmount,

    notes:formData.notes,

    createdAt:new Date().toLocaleString(),

     

  };


const updatedBookings = [
  ...bookings,
  newBooking
];

setBookings(updatedBookings);

localStorage.setItem(
  "amenityBookings",
  JSON.stringify(updatedBookings)
);
setAmenities((prev) =>
  prev.map((item) => {
    if (item.id !== amenity.id) return item;

    return {
        
      ...item,
      timeSlots: item.timeSlots.map((slot) =>
        slot.id === selectedSlot.id
          ? {
              ...slot,
              status: "booked",
            }
          : slot
      ),
    };
  })
  
);


navigate("/amenities/booking", {
  state:{
    booking:newBooking
  }
});


};


  // Reset
  const handleReset = () => {
    setSelectedSlot(null);

    setFormData({
      residentName: "",
      flatNumber: "",
      apartmentName: "",
      mobile: "",
      email: "",
      purpose: "",
      numberOfPeople: "",
      notes: "",
      agreed: false,
    });
    setErrors({});
  };

  
return (
  <div className="min-h-screen bg-[#F8FAFC] p-6">

    {/* Breadcrumb */}
    <Breadcrumbs items={breadcrumbItems} />

    {/* Header */}
    <div className="mt-5 flex items-center justify-between">

      <div>
        <h1 className="text-[30px] font-bold text-[#0F172A]">
          Amenity Booking
        </h1>

        <p className="mt-1 text-[15px] text-[#64748B]">
          Book amenities for residents with real-time availability.
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 py-3 text-[15px] font-medium text-[#334155] transition hover:bg-[#F8FAFC]"
      >
        <i className="bi bi-arrow-left"></i>
        Back to Amenities
      </button>

    </div>

    {/* Amenity Overview Card */}
    <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">

      <div className="flex gap-6">

        {/* Image */}
        <div className="h-[180px] w-[280px] overflow-hidden rounded-2xl bg-[#F1F5F9]">

          <img
            src={amenity?.images?.[0] || amenity?.image}
            alt={amenity?.name}
            className="h-full w-full object-cover"
          />

        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between">

          <div>

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-[26px] font-bold text-[#0F172A]">
                  {amenity?.name}
                </h2>

                <p className="mt-2 text-[15px] text-[#64748B]">
                  {amenity?.description}
                </p>

              </div>

              <span className="rounded-full bg-[#DCFCE7] px-4 py-2 text-[14px] font-semibold text-[#16A34A]">
                {amenity?.status || "Available"}
              </span>

            </div>

            <div className="mt-6 grid grid-cols-6 gap-5">

                <div>
  <p className="text-[13px] text-[#64748B]">
    Category
  </p>

  <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
    {amenity?.category}
  </h4>
</div>

<div>
  <p className="text-[13px] text-[#64748B]">
    Location
  </p>

  <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
    {amenity?.location}
  </h4>
</div>










              <div>
                <p className="text-[13px] text-[#64748B]">
                  Capacity
                </p>

                <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
                  {amenity?.capacity} People
                </h4>
              </div>

             <div>
  <p className="text-[13px] text-[#64748B]">
    Booking Price
  </p>

  <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
    ₹{amenity?.timeSlots?.[0]?.price ?? 0}
  </h4>
</div>

              <div>
                <p className="text-[13px] text-[#64748B]">
                  Advance Notice
                </p>

                <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
                {amenity?.advanceBookingDays || 0} Days
                </h4>
              </div>

              <div>
                <p className="text-[13px] text-[#64748B]">
                  Booking Type
                </p>

                <h4 className="mt-1 text-[18px] font-semibold text-[#0F172A]">
                  Hourly
                </h4>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* Calendar + Slots + Summary */}
    <div className="mt-6 grid grid-cols-12 gap-6">

      <div className="col-span-3">
        <BookingCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
           amenity={amenity}
        />
      </div>

      <div className="col-span-6">
       {bookingSlots.length === 0 ? (
  <div className="p-8 rounded-xl border border-red-200 bg-red-50 text-center">
    <i className="bi bi-calendar-x text-4xl text-red-500"></i>

    <h3 className="mt-3 text-lg font-semibold text-red-600">
      Amenity is not available on this date
    </h3>

    <p className="text-gray-500 mt-2">
      Please choose another date.
    </p>
  </div>
  
) : (
 <TimeSlotGrid
  timeSlots={bookingSlots}
  selectedDate={selectedDate}
  selectedSlot={selectedSlot}
  setSelectedSlot={setSelectedSlot}
  error={errors.slot}
  isSpecialTiming={isSpecialTiming}
/>
)}
      </div>

      <div className="col-span-3">
        <BookingSummary
          amenity={amenity}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          totalAmount={totalAmount}
        />
      </div>

    </div>

    {/* Form + Rules + Actions */}
    <div className="mt-6 grid grid-cols-12 gap-6">

      <div className="col-span-6">
        <BookingDetailsForm
  formData={formData}
  setFormData={setFormData}
  errors={errors}
/>
      </div>

      <div className="col-span-3">
        <BookingRules
          formData={formData}
          setFormData={setFormData}
           errors={errors}
        />
      </div>

      <div className="col-span-3">
 <BookingQuickActions
  onConfirm={handleConfirmBooking}
  onReset={handleReset}
  isBlocked={bookingSlots.length === 0}
/>
</div>

    </div>

  </div>
);
}

export default AmenityBooking;