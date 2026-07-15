import React, { useMemo, useState } from "react";
import { MyRequestCard } from "./MyRequestCard";
import { RequestFilter } from "./RequestFilter";
import { RequestTable } from "./RequestTable";
import { requestData } from "./myRequestData";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

export const MyRequest = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredData = useMemo(() => {
    return requestData.filter((item) => {
      // Search
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      // Status
      const matchesStatus =
        status === "All" || item.status === status;

      // Category
      const matchesCategory =
        category === "All" || item.category === category;

      // Date
      let matchesDate = true;

      if (startDate && endDate) {
        const itemDate = new Date(item.date);

        matchesDate =
          itemDate >= new Date(startDate) &&
          itemDate <= new Date(endDate);
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesDate
      );
    });
  }, [search, status, category, startDate, endDate]);

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCategory("All");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb
            items={[
              { label: "Dashboard" },
              { label: "Maintenance" },
              { label: "My Request" },
            ]}
            title="My Request"
            subtitle="Track and Manage all maintenance requests raised by you."
          />
        </div>

        <button
          onClick={() => navigate("/maintenance-management/raise-maintenance-request")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          + Raise Maintenance Request
        </button>
      </div>

      {/* Cards */}
      <MyRequestCard data={filteredData} />

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mt-6">

        <RequestFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          category={category}
          setCategory={setCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          resetFilters={resetFilters}
        />

        <RequestTable data={filteredData} />

      </div>
    </div>
  );
};