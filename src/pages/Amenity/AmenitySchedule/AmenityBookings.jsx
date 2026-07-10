import React,{useState} from "react";
import { useLocation } from "react-router-dom";
import { useAmenity } from "../../../context/AmenityContext";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
export const AmenityBookings = () => {
 const { amenities, bookings } = useAmenity();

const location = useLocation();

const booking =
  location.state?.booking ||
  bookings[bookings.length - 1];

const amenity = amenities.find(
  (item) => item.id === booking?.amenityId
);  
console.log("Booking :", booking);
console.log("Amenities :", amenities);
console.log("Amenity :", amenity);


const navigate = useNavigate();

  const handlePrint = () => {
  const content = document.querySelectorAll(".print-section");

  let printData = "";

  content.forEach((item) => {
    printData += item.outerHTML;
  });

  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printData;

  window.print();

  document.body.innerHTML = originalContent;
  window.location.reload();
};
 const breadcrumbItems = [
  { label: "Dashboard", path: "/" },
  { label: "Amenities", path: "/amenities" },
  { label: "Amenity Schedule",  path:"/amenities/AmenitySchedule/schedule" },
  { label: "Booking Details" },
];

const [showCancelModal, setShowCancelModal] = useState(false);


if (!booking) {
  return <div>No booking found</div>;
}
  return (
    <div className="p-6 bg-[#f5f7fb]">
      <Breadcrumbs items={breadcrumbItems} />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#0F172A]">Booking Details</h1>

          <p className="text-gray-500 mt-1">
            View details of the selected amenity booking.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate( "/amenities/AmenitySchedule/schedule")}
            className="border px-5 py-2.5 rounded-lg flex items-center gap-2 bg-white"
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </button>

          <button
  onClick={handlePrint}
  className="border px-5 py-2.5 rounded-lg flex items-center gap-2 bg-white"
>
  <i className="bi bi-printer"></i>
  Print
</button>

          
        </div>
      </div>
     
      {/* Overview Card */}
      <div className="print-section bg-white border rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${amenity.iconBg}`}
            >
              <i
                className={`bi ${amenity.icon} text-4xl ${amenity.iconColor}`}
              ></i>
            </div>

            <div>

               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm">
                  {booking.status}
                </span>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl font-bold">{amenity.name}</h3>

               
              </div>

              <p>
                {amenity.bookingType}
                <span className="mx-2">•</span>
                {amenity.category}
              </p>

              <p className="mt-2 text-gray-600">{amenity.location}</p>
              
            </div>
          </div>

          <div className="border-l pl-6">
            <p className="text-gray-500 text-sm">Booking ID</p>

            <h4 className="font-bold text-lg mt-2">{booking.bookingId}</h4>
          </div>

          <div className="border-l pl-6">
            <p className="text-gray-500 text-sm">Booking Date</p>

            <h4 className="font-bold text-lg mt-2">{booking.bookingDate}</h4>
          </div>

          <div className="border-l pl-6">
            <p className="text-gray-500 text-sm">Booking For</p>

            <h4 className="font-bold text-lg mt-2">{booking.bookingFor}</h4>
          </div>

          <div className="border-l pl-6">
            <p className="text-gray-500 text-sm">Time Slot</p>

<h4 className="font-bold text-lg mt-2">
  {booking.timeSlot?.time || booking.timeSlot}
</h4>          </div>
        </div>
      </div>
    
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="xl:col-span-2 space-y-6">
          {/* Resident Details */}
          <div className="print-section bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Resident Details</h3>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="bi bi-person text-2xl text-blue-600"></i>
              </div>

              <div>
  <h4 className="font-semibold text-lg">
    {booking.residentName}
  </h4>

  <p className="text-gray-600">
    {booking.flatNumber }, {booking.apartmentName }
  </p>

  <p className="text-gray-600 mt-1">
    {amenity.location}
  </p>
                <div className="flex gap-3 text-gray-600 mt-1">
                  <span>{booking.mobile}</span>
                  <span>•</span>
                  <span>{booking.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div  className="print-section bg-white border rounded-2xl p-6">
  <h3 className="text-lg font-semibold mb-6">Booking Information</h3>

  <div className="grid grid-cols-2 gap-y-6">
    <p className="text-gray-500">Purpose</p>
    <p>{booking.purpose}</p>

    <p className="text-gray-500">Number of People</p>
    <p>{booking.numberOfPeople}</p>

    <p className="text-gray-500">Duration</p>
    <p>{booking.duration}</p>

    <p className="text-gray-500">Payment Status</p>
    <p>{booking.paymentStatus}</p>

    <p className="text-gray-500">Amount</p>
    <p>₹{booking.amountPaid}</p>
  </div>
</div>


          {/* Notes */}
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">Notes</h3>

              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                <i className="bi bi-plus-lg"></i>
                Add Note
              </button>
            </div>

            <p className="text-gray-500">No notes added for this booking.</p>
          </div>

          {/* Actions */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-5">Actions</h3>

            <div className="flex gap-4">
              <button
  onClick={() =>
    navigate("/amenities/booking/reschedule", {
      state: { booking },
    })
  }
  className="border px-5 py-3 rounded-lg flex items-center gap-2"
>
  <i className="bi bi-calendar-event"></i>
  Reschedule Booking
</button>

<button
  onClick={() =>
    navigate("/amenities/booking/cancel", {
      state: { booking },
    })
  }
  className="border px-5 py-3 rounded-lg flex items-center gap-2 text-red-600"
>
  <i className="bi bi-x-circle"></i>
  Cancel Booking
</button>

              <button
  onClick={() =>
    navigate("/amenities/booking/contact", {
      state: { booking },
    })
  }
  className="border px-5 py-3 rounded-lg flex items-center gap-2"
>
  <i className="bi bi-telephone"></i>
  Contact Resident
</button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Time Slot Details */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Time Slot Details</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <i className="bi bi-calendar-date text-xl text-blue-600"></i>

                <div>
                  <p className="text-gray-500 text-sm">Date</p>

                  <p className="font-medium">{booking.bookingFor}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <i className="bi bi-clock text-xl text-blue-600"></i>

                <div>
                  <p className="text-gray-500 text-sm">Time Slot</p>

<p className="font-medium">
  {booking.timeSlot?.time || booking.timeSlot}
</p>                </div>
              </div>

              <div className="flex gap-4">
                <i className="bi bi-info-circle text-xl text-blue-600"></i>

                <div>
                  <p className="text-gray-500 text-sm">Setup Time</p>

                  <p className="font-medium">Not Applicable</p>
                </div>
              </div>

              <div className="flex gap-4">
                <i className="bi bi-info-circle text-xl text-blue-600"></i>

                <div>
                  <p className="text-gray-500 text-sm">Checkout Time</p>

                  <p className="font-medium">Not Applicable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Rules */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Booking Rules</h3>

            <div className="space-y-4">
              {amenity.rules?.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <i className="bi bi-check-circle-fill text-green-500 mt-1"></i>

                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Timeline */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Booking Timeline</h3>

            <div className="space-y-8">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <i className="bi bi-check-lg"></i>
                  </div>

                  <div>
                    <h4 className="font-semibold">Booking Created</h4>

                    <p className="text-sm text-gray-500">
                      16 May 2025 06:45 AM
                    </p>
                  </div>
                </div>

                <p className="text-sm">{booking.residentName}</p>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <i className="bi bi-calendar-check"></i>
                  </div>

                  <div>
                    <h4 className="font-semibold">Booking Confirmed</h4>

                    <p className="text-sm text-gray-500">
                      16 May 2025 06:46 AM
                    </p>
                  </div>
                </div>

                <p className="text-sm">System</p>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <i className="bi bi-wallet2"></i>
                  </div>

                  <div>
                    <h4 className="font-semibold">Payment Completed</h4>

                    <p className="text-sm text-gray-500">
                      16 May 2025 06:46 AM
                    </p>
                  </div>
                </div>

                <p className="text-sm">System</p>
              </div>
            </div>
          </div>
        </div>
      </div>





      {showCancelModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-[380px]">

      <h2 className="text-lg font-semibold mb-3">
        Cancel Booking
      </h2>

      <p className="text-gray-600 mb-5">
        Are you sure you want to cancel this booking?
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowCancelModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          No
        </button>

        <button
          onClick={() => setShowCancelModal(false)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Yes
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
};
