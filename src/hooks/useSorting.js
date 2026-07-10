import { useState } from "react";

export const useSorting = (data) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Priority
    if (sortConfig.key === "priority") {
      const order = {
        Low: 1,
        Medium: 2,
        High: 3,
      };

      aValue = order[aValue] || 0;
      bValue = order[bValue] || 0;
    }

    // Status
    if (sortConfig.key === "status") {
  const order = {
    Open: 1,
    "In Progress": 2,
    Resolved: 3,
    Overdue: 4,
    Active: 5,
    Maintenance: 6,
    Inactive: 7,
  };

  aValue = order[aValue] || 0;
  bValue = order[bValue] || 0;
}
    // Date
    if (
      sortConfig.key === "raisedOn" ||
      sortConfig.key === "updatedOn"
    ) {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;

    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });
const renderSortIcon = (key) => (
  <span className="inline-flex flex-col ml-1  leading-none">
    <span
      className={`text-[7px] ${
        sortConfig.key === key &&
        sortConfig.direction === "asc"
          ? "text-blue-600"
          : "text-gray-400"
      }`}
    >
      ▲
    </span>

    <span
      className={`text-[7px] mt-1 ${
        sortConfig.key === key &&
        sortConfig.direction === "desc"
          ? "text-blue-600"
          : "text-gray-400"
      }`}
    >
      ▼
    </span>
  </span>
);

  return {
    sortedData,
    handleSort,
    renderSortIcon,
  };
};