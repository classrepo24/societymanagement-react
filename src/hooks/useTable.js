import { useMemo, useState, } from "react";

const useTable = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");


  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc"
          ? aVal - bVal
          : bVal - aVal;
      }

      return sortOrder === "asc"
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });
  }, [data, sortField, sortOrder]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const maxButtons = 5;

  const startPage =
    Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;

  const endPage = Math.min(
    startPage + maxButtons - 1,
    totalPages
  );
  

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,

    sortField,
    sortOrder,

    sortedData,
    paginatedData,

    totalPages,
    startPage,
    endPage,

    handleSort,
  };
};

export default useTable;