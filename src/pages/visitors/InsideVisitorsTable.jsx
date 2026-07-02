import useTable from "../../hooks/useTable";
import SortableHeader from "../../component/SortableHeader";

const InsideVisitorsTable = ({
  showAllVisitors,
  setShowAllVisitors,
  insideVisitors,
  setVisitors,
}) => {


  const itemsPerPage = 7;

  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    paginatedData: paginatedVisitors,
    sortedData: sortedVisitors,
    totalPages,
    handleSort,
  } = useTable(insideVisitors, itemsPerPage);

  const handleCheckout = (phone) => {
    const outTime = Date.now();

    setVisitors(prev =>
      prev.map(v => {
        if (v.phone !== phone) return v;

        // convert string OR fallback
        let inTime = v.inTime;

        // agar string hai to try convert
        if (typeof inTime === "string") {
          inTime = Date.parse(inTime);
        }

        if (!inTime || isNaN(inTime)) {
          return {
            ...v,
            status: "exited",
            outTime: new Date(outTime).toLocaleTimeString(),
            duration: "0h 0m",
          };
        }

        const diffMs = outTime - inTime;

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return {
          ...v,
          status: "exited",
          outTime: new Date(outTime).toLocaleTimeString(),
          duration: `${hours}h ${minutes}m`,
        };
      })
    );
  };

  //pagination

  const finalVisitors = showAllVisitors
    ? paginatedVisitors
    : sortedVisitors.slice(0, 1);
  //entries
  const startEntry =
    insideVisitors.length === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endEntry = Math.min(
    currentPage * itemsPerPage,
    insideVisitors.length
  );
  return (
    <>
      <div className="bg-white rounded-xl shadow p-2 mt-2 flex flex-col">
        <h2 className="text-md font-semibold pl-4 mb-1">
          Currently Inside Visitors ({insideVisitors.length})
        </h2>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px] text-sm">

            <thead className="bg-green-50 border-b text-gray-900 text-md">
              <tr>
                <SortableHeader
                  label="Visitor Details"
                  field="name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="text-left pl-2 py-2 whitespace-nowrap"
                />

                <SortableHeader
                  label="Whom to Visit"
                  field="whom"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Flat/Wing"
                  field="flat"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Purpose"
                  field="purpose"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="In Time"
                  field="inTime"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Out Time"
                  field="outTime"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <th className="text-left whitespace-nowrap">
                  Contact
                </th>

                <SortableHeader
                  label="Status"
                  field="status"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <th className="text-l  whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {finalVisitors.map((v) => (
                <tr
                  key={v.phone}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-1 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {v.name.charAt(0)}
                      </div>

                      {/* Name + Phone */}
                      <div>
                        <div className="font-medium">
                          {v.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {v.phone}
                        </div>
                      </div>
                    </div>
                  </td>


                  {/* Name */}
                  <td className="font-medium">
                    {v.whom}
                  </td>




                  <td className="whitespace-nowrap">
                    {v.flat}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.purpose}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.inTime}
                  </td>


                  <td className="whitespace-nowrap">
                    {v.outTime ? v.outTime : "-"}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.phone}
                  </td>
                  <td className="whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium  ${v.status === "inside"
                        ? "bg-green-100 text-green-700 "
                        : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                    >
                      {v.status === "inside" ? "inside" : "Exited"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap ">
                    <div className="flex justify-center">
                      
                      <button
                        onClick={() => handleCheckout(v.phone)}
                        disabled={v.status === "exited"}
                        className={`w-20 h-8 rounded flex items-center justify-center
    ${v.status === "exited"
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-red-50 w-[100px] border text-red-600"
                          }`}
                      >
                        <i className="bi bi-box-arrow-right"></i> check out
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Button */}
        <div className="border rounded-lg p-1 text-center">
          <button
            onClick={() => setShowAllVisitors(!showAllVisitors)}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            {showAllVisitors
              ? "Show Less ↑"
              : "View All Inside Visitors →"}
          </button>
        </div>

        {showAllVisitors && (
          <div className="flex justify-between items-center mt-3 px-2">
            <div className="text-sm text-gray-500">
              Showing {startEntry} to {endEntry} of {insideVisitors.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-50"
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded border flex items-center justify-center ${currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InsideVisitorsTable;