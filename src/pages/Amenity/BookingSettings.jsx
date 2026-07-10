import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useAmenity } from "../../context/AmenityContext";

export const BookingSettings = () => {
  const { id } = useParams();

  const { amenities, setAmenities } = useAmenity();

  const amenity = amenities.find(
    (item) => item.id.toString() === id
  );

  const [settings, setSettings] = useState(amenity);

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const toggleDay = (day) => {
    const updatedAvailability =
      settings.weeklyAvailability.map((item) =>
        item.day === day
          ? {
              ...item,
              status:
                item.status === "Open"
                  ? "Closed"
                  : "Open",
            }
          : item
      );

    setSettings({
      ...settings,
      weeklyAvailability: updatedAvailability,
    });
  };

  const handleAdditionalSetting = (
    field,
    value
  ) => {
    setSettings({
      ...settings,
      additionalSettings: {
        ...settings.additionalSettings,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    const updatedAmenities = amenities.map(
      (item) =>
        item.id.toString() === id
          ? settings
          : item
    );

    setAmenities(updatedAmenities);

    
  };

  if (!settings) {
    return (
      <div className="p-6">
        Amenity not found
      </div>
    );
  }





  return (
    <div className="p-6 bg-[#F7F8FC] min-h-screen">

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
      path: `/amenities/edit/${id}`,
    },
    {
      label: "Booking Settings",
      path: `/amenities/booking-settings/${id}`,
    },
  ]}
/>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[40px] font-bold text-[#16216C]">
            Booking Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Configure booking preferences and rules for this amenity.
          </p>
        </div>

        <button className="border rounded-lg px-5 py-3 flex items-center gap-2 text-[#16216C] font-medium bg-white">
  <i className="bi bi-arrow-left"></i>
  Back to Edit Amenity
</button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-12 gap-6">

      {/* LEFT TOP */}
<div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-[#E5E7EB] p-6">

  <h2 className="text-[22px] font-bold text-[#16216C] mb-8">
    Booking Configuration
  </h2>

  <div className="space-y-8">

    {/* Enable Booking */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-[16px] font-semibold text-[#16216C]">
          Enable Booking
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-1">
          Allow residents to book this amenity
        </p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={settings.availability === "Available"}
          onChange={(e) =>
            setSettings({
              ...settings,
              availability: e.target.checked
                ? "Available"
                : "Unavailable",
            })
          }
        />

        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#2146F3] transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
      </label>
    </div>

    {/* Booking Mode */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-[16px] font-semibold text-[#16216C]">
          Booking Mode
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-1">
          Choose how this amenity can be booked
        </p>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="bookingType"
            checked={settings.bookingType === "manual"}
            onChange={() =>
              setSettings({
                ...settings,
                bookingType: "manual",
              })
            }
          />

          <span className="text-sm font-medium text-[#16216C]">
            Manual Approval
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="bookingType"
            checked={settings.bookingType === "auto"}
            onChange={() =>
              setSettings({
                ...settings,
                bookingType: "auto",
              })
            }
          />

          <span className="text-sm font-medium text-[#16216C]">
            Auto Approval
          </span>
        </label>
      </div>
    </div>

    {/* Advance Booking Days */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-[16px] font-semibold text-[#16216C]">
          Advance Booking Days
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-1">
          Allow bookings up to this many days in advance
        </p>
      </div>

      <div className="relative w-[140px]">
        <input
          type="number"
          value={settings.advanceBookingDays}
          onChange={(e) =>
            setSettings({
              ...settings,
              advanceBookingDays: e.target.value,
            })
          }
          className="w-full h-12 border border-[#E5E7EB] rounded-lg px-4 pr-14 outline-none"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#16216C] text-sm font-medium">
          Days
        </span>
      </div>
    </div>

    {/* Max Bookings Per Day */}
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-[16px] font-semibold text-[#16216C]">
          Max Bookings per Day
        </h3>

        <p className="text-[14px] text-[#6B7280] mt-1">
          Maximum number of bookings allowed per day
        </p>
      </div>

      <input
        type="number"
        value={settings.maxBookingsPerDay}
        onChange={(e) =>
          setSettings({
            ...settings,
            maxBookingsPerDay: e.target.value,
          })
        }
        className="w-[140px] h-12 border border-[#E5E7EB] rounded-lg px-4 outline-none"
      />
    </div>

  </div>
</div>




        {/* RIGHT TOP */}
<div className="col-span-12 lg:col-span-6 bg-white rounded-xl border border-[#E6EAF5] p-6">

  <h2 className="font-bold text-[#16216C] text-[22px] mb-6">
    Booking Time Settings
  </h2>

  {/* Operating Days */}
  <div className="mb-8">

    <h3 className="font-semibold text-[#16216C] text-[16px] mb-1">
      Operating Days
    </h3>

    <p className="text-sm text-gray-500 mb-4">
      Select days when this amenity can be booked
    </p>

    <div className="flex flex-wrap gap-8">

      {[
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ].map((day) => (
        <label
          key={day}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#3158F5]"
checked={
  settings.weeklyAvailability.find(
    (item) => item.day === day
  )?.status === "Open"
}            onChange={() => toggleDay(day)}
          />

          <span className="text-[#16216C] text-sm font-medium">
            {day}
          </span>
        </label>
      ))}
    </div>
  </div>

  {/* Operating Hours */}
  <div className="mb-8">

    <h3 className="font-semibold text-[#16216C] text-[16px] mb-1">
      Operating Hours
    </h3>

    <p className="text-sm text-gray-500 mb-4">
      Set available time slots for bookings
    </p>

    <div className="grid grid-cols-2 gap-6">

      {/* From */}
      <div>
        <label className="block text-[#16216C] font-medium mb-2">
          From
        </label>

        <div className="relative">
          <input
            type="time"
            value={settings.operatingHours?.start}
            onChange={(e) =>
              setSettings({
                ...settings,
                operatingHours: {
                  ...settings.operatingHours,
                  start: e.target.value,
                },
              })
            }
            className="w-full h-12 border border-[#DDE3F0] rounded-lg px-4 pr-12 outline-none"
          />

        </div>
      </div>

      {/* To */}
      <div>
        <label className="block text-[#16216C] font-medium mb-2">
          To
        </label>

        <div className="relative">
          <input
            type="time"
            value={settings.operatingHours?.end}
            onChange={(e) =>
              setSettings({
                ...settings,
                operatingHours: {
                  ...settings.operatingHours,
                  end: e.target.value,
                },
              })
            }
            className="w-full h-12 border border-[#DDE3F0] rounded-lg px-4 pr-12 outline-none"
          />

        </div>
      </div>
    </div>
  </div>

  {/* Slot Duration */}
  <div>
    <label className="block text-[#16216C] font-semibold mb-2">
      Slot Duration
    </label>

    <p className="text-sm text-gray-500 mb-4">
      Duration of each booking slot
    </p>

    <div className="relative">

      <select
        className="w-full h-12 border border-[#DDE3F0] rounded-lg px-4 appearance-none outline-none"
        value={settings.bookingDuration}
        onChange={(e) =>
          setSettings({
            ...settings,
            bookingDuration: e.target.value,
          })
        }
      >
        <option value="30 Minutes">30 Minutes</option>
        <option value="1 Hour">1 Hour</option>
        <option value="2 Hours">2 Hours</option>
        <option value="3 Hours">3 Hours</option>
      </select>

      <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#16216C] pointer-events-none"></i>

    </div>
  </div>
</div>






        {/* LEFT BOTTOM */}
<div className="col-span-12 lg:col-span-6 bg-white rounded-xl border p-6">

  <h2 className="font-bold text-[#16216C] text-xl mb-6">
    Booking Rules
  </h2>

  {/* Allow Recurring Bookings */}
  <div className="flex justify-between items-start mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Allow Recurring Bookings
      </h3>
      <p className="text-sm text-gray-500">
        Allow residents to make recurring bookings
      </p>
    </div>

    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={settings.repeatedBooking?.enabled}
        onChange={(e) =>
         setSettings({
  ...settings,
 repeatedBooking: {
  ...settings.repeatedBooking,
  limitPerResident: e.target.checked,
}
})
        }
      />
    </div>
  </div>

  {/* Limit Booking Per Resident */}
  <div className="flex justify-between items-start mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Limit Bookings per Resident
      </h3>
      <p className="text-sm text-gray-500">
        Set maximum bookings allowed per resident per day
      </p>
    </div>

    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={settings.repeatedBooking?.limitPerResident}
        onChange={(e) =>
         setSettings({
  ...settings,
 repeatedBooking: {
  ...settings.repeatedBooking,
  limitPerResident: e.target.checked,
}
})
        }
      />
    </div>
  </div>

  {/* Max Bookings Per Resident */}
  <div className="grid grid-cols-12 items-center mb-6">
    <div className="col-span-8">
      <h3 className="font-semibold text-[#16216C]">
        Max Bookings per Resident
      </h3>

      <p className="text-sm text-gray-500">
        Maximum number of bookings a resident can make per day
      </p>
    </div>

    <div className="col-span-4">
      <input
        type="number"
        min="1"
        value={settings.repeatedBooking?.maxBookingsPerResident}
        onChange={(e) =>
         setSettings({
  ...settings,
 repeatedBooking: {
  ...settings.repeatedBooking,
  maxBookingsPerResident: Number(e.target.value),
}
})
        }
        className="w-full border rounded-lg px-4 py-2"
      />
    </div>
  </div>

  {/* Allow Cancellation */}
  <div className="flex justify-between items-start mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Allow Cancellation
      </h3>

      <p className="text-sm text-gray-500">
        Allow residents to cancel their bookings
      </p>
    </div>

    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={settings.cancellationPolicy?.allowCancellation}
        onChange={(e) =>
          setSettings({
  ...settings,
 cancellationPolicy: {
  ...settings.cancellationPolicy,
  allowCancellation: e.target.checked,
}
})
        }
      />
    </div>
  </div>

  {/* Cancellation Time Limit */}
  <div className="grid grid-cols-12 items-center">
    <div className="col-span-8">
      <h3 className="font-semibold text-[#16216C]">
        Cancellation Time Limit
      </h3>

      <p className="text-sm text-gray-500">
        Allow cancellation up to this time before booking
      </p>
    </div>

    <div className="col-span-4">
      <select
        value={settings.cancellationPolicy?.cancelBeforeHours}
        onChange={(e) =>
          setSettings({
  ...settings,
cancellationPolicy: {
  ...settings.cancellationPolicy,
  cancelBeforeHours: Number(e.target.value),
}
})
        }
        className="w-full border rounded-lg px-4 py-2"
      >
        <option value={1}>1 Hour Before</option>
        <option value={2}>2 Hours Before</option>
        <option value={6}>6 Hours Before</option>
        <option value={12}>12 Hours Before</option>
        <option value={24}>24 Hours Before</option>
      </select>
    </div>
  </div>






        </div>{/* RIGHT BOTTOM */}
<div className="col-span-12 lg:col-span-6 bg-white rounded-xl border p-6">

  <h2 className="font-bold text-[#16216C] text-xl mb-6">
    Additional Settings
  </h2>

  {/* Require Purpose */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Require Purpose
      </h3>
      <p className="text-sm text-gray-500">
        Ask for purpose while booking
      </p>
    </div>

    <input
      type="checkbox"
      className="form-check-input"
      checked={settings.additionalSettings.requirePurpose}
      onChange={(e) =>
        handleAdditionalSetting(
          "requirePurpose",
          e.target.checked
        )
      }
    />
  </div>

  {/* Require Number Of People */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Require Number of People
      </h3>
      <p className="text-sm text-gray-500">
        Ask for number of people using the amenity
      </p>
    </div>

    <input
      type="checkbox"
      checked={settings.additionalSettings.requirePeopleCount}
      onChange={(e) =>
        handleAdditionalSetting(
          "requirePeopleCount",
          e.target.checked
        )
      }
    />
  </div>

  {/* Display Guidelines */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Display Amenity Guidelines
      </h3>
      <p className="text-sm text-gray-500">
        Show amenity rules during booking
      </p>
    </div>

    <input
      type="checkbox"
      checked={settings.additionalSettings.showGuidelines}
      onChange={(e) =>
        handleAdditionalSetting(
          "showGuidelines",
          e.target.checked
        )
      }
    />
  </div>

  {/* Security Deposit */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="font-semibold text-[#16216C]">
        Require Security Deposit
      </h3>
      <p className="text-sm text-gray-500">
        Collect security deposit for bookings
      </p>
    </div>

    <input
      type="checkbox"
      checked={settings.additionalSettings.requireSecurityDeposit}
      onChange={(e) =>
        handleAdditionalSetting(
          "requireSecurityDeposit",
          e.target.checked
        )
      }
    />
  </div>

  {/* Deposit Amount */}
  <div>
    <label className="block font-semibold text-[#16216C] mb-2">
      Deposit Amount (₹)
    </label>

    <input
      type="number"
      placeholder="0.00"
      disabled={
        !settings.additionalSettings.requireSecurityDeposit
      }
      value={
        settings.additionalSettings.securityDepositAmount
      }
      onChange={(e) =>
        handleAdditionalSetting(
          "securityDepositAmount",
          Number(e.target.value)
        )
      }
      className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
    />
  </div>

  

</div>
</div>





     

      {/* Note */}

      <div className="mt-8 bg-[#F5F7FF] border rounded-xl p-5 flex gap-3">
  <i className="bi bi-info-circle text-xl text-blue-600"></i>

  <div>
    <h3 className="font-semibold text-[#16216C]">
      Note
    </h3>

    <ul className="list-disc ml-5 text-sm text-gray-600 mt-2">
      <li>
        Changes in booking settings will apply to new bookings only.
      </li>

      <li>
        Existing bookings will not be affected.
      </li>
    </ul>
  </div>
</div>

      {/* Footer Buttons */}

      <div className="flex justify-end gap-4 mt-8">
        <button className="border rounded-lg px-8 py-3 bg-white">
          Cancel
        </button>

       <button
  onClick={handleSave}
  className="bg-[#2140FF] text-white rounded-lg px-8 py-3 flex items-center gap-2"
>
  <i className="bi bi-save"></i>
  Save Settings
</button>
      </div>
    </div>
  );
};

