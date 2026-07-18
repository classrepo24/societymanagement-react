const SortableHeader = ({
  label,
  field,
  sortField,
  sortOrder,
  handleSort,
  className = "",
}) => {
  return (
    <th
      onClick={() => handleSort(field)}
      className={`cursor-pointer ${className}`}
    >
      <div className="flex items-center">
        {label}

        <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
          <span
            className={
              sortField === field && sortOrder === "asc"
                ? "text-blue-600 font-bold"
                : "text-gray-400"
            }
          >
            ▲
          </span>

          <span
            className={
              sortField === field && sortOrder === "desc"
                ? "text-blue-600 font-bold"
                : "text-gray-400"
            }
          >
            ▼
          </span>
        </span>
      </div>
    </th>
  );
};

export default SortableHeader;