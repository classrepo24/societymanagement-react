import React, { useState , useEffect} from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useAmenity } from "../../context/AmenityContext";
import { useMemo } from "react";
import StatsCard from "../../components/StatsCard";
import DateRangePicker from "../../components/DateRangePicker";
import Pagination from "../../components/Pagination";
import { useSorting } from "../../hooks/useSorting";
import { useNavigate } from "react-router-dom";

export const BookingHistory = () => {
  // ===========================
  // Context
  // ===========================
  const { bookings, amenities,  } = useAmenity();

  // ===========================
  // Search
  // ===========================
  const [searchTerm, setSearchTerm] = useState("");

  // ===========================
  // Filters
  // ===========================
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  const [openMenu, setOpenMenu] = useState(null);

  
  // ===========================
  // Validation Errors
  // ===========================
  const [errors, setErrors] = useState({});


  useEffect(() => {
  const newErrors = {};


 if (fromDate && toDate && toDate < fromDate) {
  newErrors.date = "End date cannot be earlier than start date.";
}

  setErrors(newErrors);
}, [fromDate, toDate]);

// Filtered Bookings
const filteredBookings = useMemo(() => {

  return bookings.filter((booking) => {

    const amenity = amenities.find(
      (item) => item.id === booking.amenityId
    );


    // Search
    const searchMatch =
      booking.bookingId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      booking.residentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      booking.flatNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      amenity?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());


    // Amenity Filter
 const amenityMatch =
  selectedAmenity
    ? String(booking.amenityId) === String(selectedAmenity)
    : true;


    // Status Filter
  const statusMatch =
  selectedStatus
    ? booking.status?.toLowerCase().trim() === selectedStatus.toLowerCase().trim()
    : true;


    // Date Filter
    const dateMatch =
      fromDate && toDate
        ? new Date(booking.bookingDate) >= new Date(fromDate) &&
          new Date(booking.bookingDate) <= new Date(toDate)
        : true;



    return (
      searchMatch &&
      amenityMatch &&
      statusMatch &&
      dateMatch
    );

  });

},[
  bookings,
  amenities,
  searchTerm,
  selectedAmenity,
  selectedStatus,
  fromDate,
  toDate
]);

// ===========================
// Sorting
// ===========================
const {
  sortedData,
  handleSort,
  renderSortIcon,
} = useSorting(filteredBookings);


const currentBookings = sortedData;



// ===========================
// Statistics
// ===========================
const stats = useMemo(() => {
  const total = bookings?.length || 0;

  const completed = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const noShow = bookings.filter(
    (booking) => booking.status === "No Show"
  ).length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonth = bookings.filter((booking) => {
    const date = new Date(booking.bookingDate);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  return {
    total,
    completed,
    cancelled,
    noShow,
    thisMonth,
  };
}, [bookings]);






  // ===========================
  // Pagination
  // ===========================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
// Pagination
const totalItems = currentBookings.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const paginatedBookings = currentBookings.slice(
  indexOfFirst,
  indexOfLast
);

useEffect(()=>{
 setCurrentPage(1);
},[
 searchTerm,
 selectedAmenity,
 selectedStatus,
 fromDate,
 toDate
]);

const handleExport = () => {

  const exportData = currentBookings.map((booking)=>{

    const amenity = amenities.find(
      item => item.id === booking.amenityId
    );

    return {
      "Booking ID": booking.bookingId,
      "Amenity": amenity?.name || "-",
      "Resident Name": booking.residentName || "-",
      "Flat Number": booking.flatNumber || "-",
      "Booking Date": booking.bookingDate
  ? `   ${new Date(booking.bookingDate).toLocaleDateString("en-IN")}`
  : "-",
      "Time Slot": booking.timeSlot || "-",
      "Duration": booking.duration || "-",
      "Guests": booking.numberOfPeople || "-",
      "Amount": booking.amountPaid || 0,
      "Status": booking.status || "-"
    };

  });


  if(exportData.length === 0){
    return;
  }


  const headers = Object.keys(exportData[0]);


  const csvRows = [
    headers.join(","),

    ...exportData.map(row =>
      headers.map(header =>
        `"${row[header]}"`
      ).join(",")
    )

  ];


  const csvContent = csvRows.join("\n");


  const blob = new Blob(
    [csvContent],
    {type:"text/csv;charset=utf-8;"}
  );


  const url = URL.createObjectURL(blob);


  const link = document.createElement("a");

  link.href = url;

  link.download = "Amenity_Booking_History.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};

  

const navigate = useNavigate();
  return (
    <div className="space-y-6 mx-6">

      {/* ===========================
    Breadcrumbs
=========================== */}
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
      label: "Booking History",
    },
  ]}
/>
    

      {/* ===========================
    Page Header
=========================== */}
<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

  {/* Left Content */}
  <div>

    {/* Page Title */}
    <h1 className="text-[32px] xl:text-[36px] font-bold text-[#0B1F63] leading-tight">
      Amenity Booking History
    </h1>

    {/* Page Subtitle */}
    <p className="mt-2 text-[16px] font-medium text-[#64748B]">
      View all past and completed amenity bookings.
    </p>

  </div>

  {/* Right Content */}
  <div className="flex items-center">

    {/* Export Button */}
<button
  type="button"
  onClick={handleExport}
  className="flex items-center gap-2 px-5 py-3 bg-white border border-[#CBD5E1] rounded-xl text-[15px] font-semibold text-[#1E40AF] hover:bg-[#F8FAFF] hover:border-[#1E40AF] transition-all duration-200"
>
      <i className="bi bi-download text-[16px]"></i>
      Export
    </button>

  </div>

</div>



     {/* ===========================
    Statistics Cards
=========================== */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-6">

  <StatsCard
  title="Total Bookings"
  value={stats.total}
  subtitle="All Time"
  icon="bi-calendar-check"
  iconBg="bg-[#EEF2FF]"
  iconColor="text-[#4F46E5]"
/>

<StatsCard
  title="Completed"
  value={stats.completed}
  subtitle={`${stats.total
    ? ((stats.completed / stats.total) * 100).toFixed(2)
    : 0}%`}
  icon="bi-check-circle"
  iconBg="bg-[#DCFCE7]"
  iconColor="text-[#16A34A]"
/>

<StatsCard
  title="Cancelled"
  value={stats.cancelled}
  subtitle={`${stats.total
    ? ((stats.cancelled / stats.total) * 100).toFixed(2)
    : 0}%`}
  icon="bi-x-circle"
  iconBg="bg-[#FEE2E2]"
  iconColor="text-[#DC2626]"
/>

<StatsCard
  title="No Show"
  value={stats.noShow}
  subtitle={`${stats.total
    ? ((stats.noShow / stats.total) * 100).toFixed(2)
    : 0}%`}
  icon="bi-calendar-x"
  iconBg="bg-[#FCE7F3]"
  iconColor="text-[#DB2777]"
/>

<StatsCard
  title="This Month"
  value={stats.thisMonth}
  subtitle="Bookings"
  icon="bi-calendar-event"
  iconBg="bg-[#EEF2FF]"
  iconColor="text-[#4F46E5]"
/>
</div>

      {/* ===========================
          Search + Filters Card
      ============================ */}
   <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5">

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

  {/* Search */}
  <div className="xl:col-span-2">
    <div className="relative">

      <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search bookings..."
        className="w-full h-12 pl-11 pr-4 text-[15px] border border-[#CBD5E1] rounded-xl outline-none transition-all duration-200 focus:border-[#1E40AF] focus:ring-4 focus:ring-[#DBEAFE]"
      />

    </div>
  </div>

  {/* Amenity Dropdown */}
  <div>

    <select
      value={selectedAmenity}
      onChange={(e) => setSelectedAmenity(e.target.value)}
      className="w-full h-12 px-4 text-[15px] border border-[#CBD5E1] rounded-xl outline-none transition-all duration-200 focus:border-[#1E40AF] focus:ring-4 focus:ring-[#DBEAFE]"
    >

     <option value="">
  All Amenities
</option>

{
 amenities.map((amenity)=>(
   <option 
    key={amenity.id}
    value={amenity.id}
   >
     {amenity.name}
   </option>
 ))
}

    </select>

  </div>

  {/* Status Dropdown */}
  <div>

    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="w-full h-12 px-4 text-[15px] border border-[#CBD5E1] rounded-xl outline-none transition-all duration-200 focus:border-[#1E40AF] focus:ring-4 focus:ring-[#DBEAFE]"
    >

      <option value="">
 All Status
</option>

<option value="Confirmed">
 Confirmed
</option>

<option value="Completed">
 Completed
</option>


<option value="Pending">
 Pending
</option>

<option value="Cancelled">
 Cancelled
</option>

<option value="Rescheduled">
 Rescheduled
</option>


<option value="No Show">
 No Show
</option>



    </select>

  </div>

  
  {/* Date Range */}
<div>
  <DateRangePicker
    fromDate={fromDate}
    toDate={toDate}
    setFromDate={setFromDate}
    setToDate={setToDate}
    error={errors.date}
  />
</div>

 
  <div>

    <button
    onClick={()=>{
 setSearchTerm("");
 setSelectedAmenity("");
 setSelectedStatus("");
 setFromDate("");
 setToDate("");
 setCurrentPage(1);
}}
      type="button"
      className="w-full h-12 flex items-center justify-center gap-2 border border-[#CBD5E1] bg-white rounded-xl font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-all duration-200"
    >
      <i className="bi bi-arrow-clockwise"></i>
      Reset
    </button>

  </div>

</div>

  {/* Date Validation */}



     {/* ===========================
    Booking History Table
=========================== */}
<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden mt-7">

  {/* Table Header */}
  <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between">

    {/* Left */}
    {/* <div>
      <h2 className="text-[20px] font-bold text-[#0F172A]">
        Booking History
      </h2>
      <p className="mt-1 text-[14px] text-[#64748B]">
        View all amenity booking records.
      </p>
    </div> */}

   

  </div>

  {/* ===========================
      Responsive Table
  ============================ */}
  <div className="overflow-x-auto">

    <table className="w-full min-w-[1600px]">

      {/* ===========================
          Table Head
      ============================ */}
<thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
       <tr>

  {/* Booking ID */}
  <th 
onClick={()=>handleSort("bookingId")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Booking ID
  {renderSortIcon("bookingId")}
</th>

  <th
onClick={()=>handleSort("amenityName")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Amenity
  {renderSortIcon("amenityName")}
</th>

  {/* Booked By */}
 <th 
onClick={()=>handleSort("residentName")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Booked By
  {renderSortIcon("residentName")}
</th>

  {/* Flat */}
 <th 
onClick={()=>handleSort("flatNumber")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Flat No.
  {renderSortIcon("flatNumber")}
</th>


  {/* Booking Date */}
 <th 
onClick={()=>handleSort("bookingDate")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Booking Date
  {renderSortIcon("bookingDate")}
</th>

  {/* Date & Time */}
  <th 
onClick={()=>handleSort("bookingFor")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Date & Time
  {renderSortIcon("bookingFor")}
</th>

  {/* Duration */}
  <th 
onClick={()=>handleSort("duration")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Duration
  {renderSortIcon("duration")}
</th>


  {/* Guests */}
  <th 
onClick={()=>handleSort("numberOfPeople")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Guests
  {renderSortIcon("numberOfPeople")}
</th>


  {/* Amount */}
  <th
onClick={()=>handleSort("amountPaid")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Amount
  {renderSortIcon("amountPaid")}
</th>

  {/* Status */}
  <th 
onClick={()=>handleSort("status")}
className="cursor-pointer px-6 py-4 text-left text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap"
>
  Status
  {renderSortIcon("status")}
</th>

  {/* Actions */}
  <th className="px-6 py-4 text-center text-[13px] font-bold text-[#475569] uppercase whitespace-nowrap">
    Actions
  </th>

</tr>

      </thead>

      {/* ===========================
          Table Body
      ============================ */}
      <tbody className="divide-y divide-[#E2E8F0] bg-white">

  {/* ===========================
      Dynamic Booking Rows
  ============================ */}
  {currentBookings?.length > 0 ? (

    paginatedBookings.map((booking) => {

      // Get Amenity Details
      const amenity = amenities.find(item => item.id === booking.amenityId);

      return (

        <tr key={booking.id} className="hover:bg-[#F8FAFC] transition-all duration-200">

          {/* ===========================
              Booking ID
          ============================ */}
          {/* ===========================
    Booking ID
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <button
    type="button"
    className="text-[15px] font-semibold text-[#1D4ED8] hover:underline"
  >
    {booking.bookingId}
  </button>

</td>

{/* ===========================
    Amenity
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <div className="flex items-center gap-3">

    {/* Amenity Image */}
    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-center flex-shrink-0">

      {amenity?.images?.length > 0 ? (
        <img
          src={amenity.images[0]}
          alt={amenity.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <i className="bi bi-building text-[20px] text-[#94A3B8]"></i>
      )}

    </div>

    {/* Amenity Details */}
    <div>

      <h4 className="text-[15px] font-semibold text-[#0F172A]">
        {amenity?.name || "-"}
      </h4>

      <p className="mt-1 text-[13px] text-[#64748B]">
        {amenity?.category || "-"}
      </p>

    </div>

  </div>

</td>

        {/* ===========================
    Booked By
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <div>

    <h4 className="text-[15px] font-semibold text-[#0F172A]">
      {booking.residentName || "-"}
    </h4>

    <p className="mt-1 text-[13px] text-[#64748B]">
      {booking.residentType || "Resident"}
    </p>

  </div>

</td>

{/* ===========================
    Flat Number
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <span className="text-[15px] font-medium text-[#334155]">
    {booking.flatNumber || "-"}
  </span>

</td>

{/* ===========================
    Booking Date
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <div>

    <h4 className="text-[15px] font-medium text-[#0F172A]">
      {booking.bookingDate || "-"}
    </h4>

    <p className="mt-1 text-[13px] text-[#64748B]">
  {booking.createdAt || "-"}
</p>

  </div>

</td>

          {/* ===========================
    Event Date & Time
=========================== */}
<td className="px-6 py-5 whitespace-nowrap">

  <div>

    <h4 className="text-[15px] font-medium text-[#0F172A]">
  {booking.bookingFor || "-"}
</h4>

    <p className="mt-1 text-[13px] text-[#64748B]">
      {booking.timeSlot || "-"}
    </p>

  </div>

</td>

{/* ===========================
    Duration
=========================== */}
<td className="px-6 py-5 text-center whitespace-nowrap">

  <span className="text-[15px] font-medium text-[#334155]">
    {booking.duration || "-"}
  </span>

</td>

{/* ===========================
    Guests
=========================== */}
<td className="px-6 py-5 text-center whitespace-nowrap">

  <span className="text-[15px] font-medium text-[#334155]">
    {booking.numberOfPeople || booking.guests || "-"}
  </span>

</td>

{/* ===========================
    Amount
=========================== */}
<td className="px-6 py-5 text-right whitespace-nowrap">

  <span className="text-[15px] font-semibold text-[#0F172A]">
₹{booking.amountPaid}  </span>

</td>

          {/* ===========================
              Status Badge
          ============================ */}
          {/* ===========================
    Status
=========================== */}
<td className="px-6 py-5 text-center whitespace-nowrap">

  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold ${
      booking.status === "Completed"
        ? "bg-[#DCFCE7] text-[#15803D]"
        : booking.status === "Confirmed"
        ? "bg-[#DBEAFE] text-[#1D4ED8]"
        : booking.status === "Cancelled"
        ? "bg-[#FEE2E2] text-[#DC2626]"
        : booking.status === "Pending"
        ? "bg-[#FEF3C7] text-[#D97706]"
        : booking.status === "Rescheduled"
        ? "bg-[#EDE9FE] text-[#7C3AED]"
        : booking.status === "No Show"
        ? "bg-[#FCE7F3] text-[#BE185D]"
        : "bg-[#F1F5F9] text-[#475569]"
    }`}
  >
    {booking.status}
  </span>

</td>

          {/* ===========================
              Actions
          ============================ */}
          <td className="px-6 py-5 text-center whitespace-nowrap relative">

  <div className="relative inline-block">

    {/* Three Dot Button */}
    <button
      onClick={() =>
        setOpenMenu(
          openMenu === booking.id ? null : booking.id
        )
      }
      className="
        w-10 h-10
        rounded-lg
        hover:bg-[#F1F5F9]
        transition
      "
    >
      <i className="bi bi-three-dots-vertical text-[18px] text-[#475569]"></i>
    </button>

    {/* Dropdown */}
    {openMenu === booking.id && (
      <div className="
        absolute
        right-0
        top-12
        w-36
        bg-white
        border border-[#E2E8F0]
        rounded-xl
        shadow-lg
        z-50
      ">
        <button
          onClick={() => {
            navigate("/amenities/booking", {
              state: { booking }
            });
            setOpenMenu(null);
          }}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-left
            text-[14px]
            text-[#334155]
            hover:bg-[#F8FAFC]
            rounded-xl
          "
        >
          <i className="bi bi-eye text-[#2563EB]"></i>
          View
        </button>
      </div>
    )}

  </div>

</td>

        </tr>

      );

    })

  ) : (

  /* ===========================
      Empty State
  ============================ */
  <tr>
    <td colSpan={11} className="px-6 py-20">

      <div className="flex flex-col items-center justify-center">

        <div className="w-20 h-20 rounded-full bg-[#EFF6FF] flex items-center justify-center">
          <i className="bi bi-calendar-x text-[34px] text-[#3B82F6]"></i>
        </div>

        <h3 className="mt-5 text-[20px] font-bold text-[#0F172A]">
  {
    bookings.length === 0
      ? "No Booking History Available"
      : "No Bookings Match Your Filters"
  }
</h3>

<p className="mt-2 text-[15px] text-[#64748B] text-center max-w-md">
  {
    bookings.length === 0
      ? "No amenity bookings have been created yet."
      : "Try changing your search or filter criteria."
  }
</p>

      </div>

    </td>
  </tr>

)}

 </tbody>
</table>
</div>
</div>
</div>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  itemName="Bookings"
  indexOfFirst={indexOfFirst}
  indexOfLast={indexOfLast}
  setCurrentPage={setCurrentPage}
/>

</div>
  );
};

export default BookingHistory;