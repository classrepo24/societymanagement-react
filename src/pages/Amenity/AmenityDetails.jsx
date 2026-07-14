import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAmenity } from "../../context/AmenityContext";
const AmenityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { amenities,setAmenities } = useAmenity();

  const amenity = amenities.find((item) => item.id === Number(id));

  if (!amenity) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Amenity Not Found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Amenities", path: "/amenities" },
          { label: "Amenity Details" },
        ]}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900">
            Amenity Details
          </h1>

          <p className="text-gray-500 mt-2">
            View complete information about this amenity
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Back Button */}
          <button
            onClick={() => navigate("/amenities")}
            className="px-5 py-3 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Back to Amenities
          </button>

         <button
  onClick={() => navigate(`/amenities/edit/${amenity.id}`)}
  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
>
  <i className="bi bi-pencil-square"></i>
  Edit Amenity
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
  className="px-5 py-3 bg-white border rounded-xl hover:bg-gray-50 flex items-center gap-2"
>
  <i className="bi bi-slash-circle text-red-600"></i>
  Deactivate Amenity
</button>
        </div>
      </div>
      <div className="bg-white border rounded-xl p-8 mb-6">
        <div className="flex items-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mr-6">
            <i className={`bi ${amenity.icon} text-4xl text-indigo-600`}></i>
          </div>

          {/* Name Section */}
          <div className="min-w-[220px]">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold">{amenity.name}</h2>

              <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                {amenity.status}
              </span>
            </div>

            <p className="mt-2 text-gray-700">{amenity.category}</p>

            <p className="mt-1 text-gray-700">{amenity.bookingType}</p>
          </div>

          {/* Divider */}
          <div className="h-16 border-l mx-8"></div>

          {/* Location */}
          <div className="min-w-[220px]">
            <p className="text-sm text-gray-500 mb-2">Location</p>

            <p className="font-medium">{amenity.location}</p>
          </div>

          <div className="h-16 border-l mx-8"></div>

          {/* Booking Type */}
          <div className="min-w-[180px]">
            <p className="text-sm text-gray-500 mb-2">Booking Type</p>

            <p className="font-medium">{amenity.bookingType}</p>
          </div>

          <div className="h-16 border-l mx-8"></div>

          {/* Created */}
          <div className="min-w-[200px]">
            <p className="text-sm text-gray-500 mb-2">Created On</p>

            <p className="font-medium">{amenity.createdAt}</p>
          </div>

          <div className="h-16 border-l mx-8"></div>

          {/* Updated */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Last Updated</p>

            <p className="font-medium">{amenity.updatedAt}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* About Amenity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">About Amenity</h3>

          <div className="space-y-4">
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <p className="text-gray-500 font-medium">Description</p>

                <p className="col-span-2 text-gray-800">
                  {amenity.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <p className="text-gray-500 font-medium">Capacity</p>

                <p className="col-span-2 text-gray-800">{amenity.capacity}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <p className="text-gray-500 font-medium">Rules & Guidelines</p>

                <div className="col-span-2">
                  <ul className="list-disc pl-5 space-y-1">
                    {amenity.rules?.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <p className="text-gray-500 font-medium">Amenities Provided</p>

                <div className="col-span-2 flex flex-wrap gap-2">
                  {amenity.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 rounded-lg text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">Booking Information</h3>

          <div className="space-y-5">
            <div className="grid grid-cols-2">
              <p className="text-gray-500">Advance Booking Allowed</p>
              <p className="font-medium">{amenity.advanceBookingAllowed}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Advance Booking Days</p>
              <p className="font-medium">{amenity.advanceBookingDays}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Booking Duration</p>
              <p className="font-medium">{amenity.bookingDuration}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Repeated Booking</p>
              <p className="font-medium">{amenity.repeatedBooking}</p>
            </div>

           <div>
  <p className="text-gray-500 mb-2">Cancellation Policy</p>

  <p className="font-medium">
    {amenity.cancellationPolicy?.allowCancellation
      ? `Allowed before ${amenity.cancellationPolicy.cancelBeforeHours} hours`
      : "Cancellation not allowed"}
  </p>
</div>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">Availability Schedule</h3>

          <div className="space-y-5">
            {/* Operating Hours */}
            <div className="grid grid-cols-3 gap-4">
              <p className="text-gray-500">Operating Hours</p>

              <p className="col-span-2 font-medium">{amenity.operatingHours}</p>
            </div>

            {/* Weekly Off */}
            <div className="grid grid-cols-3 gap-4">
              <p className="text-gray-500">Weekly Off</p>

              <p className="col-span-2 font-medium">{amenity.weeklyOff}</p>
            </div>

            {/* Availability */}
            <div className="grid grid-cols-3 gap-4">
              <p className="text-gray-500">Availability</p>

              <div className="col-span-2 flex flex-wrap gap-2">
                {amenity.weeklyAvailability?.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 border rounded-md text-xs"
                  >
                    <span>{day.day}</span>

                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        day.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {day.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">
            Maintenance Information
          </h3>

          <div className="space-y-5">
            <div className="grid grid-cols-2">
              <p className="text-gray-500">Frequency</p>
              <p className="font-medium">{amenity.maintenanceFrequency}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Last Maintenance</p>
              <p className="font-medium">{amenity.lastMaintenance}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Next Maintenance</p>
              <p className="font-medium">{amenity.nextMaintenance}</p>
            </div>

            <div className="grid grid-cols-2">
              <p className="text-gray-500">Maintained By</p>
              <p className="font-medium">{amenity.maintenanceBy}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Notes</p>

              <p className="font-medium">{amenity.maintenanceNotes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            {/* Google Map */}
            <div className="h-48 rounded-xl overflow-hidden border">
              <iframe
                title="Amenity Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  amenity.address,
                )}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

            {/* Address */}
            <div>
              <p className="text-gray-500 mb-2">Address</p>

              <p className="font-medium whitespace-pre-line">
                {amenity.address}
              </p>

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${amenity.latitude},${amenity.longitude}`,
                    "_blank",
                  )
                }
                className="mt-4 border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <i className="bi bi-geo-alt"></i>
                View on Map
              </button>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-5">Activity Summary</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Total Bookings */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="bi bi-calendar-check text-indigo-600 text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Total Bookings</p>

                  <h4 className="text-2xl font-bold">
                    {amenity.totalBookings}
                  </h4>
                </div>
              </div>
            </div>

            {/* Total Users */}
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="bi bi-people text-green-600 text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Total Users</p>

                  <h4 className="text-2xl font-bold">{amenity.totalUsers}</h4>
                </div>
              </div>
            </div>

            {/* Total Hours Booked */}
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <i className="bi bi-clock text-orange-600 text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Total Hours Booked</p>

                  <h4 className="text-2xl font-bold">
                    {amenity.totalHoursBooked}
                  </h4>
                </div>
              </div>
            </div>

            {/* Rating */}
            {/* Rating */}
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-star-fill text-yellow-500 text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Average Rating</p>

                  <h4 className="text-2xl font-bold">{amenity.rating}</h4>

                  <p className="text-xs text-gray-400">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenityDetails;
