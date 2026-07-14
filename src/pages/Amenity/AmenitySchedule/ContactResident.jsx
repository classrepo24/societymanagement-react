import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";



export const ContactResident = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/amenities/booking");
    }
  }, [booking, navigate]);

  // ===========================
  // Contact Method
  // ===========================

  // ===========================
  // Form Data
  // ===========================

const [formData, setFormData] = useState({
  recipient: "",
  subject: "",
  emailMessage: "",
  template: "",
});

  const [showPlaceholders, setShowPlaceholders] = useState(false);

  // ===========================
  // Errors
  // ===========================

  const [errors, setErrors] = useState({});

  // ===========================
  // Notification
  // ===========================

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  // ===========================
  // Loading
  // ===========================

  const [sending, setSending] = useState(false);

  // ===========================
  // Auto Fill Recipient
  // ===========================

  useEffect(() => {
    if (!booking) return;

    setFormData((prev) => ({
      ...prev,
      recipient: `${booking.residentName} (${booking.flatNumber})`,
    }));
  }, [booking]);

  

  // ===========================
  // Handle Input
  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ===========================
  // Handle Template
  // ===========================

//   const handleTemplate = (e) => {
//     const value = e.target.value;

//     setFormData((prev) => ({
//   ...prev,
//   template: value,
//   subject: templates[value]?.subject || "",
//   emailMessage: templates[value]?.message || "",
// }));
//   };

  // ===========================
  // Validation
  // ===========================

  const validate = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

  if (!formData.emailMessage.trim()) {
  newErrors.emailMessage = "Email message is required";
}

if (!formData.subject.trim()) {
  newErrors.subject = "Subject is required";
}

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ===========================
  // Send
  // ===========================

  const handleSend = () => {
    if (!validate()) return;

    setSending(true);

    setTimeout(() => {
      setSending(false);
setNotification({
  show: true,
  type: "success",
 
  message: "Email sent successfully.",
});

      setTimeout(() => {
        setNotification((prev) => ({
          ...prev,
          show: false,
        }));
      }, 3500);
    }, 1200);
  };



  // ===========================
// Add Placeholder
// ===========================
const addPlaceholder = (value) => {
  const placeholderValues = {
    "{{residentName}}": booking?.residentName,
    "{{bookingId}}": booking?.bookingId,
    "{{amenityName}}": booking?.amenityName,
    "{{bookingDate}}": booking?.bookingDate,
    "{{timeSlot}}": booking?.timeSlot,
    "{{amount}}": booking?.amountPaid,
  };

  const finalValue = placeholderValues[value];

  setFormData((prev) => ({
    ...prev,
    emailMessage: prev.emailMessage + " " + finalValue,
  }));

  setShowPlaceholders(false);
};
 
 return (
  <div className="px-6 py-6 bg-[#F8FAFC] min-h-screen">

    {/* ===========================
        Breadcrumb
    =========================== */}

    <Breadcrumbs
      items={[
        { label: "Amenities", path: "/amenities" },
        { label: "Booking Details", path: "/amenities/booking" },
        { label: "Contact Resident" },
      ]}
    />

   {/* ===========================
    Header
=========================== */}

<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mt-3 mb-8">

  <div>

    <h1 className="text-[40px] font-bold leading-tight text-[#0F172A]">
      Contact Resident
    </h1>

    <p className="mt-2 text-[18px] text-[#475569]">
Send an email to the resident regarding this booking.    </p>

  </div>

  <button
    onClick={() => navigate(-1)}
    className="h-[46px] px-6 bg-white border border-[#E2E8F0] rounded-xl flex items-center gap-3 font-semibold text-[#1E3A8A] hover:bg-[#F8FAFC] transition"
  >
    <i className="bi bi-arrow-left text-[18px]"></i>

    Back to Booking Details
  </button>

</div>

    {/* Title + Description */}
    {/* Back to Booking Details Button */}

   {/* ===========================
    Booking & Resident Overview
=========================== */}

<div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 mb-6">

  <div className="grid grid-cols-1 xl:grid-cols-12 items-center">

    {/* Left */}
    <div className="xl:col-span-3 flex items-center gap-5 xl:border-r border-[#E2E8F0] xl:pr-8">

      <div className="w-20 h-20 rounded-full bg-[#F3E8FF] flex items-center justify-center">
        <i className="bi bi-calendar-event text-[34px] text-[#6D28D9]"></i>
      </div>

      <div>

        <p className="text-[14px] text-[#64748B]">
          Booking ID
        </p>

        <h3 className="text-[24px] font-bold text-[#1D4ED8] mt-1">
          {booking?.bookingId}
        </h3>

        <p className="text-[14px] text-[#64748B] mt-5">
          Booking Type
        </p>

        <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-[13px] font-semibold">
          Hourly
        </span>

      </div>

    </div>

    {/* Center */}

    <div className="xl:col-span-4 xl:px-8 xl:border-r border-[#E2E8F0] mt-8 xl:mt-0">

      <p className="text-[14px] text-[#64748B]">
        Amenity
      </p>

      <h3 className="text-[24px] font-bold text-[#0F172A] mt-1">
        {booking?.amenityName}
      </h3>

      <p className="text-[14px] text-[#64748B] mt-6">
        Date & Time
      </p>

      <h4 className="text-[18px] font-semibold text-[#0F172A] mt-1">
        {booking?.bookingDate}
      </h4>

      <p className="text-[16px] text-[#0F172A] mt-1">
        {booking?.timeSlot}
      </p>

    </div>

    {/* Status */}

    <div className="xl:col-span-2 xl:px-8 xl:border-r border-[#E2E8F0] mt-8 xl:mt-0">

      <p className="text-[14px] text-[#64748B]">
        Status
      </p>

      <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[13px] font-semibold">
        {booking?.status}
      </span>

      <p className="text-[14px] text-[#64748B] mt-6">
        Amount
      </p>

      <h3 className="text-[26px] font-bold text-[#0F172A] mt-1">
        ₹{booking?.amountPaid}
      </h3>

    </div>

    {/* Resident */}

    <div className="xl:col-span-3 flex items-center gap-4 xl:pl-8 mt-8 xl:mt-0">

      <div className="w-20 h-20 rounded-full bg-[#E9D5FF] flex items-center justify-center text-[32px] font-bold text-[#4F46E5]">
        {booking?.residentName?.charAt(0)}
      </div>

      <div>

        <h3 className="text-[22px] font-bold text-[#0F172A]">
          {booking?.residentName}
        </h3>

        <p className="text-[#475569] mt-1">
          Flat / Unit : {booking?.flatNumber}
        </p>

        <div className="mt-4 space-y-2">

          <div className="flex items-center gap-2 text-[#1D4ED8]">
            <i className="bi bi-telephone"></i>
            <span className="text-[#0F172A]">{booking?.mobile}</span>
          </div>

          <div className="flex items-center gap-2 text-[#1D4ED8]">
            <i className="bi bi-envelope"></i>
            <span className="text-[#0F172A] break-all">
              {booking?.email}
            </span>
          </div>

        </div>

      </div>

    </div>

</div>
</div>

{/* ===========================
    Main 3 Column Layout
=========================== */}

<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

      

      {/* ===========================
    Center Column (5)
=========================== */}

<div className="xl:col-span-8">



  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
    <h2 className="text-[28px] font-bold text-[#0F172A]">
      Send Email
    </h2>

  <p className="text-[15px] text-[#64748B] mt-2">
  Compose and send an email to the resident.
</p>

{/* To */}

<div className="mt-8">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    To
  </label>

  <input
    type="email"
    disabled
    value={booking?.email}
    className="w-full h-[52px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[#475569]"
  />

</div>

{/* Subject */}

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Subject  <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    placeholder="Enter email subject"
    className="w-full h-[52px] rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  />
  {errors.subject && (
  <p className="text-red-500 text-sm mt-1">
    {errors.subject}
  </p>
)}

</div>

{/* Message */}

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Email Message <span className="text-red-500">*</span>
  </label>

  <textarea
    rows={8}
    name="emailMessage"
    value={formData.emailMessage}
    onChange={handleChange}
    placeholder="Write your email..."
    className="w-full rounded-xl border border-[#CBD5E1] px-4 py-4 resize-none outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  />
  {errors.emailMessage && (
  <p className="text-red-500 text-sm mt-1">
    {errors.emailMessage}
  </p>
)}

</div>

{/* Bottom Button */}

<div className="flex justify-end gap-3 mt-6">




      <button
        onClick={() => navigate(-1)}
        className="w-[200px] h-[52px] rounded-xl border border-[#CBD5E1] bg-white font-semibold text-[#334155] hover:bg-[#F8FAFC] transition"
      >
        Cancel
      </button>

      <button
        onClick={handleSend}
        disabled={sending}
        className="w-[200px] h-[52px] rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
      
  <i className="bi bi-envelope-fill"></i>
{sending ? "Sending..." : "Send Email"}

      </button>

    </div>

  </div>


</div>




      

      {/* ===========================
    Right Column (4)
=========================== */}

<div className="xl:col-span-4 space-y-6">

  {/* ===========================
      Resident Contact Information
  =========================== */}

  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">

    <h2 className="text-[24px] font-bold text-[#0F172A]">
      Resident Contact Information
    </h2>

    <p className="text-[14px] text-[#64748B] mt-2">
Resident email information for communication.

    </p>

    <div className="mt-6 space-y-5">

      {/* Mobile */}

      <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <i className="bi bi-telephone-fill text-[#2563EB]"></i>
          </div>

          <div>

            <p className="text-[13px] text-[#64748B]">
              Mobile
            </p>

            <h4 className="font-semibold text-[#0F172A]">
              {booking?.mobile}
            </h4>

          </div>

        </div>

       
      </div>

      {/* Email */}

      <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center">
            <i className="bi bi-envelope-fill text-[#4F46E5]"></i>
          </div>

          <div>

            <p className="text-[13px] text-[#64748B]">
              Email
            </p>

            <h4 className="font-semibold text-[#0F172A] break-all">
              {booking?.email}
            </h4>

          </div>

        </div>

       

      </div>

     

      

      

    </div>

  </div>

  {/* ===========================
      Booking Rules & Notes
  =========================== */}

  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10">

    <h2 className="text-[22px] font-bold text-[#0F172A]">
      Booking Rules & Notes
    </h2>

    <div className="mt-8 space-y-7">

      <div className="flex items-start gap-3">
        <i className="bi bi-check-circle-fill text-[#22C55E] mt-1"></i>
        <p className="text-[14px] text-[#475569]">
          Contact the resident only regarding this booking.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <i className="bi bi-check-circle-fill text-[#22C55E] mt-1"></i>
        <p className="text-[14px] text-[#475569]">
          Keep communication professional and respectful.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <i className="bi bi-check-circle-fill text-[#22C55E] mt-1"></i>
        <p className="text-[14px] text-[#475569]">
          Verify booking details before sending updates.
        </p>
      </div>

      <div className="flex items-start gap-3">
        <i className="bi bi-check-circle-fill text-[#22C55E] mt-1"></i>
        <p className="text-[14px] text-[#475569]">
          Avoid sharing confidential society information.
        </p>
      </div>

    </div>

  </div>

</div>
</div>


    {/* ===========================
    Bottom Section
=========================== */}

<div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">

  {/* Left */}

  <div className="xl:col-span-12">

    <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5 flex gap-4">

      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">

        <i className="bi bi-info-circle-fill text-[#2563EB] text-[22px]"></i>

      </div>

      <div>

        <h3 className="text-[20px] font-semibold text-[#1E3A8A]">
          Communication Note
        </h3>

        <p className="text-[18px] text-[#475569] mt-2 leading-7">
          All communication should be related only to this booking.
          Always verify resident information before sending important
          updates and keep conversations professional.
        </p>

      </div>

    </div>

  </div>

  {/* Right */}

  

</div>
   {/* ===========================
    Notification
=========================== */}

{notification.show && (
  <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg">
    <h4 className="font-semibold">{notification.title}</h4>
    <p className="text-sm">{notification.message}</p>
  </div>
)}

</div>
);
}