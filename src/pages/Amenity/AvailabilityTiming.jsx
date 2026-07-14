import React, { useMemo, useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAmenity } from "../../context/AmenityContext";
import Breadcrumbs from "../../components/Breadcrumbs";

export const AvailabilityTiming = () => {

const navigate = useNavigate();

const { id } = useParams();
console.log(id);

const { amenities, setAmenities } = useAmenity();

const amenity = useMemo(() => {

return amenities.find((item) => item.id === Number(id));

}, [amenities, id]);


// BLOcekd dates
const [blockedDates, setBlockedDates] = useState([]);
const handleDelete = (id) => {
  setBlockedDates(
    blockedDates.filter((item) => item.id !== id)
  );
};

const [showBlockedForm, setShowBlockedForm] = useState(false);

const [blockedForm, setBlockedForm] = useState({
  date: "",
  reason: "",
});

const handleAddBlockedDate = () => {
  const selectedDate = new Date(blockedForm.date);

  const day = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const newBlockedDate = {
    id: Date.now(),
    date: blockedForm.date,
    day: day,
    reason: blockedForm.reason,
  };

  setBlockedDates([...blockedDates, newBlockedDate]);

  setBlockedForm({
    date: "",
    reason: "",
  });

  setShowBlockedForm(false);
};



const [weeklyAvailability, setWeeklyAvailability] = useState([]);
useEffect(() => {
  if (amenity) {
    setWeeklyAvailability(
      amenity.weeklyAvailability.map((day) => ({
        ...day,
        enabled: day.status === "Open",
        slots:
          amenity.availabilitySettings?.weeklySlots?.find(
            (d) => d.day === day.day
          )?.slots || [{ from: "", to: "", error: "" }],
      }))
    );

    setBlockedDates(
      amenity.availabilitySettings?.blockedDates || []
    );

    setSpecialTimings(
  amenity.availabilitySettings?.specialTimings || []
);
  }
}, [amenity]);

const [specialTiming, setSpecialTiming] = useState({

dateType: "Single Date",

fromDate: "",

toDate: "",

allDay: false,

fromTime: "",

toTime: "",

});


const [specialTimings, setSpecialTimings] = useState([]);




if (!amenity) {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
      <h2 className="text-2xl font-bold text-[#334155]">
        Amenity Not Found
      </h2>
    </div>
  );
}


const timeOptions = [

"05:00 AM",
"05:30 AM",
"06:00 AM",
"06:30 AM",
"07:00 AM",
"07:30 AM",
"08:00 AM",
"08:30 AM",
"09:00 AM",
"09:30 AM",
"10:00 AM",
"10:30 AM",
"11:00 AM",
"11:30 AM",
"12:00 PM",
"12:30 PM",
"01:00 PM",
"01:30 PM",
"02:00 PM",
"02:30 PM",
"03:00 PM",
"03:30 PM",
"04:00 PM",
"04:30 PM",
"05:00 PM",
"05:30 PM",
"06:00 PM",
"06:30 PM",
"07:00 PM",
"07:30 PM",
"08:00 PM",
"08:30 PM",
"09:00 PM",
"09:30 PM",
"10:00 PM",

];

const handleToggle = (index) => {

const updated = [...weeklyAvailability];

updated[index].enabled = !updated[index].enabled;

updated[index].status = updated[index].enabled ? "Open" : "Closed";

setWeeklyAvailability(updated);

};



const handleTimeChange = (dayIndex, slotIndex, field, value) => {
  const updated = [...weeklyAvailability];

  updated[dayIndex].slots[slotIndex][field] = value;

  const slot = updated[dayIndex].slots[slotIndex];

  slot.error = "";

  if (slot.from && slot.to) {
    if (slot.from === slot.to) {
      slot.error = "From and To time cannot be the same";
    } else if (slot.from > slot.to) {
      slot.error = "To time must be later than From time";
    }
  }

  setWeeklyAvailability(updated);
};




const handleAddSlot = (dayIndex) => {

const updated = [...weeklyAvailability];

updated[dayIndex].slots.push({

from: "",

to: "",
error: "",

});

setWeeklyAvailability(updated);

};

const handleDeleteSlot = (dayIndex, slotIndex) => {

const updated = [...weeklyAvailability];

updated[dayIndex].slots.splice(slotIndex, 1);

if (updated[dayIndex].slots.length === 0) {

updated[dayIndex].slots.push({

from: "",

to: "",
error: "",

});

}

setWeeklyAvailability(updated);

};
const handleAddSpecialTiming = () => {
  if (!specialTiming.fromDate) return;

  const newTiming = {
    id: Date.now(),
    ...specialTiming,
  };

  const updatedSpecialTimings = [
    ...specialTimings,
    newTiming,
  ];

  setSpecialTimings(updatedSpecialTimings);

  console.log(
    "UPDATED SPECIAL TIMINGS",
    updatedSpecialTimings
  );

  setSpecialTiming({
    dateType: "Single Date",
    fromDate: "",
    toDate: "",
    allDay: false,
    fromTime: "",
    toTime: "",
  });
};

const handleSaveChanges = () => {
  const updatedAmenities = amenities.map((item) => {
    if (item.id !== amenity.id) {
      return item;
    }

    return {
      ...item,

      weeklyAvailability: weeklyAvailability.map((day) => ({
        day: day.day,
        status: day.enabled ? "Open" : "Closed",
      })),

      availabilitySettings: {
        weeklySlots: weeklyAvailability.map((day) => ({
          day: day.day,
          slots: day.slots,
        })),

        specialTimings,

        blockedDates,
      },
    };
  });
console.log(
  "SAVING SPECIAL TIMINGS",
  specialTimings
);

  setAmenities(updatedAmenities);

  navigate(-1);
};


return (

  <div className="min-h-screen bg-[#F8FAFC] p-6">

     <Breadcrumbs
      items={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Amenities", path: "/amenities" },
        { label: "Amenity Schedule", path: "/amenity-schedule" },
        { label: "Availability Timings" },
      ]}
    />

    {/* Header */}
    <div className="flex items-start justify-between mb-8">

      <div>
        <h1 className="text-[36px] font-bold leading-none text-[#0F172A]">
          Availability Timings
        </h1>

        <p className="text-[16px] text-[#64748B] mt-3">
          Manage weekly availability and time slots for this amenity.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="h-12 px-6 rounded-xl border border-[#D9E2F2] bg-white hover:bg-[#F8FAFC] text-[#0F172A] font-medium flex items-center gap-2"
        >
          <i className="bi bi-arrow-left"></i>
          Back
        </button>

        <button
          onClick={handleSaveChanges}
          className="h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold flex items-center gap-2"
        >
          <i className="bi bi-floppy"></i>
          Save Changes
        </button>

      </div>
    </div>

    {/* Overview Card */}
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-8">

      <div className="grid grid-cols-6">

        <div className="col-span-2 flex items-center gap-5">

          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${amenity.iconBg}`}
          >
            <i
              className={`bi ${amenity.icon} text-[36px] ${amenity.iconColor}`}
            ></i>
          </div>

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-[30px] font-bold text-[#0F172A]">
                {amenity.name}
              </h2>

              <span
                className={`${
                  amenity.status === "Active"
                    ? "bg-[#DCFCE7] text-[#15803D]"
                    : "bg-[#FEE2E2] text-[#DC2626]"
                } px-3 py-1 rounded-full text-[13px] font-semibold`}
              >
                {amenity.status}
              </span>

            </div>

            <p className="text-[16px] text-[#64748B] mt-2">
              {amenity.location}
            </p>

            <p className="text-[15px] text-[#64748B] mt-1">
              {amenity.bookingType} • {amenity.category}
            </p>

          </div>

        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-[14px] text-[#64748B]">
            Operating Hours
          </p>

          <h3 className="text-[20px] font-semibold text-[#0F172A] mt-2">
            {amenity.operatingHours}
          </h3>
        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-[14px] text-[#64748B]">
            Advance Booking
          </p>

          <h3 className="text-[20px] font-semibold text-[#0F172A] mt-2">
            {amenity.advanceBookingAllowed}
          </h3>
        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-[14px] text-[#64748B]">
            Advance Booking Days
          </p>

          <h3 className="text-[20px] font-semibold text-[#0F172A] mt-2">
            {amenity.advanceBookingDays}
          </h3>
        </div>

        <div className="border-l border-[#E2E8F0] pl-8">
          <p className="text-[14px] text-[#64748B]">
            Allow Repeated Booking
          </p>

          <h3 className="text-[20px] font-semibold text-[#0F172A] mt-2">
            {amenity.repeatedBooking}
          </h3>
        </div>

      </div>

    </div>




    <div className="grid grid-cols-3 gap-6 mt-6">

  {/* LEFT SIDE */}
  <div className="col-span-2 space-y-6">

    {/* Weekly Availability */}
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-[#E2E8F0]">
        <h2 className="text-[22px] font-bold text-[#0F172A]">
          Weekly Availability
        </h2>

        <p className="text-[15px] text-[#64748B] mt-1">
          Set availability status and time slots for each day of the week.
        </p>
      </div>

      <div>
        
{weeklyAvailability.map((day, dayIndex) => (

<div key={day.day} className="border-b border-[#EEF2F7] px-6 py-5 last:border-b-0">

<div className="flex items-start">

<div className="w-[130px] pt-3">

<h3 className="text-[16px] font-semibold text-[#0F172A]">

{day.day}

</h3>

</div>

<div className="w-[110px] pt-2">

<button onClick={() => handleToggle(dayIndex)} className={`relative w-[46px] h-[26px] rounded-full transition-all ${day.enabled ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}>

<span className={`absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white transition-all ${day.enabled ? "left-[22px]" : "left-[2px]"}`}></span>

</button>

</div>



<div className="flex-1 space-y-3">

{day.enabled ? (day.slots.map((slot, slotIndex) => (

<div key={slotIndex} className="flex items-center gap-3">


<div className="relative">

<i className="bi bi-clock absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"></i>

<select value={slot.from} onChange={(e)=>handleTimeChange(dayIndex,slotIndex,"from",e.target.value)} className="w-[170px] h-11 pl-11 pr-10 rounded-xl border border-[#D9E2F2] outline-none appearance-none bg-white">

<option value="">

From

</option>

{timeOptions.map((time)=>(

<option key={time} value={time}>

{time}

</option>

))}

</select>
<div> 
<i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
{slot.error && (
  <div className="ml-[10px] mt-1 text-sm text-red-500">
    {slot.error}
  </div>
)}
</div>

</div>


<div className="relative">

<i className="bi bi-clock absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"></i>

<select value={slot.to} onChange={(e)=>handleTimeChange(dayIndex,slotIndex,"to",e.target.value)} className="w-[170px] h-11 pl-11 pr-10 rounded-xl border border-[#D9E2F2] outline-none appearance-none bg-white">

<option value="">

To

</option>

{timeOptions.map((time)=>(

<option key={time} value={time}>

{time}

</option>

))}

</select>

<i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

</div>


<button onClick={() => handleAddSlot(dayIndex)} className="h-11 px-5 rounded-xl border border-[#2563EB] text-[#2563EB] font-semibold flex items-center gap-2 hover:bg-[#EFF6FF] transition-all">

<i className="bi bi-plus-lg"></i>

Add Slot

</button>


<button onClick={() => handleDeleteSlot(dayIndex,slotIndex)} className="w-11 h-11 rounded-xl border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-all">

<i className="bi bi-trash text-[#94A3B8]"></i>

</button>

</div>

))

) : (

<div className="h-11 flex items-center text-[15px] text-[#94A3B8]">

Not Available

</div>

)}

</div>

</div>

</div>
))}

    </div>
    </div> {/* Weekly Availability Card End */}

    {/* NOTE */}
    <div className="rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] p-5">

      <div className="flex items-start gap-3">

        <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center">
          <i className="bi bi-info-circle text-[#2563EB]"></i>
        </div>

        <div>

          <h4 className="text-[16px] font-semibold text-[#0F172A]">
            Note
          </h4>

          <ul className="mt-3 space-y-2 text-[14px] text-[#475569]">
            <li>• Weekly schedule is applied by default.</li>
            <li>• Special timings override weekly availability.</li>
            <li>• Save Changes to apply updates.</li>
          </ul>

        </div>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}
 <div className="space-y-6">

  {/* Add Special Timing */}

  <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm h-fit">

    <div className="px-6 py-5 border-b border-[#E2E8F0]">

      <h2 className="text-[22px] font-bold text-[#0F172A]">
        Add Special Timing
      </h2>

      <p className="text-[15px] text-[#64748B] mt-1">
        Override weekly schedule for holidays or special events.
      </p>

    </div>

    <div className="p-6 space-y-5">

      <div>

        <label className="block text-[14px] font-semibold text-[#334155] mb-2">
          Date Type
        </label>

        <div className="relative">

          <select value={specialTiming.dateType} onChange={(e)=>setSpecialTiming({...specialTiming,dateType:e.target.value})} className="w-full h-11 px-4 pr-10 rounded-xl border border-[#D9E2F2] outline-none appearance-none bg-white">

            <option value="Single Date">Single Date</option>

            <option value="Date Range">Date Range</option>

          </select>

          <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

        </div>

      </div>

      <div>

        <label className="block text-[14px] font-semibold text-[#334155] mb-2">
          From Date
        </label>

        <div className="relative">

          <input type="date" value={specialTiming.fromDate} onChange={(e)=>setSpecialTiming({...specialTiming,fromDate:e.target.value})} className="w-full h-11 px-4 rounded-xl border border-[#D9E2F2] outline-none"/>

          <i className="bi bi-calendar3 absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

        </div>

      </div>

      {specialTiming.dateType==="Date Range" && (

        <div>

          <label className="block text-[14px] font-semibold text-[#334155] mb-2">
            To Date
          </label>

          <div className="relative">

            <input type="date" value={specialTiming.toDate} onChange={(e)=>setSpecialTiming({...specialTiming,toDate:e.target.value})} className="w-full h-11 px-4 rounded-xl border border-[#D9E2F2] outline-none"/>

            <i className="bi bi-calendar3 absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

          </div>

        </div>

      )}

      <label className="flex items-center gap-3 cursor-pointer">

        <input type="checkbox" checked={specialTiming.allDay} onChange={(e)=>setSpecialTiming({...specialTiming,allDay:e.target.checked})} className="w-4 h-4 accent-[#2563EB]"/>

        <span className="text-[15px] text-[#334155]">
          All Day Not Available
        </span>

      </label>

      {!specialTiming.allDay && (

        <div className="space-y-4">

          <div>

            <label className="block text-[14px] font-semibold text-[#334155] mb-2">
              From Time
            </label>

            <div className="relative">

              <i className="bi bi-clock absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"></i>

              <select value={specialTiming.fromTime} onChange={(e)=>setSpecialTiming({...specialTiming,fromTime:e.target.value})} className="w-full h-11 pl-11 pr-10 rounded-xl border border-[#D9E2F2] appearance-none outline-none bg-white">

                <option value="">Select Time</option>

                {timeOptions.map((time)=>(
                  <option key={time} value={time}>{time}</option>
                ))}

              </select>

              <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

            </div>

          </div>

          <div>

            <label className="block text-[14px] font-semibold text-[#334155] mb-2">
              To Time
            </label>

            <div className="relative">

              <i className="bi bi-clock absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"></i>

              <select value={specialTiming.toTime} onChange={(e)=>setSpecialTiming({...specialTiming,toTime:e.target.value})} className="w-full h-11 pl-11 pr-10 rounded-xl border border-[#D9E2F2] appearance-none outline-none bg-white">

                <option value="">Select Time</option>

                {timeOptions.map((time)=>(
                  <option key={time} value={time}>{time}</option>
                ))}

              </select>

              <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

            </div>

          </div>

        </div>

      )}

      <button onClick={handleAddSpecialTiming} className="w-full h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold flex items-center justify-center gap-2">

        <i className="bi bi-plus-lg"></i>

        Add Special Timing

      </button>
      {specialTimings.length === 0 ? (
  <div className="text-center py-4 text-gray-500">
    No special timings added yet.
  </div>
) : (
  specialTimings.map((item) => (
    <div
      key={item.id}
      className="border rounded-xl p-3 mb-3 flex justify-between items-center"
    >
      <div>
        <p className="font-medium">
          {item.dateType === "Single Date"
            ? item.fromDate
            : `${item.fromDate} to ${item.toDate}`}
        </p>

        <p className="text-gray-500 text-sm">
          {item.allDay
            ? "All Day Not Available"
            : `${item.fromTime} - ${item.toTime}`}
        </p>
      </div>

      <button
        onClick={() =>
          setSpecialTimings(
            specialTimings.filter(
              (timing) => timing.id !== item.id
            )
          )
        }
      >
        <i className="bi bi-trash text-red-500"></i>
      </button>
    </div>
  ))
)}

    </div>

  </div>


{/* Blocked Dates */}
<div className="bg-white border rounded-2xl p-6">

  <h2 className="text-xl font-bold">
    Blocked Dates
  </h2>

  <p className="text-gray-500 mt-1 mb-4">
    Manage dates when this amenity is not available
  </p>

  <button
    onClick={() => setShowBlockedForm(true)}
    className="w-full h-11 border border-blue-600 text-blue-600 rounded-xl mb-4"
  >
    + Add Blocked Date
  </button>

  {/* Form */}
  {showBlockedForm && (
    <div className="border rounded-xl p-4 mb-4 bg-gray-50">
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 text-sm font-medium">
            Date
          </label>

          <input
            type="date"
            value={blockedForm.date}
            onChange={(e) =>
              setBlockedForm({
                ...blockedForm,
                date: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Reason
          </label>

          <input
            type="text"
            placeholder="Maintenance"
            value={blockedForm.reason}
            onChange={(e) =>
              setBlockedForm({
                ...blockedForm,
                reason: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowBlockedForm(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleAddBlockedDate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  )}

  {/* List */}
  {blockedDates.length === 0 ? (
    <div className="text-center py-6 text-gray-500">
      No blocked dates added yet.
    </div>
  ) : (
    blockedDates.map((item) => (
      <div
        key={item.id}
        className="flex justify-between items-center border rounded-lg p-3 mb-2"
      >
        <div className="flex gap-8">
          <span>{item.date}</span>
          <span>{item.day}</span>
          <span>{item.reason}</span>
        </div>

        <button onClick={() => handleDelete(item.id)}>
          <i className="bi bi-trash text-red-500"></i>
        </button>
      </div>
    ))
  )}

</div>

</div>
</div>
</div>








)
}




