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

  const [contactMethod, setContactMethod] = useState("message");

  // ===========================
  // Form Data
  // ===========================

 const [formData, setFormData] = useState({
  recipient: "",
  subject: "",
  message: "",
  whatsappMessage: "",
  emailMessage: "",
  template: "",
  callNotes: "",
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
  // Templates
  // ===========================

  const templates = {
    reminder: {
      subject: "Booking Reminder",

      message: `Hello ${booking?.residentName},

This is a reminder for your booking of ${booking?.amenityName}.

Booking ID : ${booking?.bookingId}
Date : ${booking?.bookingDate}
Time : ${booking?.timeSlot}

Please arrive on time and follow the society guidelines.

Regards,
Society Management`,
    },

    confirmation: {
      subject: "Booking Confirmation",

      message: `Hello ${booking?.residentName},

Your booking for ${booking?.amenityName} has been confirmed successfully.

Booking ID : ${booking?.bookingId}

Regards,
Society Management`,
    },

    update: {
      subject: "Booking Update",

      message: `Hello ${booking?.residentName},

There has been an update regarding your booking.

Booking ID : ${booking?.bookingId}

Regards,
Society Management`,
    },

    payment: {
      subject: "Payment Reminder",

      message: `Hello ${booking?.residentName},

This is a reminder regarding your booking payment.

Booking ID : ${booking?.bookingId}

Regards,
Society Management`,
    },

    general: {
      subject: "",
      message: "",
    },
  };

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

  const handleTemplate = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      template: value,
      subject: templates[value]?.subject || "",
      message: templates[value]?.message || "",
    }));
  };

  // ===========================
  // Validation
  // ===========================

  const validate = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Message should be at least 15 characters.";
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
        title: "Message Sent",
        message: `Your ${contactMethod} has been sent successfully.`,
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
  // Reset
  // ===========================

  const handleReset = () => {
  setFormData({
    recipient: `${booking?.residentName} (${booking?.flatNumber})`,
    subject: "",
    message: "",
    whatsappMessage: "",
    emailMessage: "",
    template: "",
       callNotes: "",
  });

  setErrors({});
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


  if(contactMethod === "message"){
    setFormData((prev)=>({
      ...prev,
      message: prev.message + " " + finalValue
    }));
  }

  if(contactMethod === "whatsapp"){
    setFormData((prev)=>({
      ...prev,
      whatsappMessage: prev.whatsappMessage + " " + finalValue
    }));
  }

  if(contactMethod === "email"){
    setFormData((prev)=>({
      ...prev,
      emailMessage: prev.emailMessage + " " + finalValue
    }));
  }

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
      Send a message or give a call to the resident regarding this booking.
    </p>

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
      Left Column (3)
  =========================== */}

<div className="xl:col-span-3">
<div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">

  <h2 className="text-[28px] font-bold text-[#0F172A]">
    Choose Contact Method
  </h2>

  <div className="mt-6 space-y-4">

    {/* Send Message */}

    <button
      onClick={() => setContactMethod("message")}
      className={`w-full rounded-2xl border p-4 transition ${
        contactMethod === "message"
          ? "border-[#2563EB] bg-[#F8FBFF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <div className="flex items-center">

        <div className="w-12 h-12 rounded-full bg-[#EEF4FF] flex items-center justify-center">
          <i className="bi bi-envelope text-[#2563EB] text-[22px]"></i>
        </div>

        <div className="ml-4 flex-1 text-left">
          <h3 className="font-semibold text-[#0F172A]">
            Send Message
          </h3>

          <p className="text-[14px] text-[#64748B] mt-1">
            Send SMS or Email to the resident
          </p>
        </div>

        <i
          className={`bi ${
            contactMethod === "message"
              ? "bi-check-circle-fill text-[#2563EB]"
              : "bi-circle text-[#CBD5E1]"
          } text-[22px]`}
        ></i>

      </div>
    </button>

    {/* WhatsApp */}

    <button
      onClick={() => setContactMethod("whatsapp")}
      className={`w-full rounded-2xl border p-4 transition ${
        contactMethod === "whatsapp"
          ? "border-[#22C55E] bg-[#F0FDF4]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <div className="flex items-center">

        <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center">
          <i className="bi bi-whatsapp text-[#22C55E] text-[22px]"></i>
        </div>

        <div className="ml-4 flex-1 text-left">
          <h3 className="font-semibold text-[#0F172A]">
            WhatsApp Message
          </h3>

          <p className="text-[14px] text-[#64748B] mt-1">
            Send message via WhatsApp
          </p>
        </div>

        <i
          className={`bi ${
            contactMethod === "whatsapp"
              ? "bi-check-circle-fill text-[#22C55E]"
              : "bi-circle text-[#CBD5E1]"
          } text-[22px]`}
        ></i>

      </div>
    </button>

    {/* Phone */}

    <button
      onClick={() => setContactMethod("call")}
      className={`w-full rounded-2xl border p-4 transition ${
        contactMethod === "call"
          ? "border-[#EF4444] bg-[#FEF2F2]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <div className="flex items-center">

        <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center">
          <i className="bi bi-telephone text-[#EF4444] text-[22px]"></i>
        </div>

        <div className="ml-4 flex-1 text-left">
          <h3 className="font-semibold text-[#0F172A]">
            Make Phone Call
          </h3>

          <p className="text-[14px] text-[#64748B] mt-1">
            Call the resident directly
          </p>
        </div>

        <i
          className={`bi ${
            contactMethod === "call"
              ? "bi-check-circle-fill text-[#EF4444]"
              : "bi-circle text-[#CBD5E1]"
          } text-[22px]`}
        ></i>

      </div>

      
    </button>

    {/* Email */}

    <button
      onClick={() => setContactMethod("email")}
      className={`w-full rounded-2xl border p-4 transition ${
        contactMethod === "email"
          ? "border-[#7C3AED] bg-[#F5F3FF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <div className="flex items-center">

        <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center">
          <i className="bi bi-envelope text-[#7C3AED] text-[22px]"></i>
        </div>

        <div className="ml-4 flex-1 text-left">
          <h3 className="font-semibold text-[#0F172A]">
            Send Email
          </h3>

          <p className="text-[14px] text-[#64748B] mt-1">
            Send detailed email to the resident
          </p>
        </div>

        <i
          className={`bi ${
            contactMethod === "email"
              ? "bi-check-circle-fill text-[#7C3AED]"
              : "bi-circle text-[#CBD5E1]"
          } text-[22px]`}
        ></i>

      </div>
    </button>

  </div>

</div>
</div>
      

      {/* ===========================
    Center Column (5)
=========================== */}

<div className="xl:col-span-5">

{contactMethod === "message" && (

<div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
    <h2 className="text-[28px] font-bold text-[#0F172A]">
      Send Message
    </h2>

    <p className="text-[15px] text-[#64748B] mt-1">
      Compose a message for the resident.
    </p>

    {/* To */}

    <div className="mt-8">

      <label className="block text-[15px] font-semibold text-[#334155] mb-2">
        To
      </label>

      <input
        type="text"
        disabled
        value={formData.recipient}
        className="w-full h-[52px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[#475569]"
      />

    </div>

    {/* Quick Template */}

    <div className="mt-6">

      <label className="block text-[15px] font-semibold text-[#334155] mb-3">
        Message Type
      </label>

      <select
        name="template"
        value={formData.template}
        onChange={handleTemplate}
        className="w-full h-[52px] rounded-xl border border-[#CBD5E1] px-4 outline-none focus:ring-2 focus:ring-[#2563EB]"
      >
        <option value="">Select Template</option>
        <option value="reminder">Booking Reminder</option>
        <option value="confirmation">Booking Confirmation</option>
        <option value="update">Booking Update</option>
        <option value="payment">Payment Reminder</option>
        <option value="general">General Communication</option>
      </select>

    </div>

   

    <div className="mt-6">

      <label className="block text-[15px] font-semibold text-[#334155] mb-2">
        Message <span className="text-red-500">*</span>
      </label>

      <textarea
  rows={5}
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Write your message..."
  className={`w-full rounded-xl px-4 py-4 resize-none outline-none ${
    errors.message
      ? "border border-red-500"
      : "border border-[#CBD5E1] focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  }`}
/>

      <div className="flex justify-between mt-2">

        <div>
          {errors.message && (
            <p className="text-red-500 text-[13px]">
              {errors.message}
            </p>
          )}
        </div>

        <span className="text-[12px] text-[#94A3B8]">
          {formData.message.length}/1000
        </span>

      </div>

    </div>
    {/* buttion */}

   <div className="flex justify-end gap-3 mt-6">

  <button
    onClick={handleReset}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Reset
  </button>

  <div className="relative">

  <button
    onClick={() => setShowPlaceholders(!showPlaceholders)}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Add Placeholder
  </button>


  {showPlaceholders && (
    <div className="absolute right-0 bottom-12 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-2 z-20">

      {[
  {
    label: "Resident Name",
    value: "{{residentName}}"
  },
  {
    label: "Booking ID",
    value: "{{bookingId}}"
  },
  {
    label: "Amenity Name",
    value: "{{amenityName}}"
  },
  {
    label: "Booking Date",
    value: "{{bookingDate}}"
  },
  {
    label: "Time Slot",
    value: "{{timeSlot}}"
  },
  {
    label: "Amount",
    value: "{{amount}}"
  }
].map((item) => (

       <button
  key={item.value}
  onClick={() => addPlaceholder(item.value)}
  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8FAFC]"
>
  {item.label}
</button>

      ))}

    </div>
  )}

</div>

</div>

   </div>

)}

{contactMethod === "whatsapp" && (
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
    <h2 className="text-[28px] font-bold text-[#0F172A]">
      WhatsApp Message
    </h2>

    <p className="text-[15px] text-[#64748B] mt-2">
  Send a WhatsApp message to the resident regarding this booking.
</p>

<div className="mt-8">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    WhatsApp Number
  </label>

  <input
    type="text"
    disabled
    value={booking?.mobile}
    className="w-full h-[52px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[#475569]"
  />

</div>

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Message
  </label>

  <textarea
    rows={6}
    name="whatsappMessage"
  value={formData.whatsappMessage}
    onChange={handleChange}
    placeholder="Write your WhatsApp message..."
    className="w-full rounded-xl border border-[#CBD5E1] px-4 py-4 resize-none outline-none focus:border-[#2563EB]"
  />

</div>
<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={handleReset}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Reset
  </button>

 <div className="relative">

  <button
    onClick={() => setShowPlaceholders(!showPlaceholders)}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Add Placeholder
  </button>


  {showPlaceholders && (
    <div className="absolute right-0 bottom-12 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-2 z-20">

      {[
  {
    label: "Resident Name",
    value: "{{residentName}}"
  },
  {
    label: "Booking ID",
    value: "{{bookingId}}"
  },
  {
    label: "Amenity Name",
    value: "{{amenityName}}"
  },
  {
    label: "Booking Date",
    value: "{{bookingDate}}"
  },
  {
    label: "Time Slot",
    value: "{{timeSlot}}"
  },
  {
    label: "Amount",
    value: "{{amount}}"
  }
].map((item) => (

        <button
  key={item.value}
  onClick={() => addPlaceholder(item.value)}
  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8FAFC]"
>
  {item.label}
</button>

      ))}

    </div>
  )}

</div>

</div>
  </div>
)}

{contactMethod === "call" && (
  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
    <h2 className="text-[28px] font-bold text-[#0F172A]">
      Make Phone Call
    </h2>

   <p className="text-[15px] text-[#64748B] mt-2">
  Call the resident directly regarding this booking.
</p>

<div className="mt-8">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Resident Name
  </label>

  <input
    type="text"
    disabled
    value={booking?.residentName}
    className="w-full h-[52px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[#475569]"
  />

</div>

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Phone Number
  </label>

  <input
    type="text"
    disabled
    value={booking?.mobile}
    className="w-full h-[52px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[#475569]"
  />

</div>

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Call Notes
  </label>

  <textarea
  rows={5}
  name="callNotes"
  value={formData.callNotes}
  onChange={handleChange}
  placeholder="Write call notes..."
  className="w-full rounded-xl border border-[#CBD5E1] px-4 py-4 resize-none outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
/>

</div>
<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={handleReset}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Reset
  </button>

</div>

  </div>
)}

{contactMethod === "email" && (
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
    Subject
  </label>

  <input
    type="text"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    placeholder="Enter email subject"
    className="w-full h-[52px] rounded-xl border border-[#CBD5E1] px-4 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  />

</div>

{/* Message */}

<div className="mt-6">

  <label className="block text-[15px] font-semibold text-[#334155] mb-2">
    Email Message
  </label>

  <textarea
    rows={8}
    name="emailMessage"
    value={formData.emailMessage}
    onChange={handleChange}
    placeholder="Write your email..."
    className="w-full rounded-xl border border-[#CBD5E1] px-4 py-4 resize-none outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
  />

</div>

{/* Bottom Button */}

<div className="flex justify-end gap-3 mt-6">

  <button
    onClick={handleReset}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Reset
  </button>

  <div className="relative">

  <button
    onClick={() => setShowPlaceholders(!showPlaceholders)}
    className="px-5 h-[46px] rounded-xl border border-[#CBD5E1] font-medium hover:bg-[#F8FAFC]"
  >
    Add Placeholder
  </button>


  {showPlaceholders && (
    <div className="absolute right-0 bottom-12 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-2 z-20">

      {[
  {
    label: "Resident Name",
    value: "{{residentName}}"
  },
  {
    label: "Booking ID",
    value: "{{bookingId}}"
  },
  {
    label: "Amenity Name",
    value: "{{amenityName}}"
  },
  {
    label: "Booking Date",
    value: "{{bookingDate}}"
  },
  {
    label: "Time Slot",
    value: "{{timeSlot}}"
  },
  {
    label: "Amount",
    value: "{{amount}}"
  }
].map((item) => (

        <button
  key={item.value}
  onClick={() => addPlaceholder(item.value)}
  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8FAFC]"
>
  {item.label}
</button>

      ))}

    </div>
  )}

</div>

</div>
  </div>
)}

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
      Resident details and quick contact actions.
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

       <button
  onClick={() => window.location.href = `tel:${booking?.mobile}`}
  className="px-4 h-10 rounded-lg bg-[#2563EB] text-white text-sm font-medium"
>
  Call
</button>

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

       <button
  onClick={() => window.location.href = `mailto:${booking?.email}`}
  className="px-4 h-10 rounded-lg bg-[#4F46E5] text-white text-sm font-medium"
>
  Email
</button>

      </div>

      {/* WhatsApp */}

      <div className="flex items-center justify-between border border-[#E2E8F0] rounded-xl p-4">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#ECFDF5] flex items-center justify-center">
            <i className="bi bi-whatsapp text-[#22C55E]"></i>
          </div>

          <div>

            <p className="text-[13px] text-[#64748B]">
              WhatsApp
            </p>

            <h4 className="font-semibold text-[#0F172A]">
              {booking?.mobile}
            </h4>

          </div>

        </div>

      <button
  onClick={() => window.open(`https://wa.me/${booking?.mobile}`, "_blank")}
  className="px-4 h-10 rounded-lg bg-[#22C55E] text-white text-sm font-medium"
>
  Chat
</button>

      </div>

    </div>

  </div>

  {/* ===========================
      Booking Rules & Notes
  =========================== */}

  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6">

    <h2 className="text-[22px] font-bold text-[#0F172A]">
      Booking Rules & Notes
    </h2>

    <div className="mt-5 space-y-4">

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

  <div className="xl:col-span-8">

    <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5 flex gap-4">

      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">

        <i className="bi bi-info-circle-fill text-[#2563EB] text-[22px]"></i>

      </div>

      <div>

        <h3 className="text-[18px] font-semibold text-[#1E3A8A]">
          Communication Note
        </h3>

        <p className="text-[15px] text-[#475569] mt-2 leading-7">
          All communication should be related only to this booking.
          Always verify resident information before sending important
          updates and keep conversations professional.
        </p>

      </div>

    </div>

  </div>

  {/* Right */}

  <div className="xl:col-span-4">

    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col gap-4 h-full justify-center">

      <button
        onClick={() => navigate(-1)}
        className="w-full h-[52px] rounded-xl border border-[#CBD5E1] bg-white font-semibold text-[#334155] hover:bg-[#F8FAFC] transition"
      >
        Cancel
      </button>

      <button
        onClick={handleSend}
        disabled={sending}
        className="w-full h-[52px] rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
       <i
  className={`bi ${
    contactMethod === "message"
      ? "bi-send-fill"
      : contactMethod === "whatsapp"
      ? "bi-whatsapp"
      : contactMethod === "call"
      ? "bi-telephone-fill"
      : "bi-envelope-fill"
  }`}
></i>

        {sending
  ? "Processing..."
  : contactMethod === "message"
  ? "Send Message"
  : contactMethod === "whatsapp"
  ? "Open WhatsApp"
  : contactMethod === "call"
  ? "Call Resident"
  : "Send Email"}

      </button>

    </div>

  </div>

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