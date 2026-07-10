import React from "react";

import { useAmenity } from "../../../context/AmenityContext";


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
const ScheduleTable = ({
  amenity,
  selectedDate,
  viewMode,
}) => {

  // Time Slots (Exactly like UI)
  const timeSlots = [
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

 


  // Badge Color
  const badgeColor = (status) => {

    switch (status) {

      case "Confirmed":
        return "bg-[#E8F5E9] text-[#16A34A]";

      case "Pending":
        return "bg-[#FFF7E6] text-[#F59E0B]";

      case "Maintenance":
        return "bg-[#FDECEC] text-[#DC2626]";

      default:
        return "bg-gray-100 text-gray-600";
    }

  };

  // Left Border Color
  const bookingColor = (color) => {

    switch (color) {

      case "blue":
        return "border-[#2563EB]";

      case "green":
        return "border-[#16A34A]";

      case "orange":
        return "border-[#F59E0B]";

      case "red":
        return "border-[#DC2626]";

      default:
        return "border-gray-300";
    }

  };
const { bookings } = useAmenity();
bookings.forEach((b) => {
  
});
  
    return (
    <div className="overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* Header */}

        <thead>
  <tr className="bg-[#F8FAFC] border-b border-[#E8EDF5]">
    <th className="w-[140px] px-6 py-3 text-left text-[13px] font-semibold text-[#16216C]">
      Time
    </th>

    <th className="px-6 py-3 text-left text-[13px] font-semibold text-[#16216C]">
      Booking Details
    </th>

    <th className="w-[170px] px-6 py-3 text-left text-[13px] font-semibold text-[#16216C]">
      Resident
    </th>

    <th className="w-[170px] px-6 py-3 text-left text-[13px] font-semibold text-[#16216C]">
      Purpose
    </th>

    <th className="w-[140px] px-6 py-3 text-center text-[13px] font-semibold text-[#16216C]">
      Status
    </th>
  </tr>
</thead>
<tbody>

  {timeSlots.map((time) => {
const booking = bookings.find(
  (item) =>
    item.status !== "Cancelled" &&
    Number(item.amenityId) === Number(amenity.id) &&
    item.bookingFor === formatDate(selectedDate) &&
    item.timeSlot?.startsWith(time)
);
    return (
   
      <tr
        key={time}
        className="border-b border-[#EDF2F7] hover:bg-[#FAFBFD]"
      >
        {/* Time */}
        <td className="px-6 py-2">
          <span className="text-[13px] font-semibold text-[#16216C]">
            {time}
          </span>
        </td>

        {/* Booking */}
        <td className="px-6 py-2">
          {booking ? (
            booking.status === "Maintenance" ? (
              <div className="bg-orange-50 border border-orange-100 rounded-md px-3 py-2">
                <span className="text-sm font-medium text-orange-700">
                  Maintenance
                </span>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
  <p className="text-sm font-semibold text-[#16216C]">
    {booking.amenityName}
  </p>

  <p className="text-xs text-[#64748B] mt-1">
    {booking.timeSlot}
  </p>
</div>
            )
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-md px-3 py-2 text-center">
              <span className="text-sm font-medium text-green-700">
                Available
              </span>
            </div>
          )}
        </td>

        {/* Resident */}
        <td className="px-6 py-2">
          {booking && booking.status !== "Maintenance" ? (
           <div>
  <p className="text-[13px] font-medium text-[#16216C]">
    {booking.residentName}
  </p>

  <p className="text-xs text-[#64748B]">
    {booking.mobile}
  </p>
</div>
          ) : (
            <span className="text-[#CBD5E1]">--</span>
          )}
        </td>

        {/* Purpose */}
        <td className="px-6 py-2">
          {booking ? (
            <span className="text-[13px] text-[#16216C]">
              {booking.purpose}
            </span>
          ) : (
            <span className="text-[#CBD5E1]">--</span>
          )}
        </td>

        {/* Status */}
        <td className="px-6 py-2 text-center">
          {booking ? (
            booking.status === "Maintenance" ? (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700">
                Maintenance
              </span>
            ) : booking.status === "Pending" ? (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700">
                Pending
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                Confirmed
              </span>
            )
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
              Available
            </span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

        </table>

      </div>
            

      
      </div>

  
  );
};

export default ScheduleTable;