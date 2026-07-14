

import React, { useMemo, useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import Breadcrumbs from "../../components/Breadcrumbs";
import StatsCard from "../../components/StatsCard";
import Pagination from "../../components/Pagination";
import DeletePopup from "../../components/DeletePopup";

import { useAmenity } from "../../context/AmenityContext";
import { useSorting } from "../../hooks/useSorting";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
/* ===========================
Component
=========================== */

 export const MaintenanceHistory = () => {
    
const [openMenu, setOpenMenu] = useState(null);
  /* ===========================
      Navigation
  =========================== */

  const navigate = useNavigate();
  const { id } = useParams();

  /* ===========================
      Context
  =========================== */

const { amenities, setAmenities } = useAmenity();
  /* ===========================
      Selected Amenity
  =========================== */

  const amenity = amenities.find(
    (item) => item.id === Number(id)
  );

  /* ===========================
      Maintenance History Data
  =========================== */

  const maintenanceHistory = amenity?.maintenanceHistory || [];

  /* ===========================
      Search
  =========================== */

  const [searchTerm, setSearchTerm] = useState("");

  /* ===========================
      Filters
  =========================== */

const [statusFilter, setStatusFilter] = useState("All Status");
  const [timeFilter, setTimeFilter] =  useState("This Month");;

  /* ===========================
      Pagination
  =========================== */

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  /* ===========================
      Delete Popup
  =========================== */

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedMaintenance, setSelectedMaintenance] =
    useState(null);


    /* ===========================
    Parse Date
=========================== */

const parseDate = (dateString) => {

  if (!dateString) return null;

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const [day, month, year] = dateString.split(" ");

  return new Date(Number(year), months[month], Number(day));

};
const getDaysRemaining = (date) => {

  if (!date) return "";

  const today = new Date();

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const [day, month, year] = date.split(" ");

  const dueDate = new Date(
    year,
    months[month],
    day
  );

  const diff =
    Math.ceil(
      (dueDate - today) /
      (1000 * 60 * 60 * 24)
    );

  return diff > 0
    ? `In ${diff} days`
    : "Due";
};
  /* ===========================
      Filtered Data
  =========================== */

  const filteredData = useMemo(() => {

    let data = [...maintenanceHistory];

    // Search
    // Search
if (searchTerm.trim()) {

  const search = searchTerm.toLowerCase().trim();

  data = data.filter((item) => {

    return (
      item.maintenanceId?.toLowerCase().includes(search) ||
      item.type?.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search) ||
      item.performedBy?.toLowerCase().includes(search)
    );

  });

}

    // Status Filter
    if (statusFilter !== "All Status") {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }


   // Time Filter
if (timeFilter !== "All Time") {

  const today = new Date();

  data = data.filter((item) => {

const performedDate = parseDate(item.performedOn);
    switch (timeFilter) {

      case "This Month":
        return (
          performedDate.getMonth() === today.getMonth() &&
          performedDate.getFullYear() === today.getFullYear()
        );

      case "Last 3 Months": {
        const last3Months = new Date();
        last3Months.setMonth(today.getMonth() - 3);

        return performedDate >= last3Months;
      }

      case "Last 6 Months": {
        const last6Months = new Date();
        last6Months.setMonth(today.getMonth() - 6);

        return performedDate >= last6Months;
      }

      case "This Year":
        return (
          performedDate.getFullYear() === today.getFullYear()
        );

      default:
        return true;
    }

  });

}

    return data;

  }, [maintenanceHistory, searchTerm, statusFilter, timeFilter]);

  /* ===========================
      Sorting
  =========================== */

  const {
    sortedData,
    handleSort,
    renderSortIcon,
  } = useSorting(filteredData);

  /* ===========================
      Pagination Data
  =========================== */

  const indexOfLast = currentPage * itemsPerPage;

  const indexOfFirst = indexOfLast - itemsPerPage;

 const currentMaintenance = sortedData.slice(
  indexOfFirst,
  indexOfLast
);

  const totalPages = Math.ceil(
    sortedData.length / itemsPerPage
  );

  /* ===========================
      Statistics
  =========================== */

  const totalMaintenance = maintenanceHistory.length;



const completedMaintenance = maintenanceHistory.filter(
  (item) => item.status === "Completed"
).length;

const inProgressMaintenance = maintenanceHistory.filter(
  (item) => item.status === "In Progress"
).length;

const overdueMaintenance = maintenanceHistory.filter(
  (item) => item.status === "Overdue"
).length;

const totalMaintenanceCost = maintenanceHistory.reduce(
  (sum, item) => sum + Number(item.cost || 0),
  0
);

/* ===========================
    Export Report
=========================== */
const handleExportReport = () => {

  const exportData = sortedData.map((item) => ({
    "Maintenance ID": item.maintenanceId,
    "Type": item.type,
    "Description": item.description,
    "Performed On": item.performedOn,
    "Next Due": item.nextDue,
    "Cost (₹)": item.cost,
    "Performed By": item.performedBy,
    "Status": item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Maintenance History"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(
    file,
    `${amenity?.name}-Maintenance-History.xlsx`
  );

};

/* ===========================
    Delete Maintenance
=========================== */

const handleDeleteMaintenance = () => {

  if (!selectedMaintenance) return;

  setAmenities((prevAmenities) =>
    prevAmenities.map((amenity) => {

      if (amenity.id !== Number(id)) return amenity;

      return {

        ...amenity,

        maintenanceHistory:
          amenity.maintenanceHistory.filter(
            (record) =>
              record.id !== selectedMaintenance.id
          ),

      };

    })
  );

  setDeleteOpen(false);

  setSelectedMaintenance(null);

};

useEffect(() => {

  if (
    currentPage > totalPages &&
    totalPages > 0
  ) {
    setCurrentPage(totalPages);
  }

}, [currentPage, totalPages]);


const [editingId, setEditingId] = useState(null);

const [editForm, setEditForm] = useState({});
 

const handleSave = () => {
  setAmenities((prev) =>
    prev.map((amenity) => {
      if (amenity.id !== Number(id)) return amenity;

      return {
        ...amenity,
        maintenanceHistory: amenity.maintenanceHistory.map((record) =>
          record.id === editingId ? editForm : record
        ),
      };
    })
  );

  setEditingId(null);
  setEditForm({});
};

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter, timeFilter]);
 return (
  <div className="p-6 bg-[#F8FAFC] min-h-screen">



    {/* ===========================
    Breadcrumbs
=========================== */}

<div className="mb-3">
  <Breadcrumbs
    items={[
      { label: "Dashboard", path: "/" },
      { label: "Amenities", path: "/amenities" },
      {
        label: amenity?.name || "Amenity",
        path: `/amenities/view/${amenity?.id}`,
      },
      {
        label: "Maintenance History",
      },
    ]}
  />
</div>
    <div>

    </div>

    {/* ===========================
    Page Header
=========================== */}

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

  {/* Left Side */}
  <div>

    <h1 className="text-[30px] font-bold text-[#0F172A]">
      Maintenance History
    </h1>

    <p className="mt-2 text-[15px] text-[#64748B]">
      View and manage maintenance records, inspections, servicing,
      and repair history for this amenity.
    </p>

  </div>

  {/* Right Side */}
  <div>

    <button
      onClick={() => navigate(-1)}
      className="
        inline-flex
        items-center
        gap-2
        px-5
        h-[46px]
        rounded-xl
        border
        border-[#CBD5E1]
        bg-white
        text-[#334155]
        font-medium
        hover:bg-[#F8FAFC]
        transition
      "
    >
      <i className="bi bi-arrow-left text-[16px]"></i>

      Back to Amenity
    </button>

  </div>

</div>
    
  {/* ===========================
    Amenity Summary Card
=========================== */}

<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5 mb-6">


  <div className="flex flex-col xl:flex-row xl:items-center gap-8">


    {/* Left Section */}
    <div className="flex items-center gap-5 min-w-[370px]">


      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">

        <i className={`bi ${amenity?.icon || "bi-building"} text-[30px] text-[#4F46E5]`}>
        </i>

      </div>



      {/* Name */}
      <div>


        <div className="flex items-center gap-3">

          <h2 className="text-[20px] font-bold text-[#0F172A]">
            {amenity?.name}
          </h2>


          <span
            className="
            px-3 py-1 
            rounded-full 
            text-[12px]
            font-semibold
            bg-[#DCFCE7]
            text-[#15803D]
            "
          >
            {amenity?.status}
          </span>


        </div>



        <p className="text-[14px] text-[#64748B] mt-1">
          {amenity?.category}
        </p>


      </div>


    </div>





    {/* Right Details */}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-5 flex-1">



      {/* Location */}

      <div>

        <p className="text-[13px] text-[#64748B] mb-1">
          Location
        </p>

        <p className="text-[14px] font-semibold text-[#0F172A]">
          {amenity?.location}
        </p>

      </div>





      {/* Added On */}

      <div>

        <p className="text-[13px] text-[#64748B] mb-1">
          Added On
        </p>

        <p className="text-[14px] font-semibold text-[#0F172A]">
          {amenity?.createdAt}
        </p>

      </div>





      {/* Last Maintenance */}

      <div>

        <p className="text-[13px] text-[#64748B] mb-1">
          Last Maintenance
        </p>

        <p className="text-[14px] font-semibold text-[#0F172A]">
          {amenity?.lastMaintenance}
        </p>

      </div>





      {/* Next Due */}

      <div>

        <p className="text-[13px] text-[#64748B] mb-1">
          Next Due
        </p>

        <p className="text-[14px] font-semibold text-[#0F172A]">
          {amenity?.nextMaintenance}
        </p>

      </div>



    </div>



  </div>


</div>
    

{/* ===========================
    Statistics Cards
=========================== */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-7">

  {/* Total Maintenance */}
  <StatsCard
    icon="bi bi-tools"
    iconBg="bg-[#DBEAFE]"
    iconColor="text-[#2563EB]"
    title="Total Maintenance"
    value={totalMaintenance}
    subtitle="Maintenance Records"
  />

  {/* Completed */}
  <StatsCard
    icon="bi bi-check-circle"
    iconBg="bg-[#DCFCE7]"
    iconColor="text-[#16A34A]"
    title="Completed"
    value={completedMaintenance}
    subtitle="Successfully Finished"
  />

  {/* In Progress */}
  <StatsCard
    icon="bi bi-arrow-repeat"
    iconBg="bg-[#DBEAFE]"
    iconColor="text-[#2563EB]"
    title="In Progress"
    value={inProgressMaintenance}
    subtitle="Currently Ongoing"
  />

  {/* Overdue */}
  <StatsCard
    icon="bi bi-exclamation-circle"
    iconBg="bg-[#FEE2E2]"
    iconColor="text-[#DC2626]"
    title="Overdue"
    value={overdueMaintenance}
    subtitle="Needs Attention"
  />

 {/* Next Due */}
<StatsCard
  icon="bi bi-calendar-event"
  iconBg="bg-[#FEF3C7]"
  iconColor="text-[#D97706]"
  title="Next Due"
  value={amenity?.nextMaintenance}
  subtitle={getDaysRemaining(amenity?.nextMaintenance)}
/>
</div>

    {/* ===========================
        Search + Filters + Export
    =========================== */}
    {/* ===========================
    Search + Filters + Export
=========================== */}

<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-5 mb-7">

  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

    {/* Left Side */}
    <div className="flex flex-col lg:flex-row gap-4 flex-1">

      {/* Search */}
      <div className="relative flex-1">

        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[15px]"></i>

        <input
          type="text"
          placeholder="Search by ID, type, description or performed by..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="
            w-full
            h-[46px]
            rounded-xl
            border
            border-[#CBD5E1]
            pl-11
            pr-4
            text-[14px]
            outline-none
            focus:ring-2
            focus:ring-[#2563EB]/20
            focus:border-[#2563EB]
          "
        />

      </div>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="
          h-[46px]
          min-w-[180px]
          rounded-xl
          border
          border-[#CBD5E1]
          px-4
          text-[14px]
          bg-white
          outline-none
        "
      >
        <option>All Status</option>
        <option>Completed</option>
        <option>In Progress</option>
        <option>Scheduled</option>
        <option>Overdue</option>
      </select>

      {/* Time Filter */}
      <select
        value={timeFilter}
        onChange={(e) => {
          setTimeFilter(e.target.value);
          setCurrentPage(1);
        }}
        className="
          h-[46px]
          min-w-[180px]
          rounded-xl
          border
          border-[#CBD5E1]
          px-4
          text-[14px]
          bg-white
          outline-none
        "
      >
        <option>This Month</option>
        <option>Last 3 Months</option>
        <option>Last 6 Months</option>
        <option>This Year</option>
        <option>All Time</option>
      </select>

    </div>

    {/* Right Side */}
    <div>

      <button
        onClick={handleExportReport}
        className="
          h-[46px]
          px-6
          rounded-xl
          bg-[#2563EB]
          hover:bg-[#1D4ED8]
          text-white
          font-medium
          flex
          items-center
          gap-2
          transition
        "
      >
        <i className="bi bi-download"></i>

        Export Report
      </button>

    </div>

  </div>

</div>

  
 {/* ===========================
    Maintenance History Table
=========================== */}

<div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">

  {/* ===========================
      Table Header
  =========================== */}

  <div className="overflow-x-auto">

    <table className="w-full">

      {/* ===========================
          Table Head
      =========================== */}

      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">

        <tr className="text-left">

          {/* Maintenance ID */}
          <th
            onClick={() => handleSort("maintenanceId")}
            className="px-6 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Maintenance ID
              {renderSortIcon("maintenanceId")}
            </div>
          </th>

          {/* Type */}
          <th
            onClick={() => handleSort("type")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Type
              {renderSortIcon("type")}
            </div>
          </th>

          {/* Description */}
          <th
            onClick={() => handleSort("description")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer"
          >
            <div className="flex items-center">
              Description
              {renderSortIcon("description")}
            </div>
          </th>

          {/* Performed On */}
          <th
            onClick={() => handleSort("performedOn")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Performed On
              {renderSortIcon("performedOn")}
            </div>
          </th>

          {/* Next Due */}
          <th
            onClick={() => handleSort("nextDue")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Next Due
              {renderSortIcon("nextDue")}
            </div>
          </th>

          {/* Cost */}
          <th
            onClick={() => handleSort("cost")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Cost
              {renderSortIcon("cost")}
            </div>
          </th>

          {/* Performed By */}
          <th
            onClick={() => handleSort("performedBy")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Performed By
              {renderSortIcon("performedBy")}
            </div>
          </th>

          {/* Status */}
          <th
            onClick={() => handleSort("status")}
            className="px-5 py-4 text-[14px] font-semibold text-[#334155] cursor-pointer whitespace-nowrap"
          >
            <div className="flex items-center">
              Status
              {renderSortIcon("status")}
            </div>
          </th>

          {/* Actions */}
          <th className="px-6 py-4 text-center text-[14px] font-semibold text-[#334155] whitespace-nowrap">
            Actions
          </th>

        </tr>

      </thead>

      {/* ===========================
          Table Body
      =========================== */}

      <tbody>

       {currentMaintenance.map((item) => (

  <tr
    key={item.id}
    className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition"
  >

    {/* ===========================
        Maintenance ID
    =========================== */}

    <td className="px-6 py-5 whitespace-nowrap">

      <p className="text-[14px] font-semibold text-[#2563EB]">
        {item.maintenanceId}
      </p>

    </td>

    {/* ===========================
        Type
    =========================== */}

    <td className="px-5 py-5 whitespace-nowrap">

     <td className="px-5 py-5 whitespace-nowrap">

  {editingId === item.id ? (

    <input
      type="text"
      value={editForm.type}
      onChange={(e) =>
        setEditForm({
          ...editForm,
          type: e.target.value,
        })
      }
      className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-[14px] outline-none focus:border-[#2563EB]"
    />

  ) : (

    <p className="text-[14px] font-medium text-[#0F172A]">
      {item.type}
    </p>

  )}

</td>

    </td>

    {/* ===========================
        Description
    =========================== */}
<td className="px-5 py-5 w-[280px]">

  {editingId === item.id ? (

    <textarea
      rows={3}
      value={editForm.description}
      onChange={(e) =>
        setEditForm({
          ...editForm,
          description: e.target.value,
        })
      }
      className="
        w-full
        min-h-[72px]
        max-h-[72px]
        resize-none
        overflow-y-auto
        border
        border-[#CBD5E1]
        rounded-lg
        px-3
        py-2
        text-[14px]
        leading-5
        outline-none
        focus:border-[#2563EB]
      "
    />

  ) : (

    <p className="text-[14px] text-[#475569] line-clamp-3">
      {item.description}
    </p>

  )}

</td>
    {/* ===========================
        Performed On
    =========================== */}

    <td className="px-5 py-5 whitespace-nowrap">

      {editingId === item.id ? (
  <input
    type="text"
    value={editForm.performedOn}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        performedOn: e.target.value,
      })
    }
    className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-[14px]"
  />
) : (
  <p className="text-[14px] text-[#334155]">
    {item.performedOn}
  </p>
)}

    </td>

    {/* ===========================
        Next Due
    =========================== */}

    <td className="px-5 py-5 whitespace-nowrap">

      {editingId === item.id ? (
  <input
    type="text"
    value={editForm.nextDue}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        nextDue: e.target.value,
      })
    }
    className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-[14px]"
  />
) : (
  <p className="text-[14px] text-[#334155]">
    {item.nextDue}
  </p>
)}

    </td>

    {/* ===========================
        Cost
    =========================== */}
<td className="px-5 py-5">

  {editingId === item.id ? (

    <input
      type="number"
      value={editForm.cost}
      onChange={(e) =>
        setEditForm({
          ...editForm,
          cost: e.target.value,
        })
      }
      className="
        w-[110px]
        min-w-[110px]
        border
        border-[#CBD5E1]
        rounded-lg
        px-3
        py-2
        text-[14px]
        outline-none
        focus:border-[#2563EB]
      "
    />

  ) : (

    <p className="text-[14px] font-semibold text-[#0F172A]">
      ₹{Number(item.cost).toLocaleString()}
    </p>

  )}

</td>

    {/* ===========================
        Performed By
    =========================== */}

    <td className="px-5 py-5 whitespace-nowrap">

     {editingId === item.id ? (
  <input
    type="text"
    value={editForm.performedBy}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        performedBy: e.target.value,
      })
    }
    className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-[14px]"
  />
) : (
  <p className="text-[14px] text-[#334155]">
    {item.performedBy}
  </p>
)}

    </td>

    {/* ===========================
        Status
    =========================== */}

    <td className="px-5 py-5 whitespace-nowrap">

      {editingId === item.id ? (
  <select
    value={editForm.status}
    onChange={(e) =>
      setEditForm({
        ...editForm,
        status: e.target.value,
      })
    }
    className="w-full border border-[#CBD5E1] rounded-lg px-3 py-2 text-[14px]"
  >
    <option>Completed</option>
    <option>In Progress</option>
    <option>Scheduled</option>
    <option>Overdue</option>
  </select>
) : (
  <span
    className={`
      inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-semibold
      ${
        item.status === "Completed"
          ? "bg-[#DCFCE7] text-[#15803D]"
          : item.status === "In Progress"
          ? "bg-[#DBEAFE] text-[#2563EB]"
          : item.status === "Scheduled"
          ? "bg-[#FEF3C7] text-[#B45309]"
          : "bg-[#FEE2E2] text-[#DC2626]"
      }
    `}
  >
    {item.status}
  </span>
)}

    </td>

   
   {/* ===========================
    Actions
=========================== */}

<td className="px-6 py-5 text-center">

  {editingId === item.id ? (

    <div className="flex items-center justify-center gap-2">

      <button
        onClick={handleSave}
        className="
          px-4
          py-2
          rounded-lg
          bg-[#16A34A]
          hover:bg-[#15803D]
          text-white
          text-sm
          font-medium
        "
      >
        Save
      </button>

      <button
        onClick={() => {
          setEditingId(null);
          setEditForm({});
        }}
        className="
          px-4
          py-2
          rounded-lg
          border
          border-[#CBD5E1]
          hover:bg-[#F8FAFC]
          text-sm
          font-medium
        "
      >
        Cancel
      </button>

    </div>

  ) : (

    <div className="relative inline-block">

      <button
        onClick={() =>
          setOpenMenu(
            openMenu === item.id ? null : item.id
          )
        }
        className="
          w-10
          h-10
          rounded-lg
          hover:bg-[#F1F5F9]
          transition
        "
      >
        <i className="bi bi-three-dots-vertical text-[#475569]"></i>
      </button>

      {openMenu === item.id && (

        <div
          className="
            absolute
            right-0
            top-11
            w-44
            bg-white
            border
            border-[#E2E8F0]
            rounded-xl
            shadow-lg
            z-50
            overflow-hidden
          "
        >

         

          <button
            onClick={() => {
              setEditingId(item.id);
              setEditForm(item);
              setOpenMenu(null);
            }}
            className="w-full px-4 py-3 text-left hover:bg-[#F8FAFC] flex items-center gap-3"
          >
            <i className="bi bi-pencil-square text-[#D97706]"></i>

            Edit Record
          </button>

          <button
            onClick={() => {
              setSelectedMaintenance(item);
              setDeleteOpen(true);
              setOpenMenu(null);
            }}
            className="w-full px-4 py-3 text-left hover:bg-[#FEF2F2] flex items-center gap-3 text-[#DC2626]"
          >
            <i className="bi bi-trash"></i>

            Delete
          </button>

        </div>

      )}

    </div>

  )}

</td>

  </tr>

))}
{currentMaintenance.length === 0 && (

<tr>

<td
colSpan={9}
className="py-16 text-center"
>

<div className="flex flex-col items-center">

<i className="bi bi-tools text-[48px] text-[#CBD5E1]"></i>

<h3 className="mt-4 text-[18px] font-semibold text-[#334155]">

No Maintenance Records Found

</h3>

<p className="mt-2 text-[#64748B]">

No maintenance history available for the selected filters.

</p>

</div>

</td>

</tr>

)}

      </tbody>

    </table>

  </div>

</div>

    {/* ===========================
        Pagination
    =========================== */}
  <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={sortedData.length}
  itemName="maintenance records"
  indexOfFirst={indexOfFirst}
  indexOfLast={indexOfLast}
  setCurrentPage={setCurrentPage}
/>

    {/* ===========================
        Delete Popup
    =========================== */}
   <DeletePopup
  isOpen={deleteOpen}
  title="Delete Maintenance Record"
  message="Are you sure you want to delete this maintenance record?"

  onCancel={() => {
    setDeleteOpen(false);
    setSelectedMaintenance(null);
  }}

  onConfirm={handleDeleteMaintenance}
/>

  </div>
);
 }

