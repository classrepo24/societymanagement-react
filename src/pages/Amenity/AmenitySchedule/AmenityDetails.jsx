import React from "react";
import { useNavigate } from "react-router-dom";

const AmenityDetails = ({ amenity }) => {
    const navigate = useNavigate();
  if (!amenity) return null;
  
console.log(amenity.icon);
  return (
    <div className="bg-white border border-[#E8EDF5] rounded-2xl shadow-sm p-6">

      {/* Heading */}
      <h3 className="text-[22px] font-bold text-[#16216C] mb-6">
        Amenity Details
      </h3>

      {/* Top */}
      <div className="flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
          <i
  className={`bi ${amenity.icon} text-[#1D4ED8] text-2xl`}
></i>
        </div>

        <div>

          <div className="flex items-center gap-3">

            <h4 className="text-[22px] font-semibold text-[#16216C]">
              {amenity.name }
            </h4>

            <span className="bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold px-3 py-1 rounded-md">
              Active
            </span>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-[#6B7280]">
            Location
          </span>

          <span className="font-medium text-[#16216C]">
            {amenity.location || "Clubhouse, Ground Floor"}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-[#6B7280]">
            Booking Type
          </span>

          <span className="font-medium text-[#16216C]">
            {amenity.bookingType || "Bookable"}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-[#6B7280]">
            Advance Booking
          </span>

          <span className="font-medium text-[#16216C]">
            Allowed
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-[#6B7280]">
            Advance Booking Days
          </span>

          <span className="font-medium text-[#16216C]">
            7 Days
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-[#6B7280]">
            Operating Hours
          </span>

          <span className="font-medium text-[#16216C]">
            06:00 AM - 10:00 PM
          </span>

        </div>

      </div>

      {/* Button */}

      <button
  onClick={() => navigate(`/amenities/view/${amenity.id}`)}
  className="w-full mt-8 border border-[#D6DCE8] rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
>
  <i className="bi bi-eye"></i>
  View Amenity Details
</button>

    </div>
  );
};

export default AmenityDetails;