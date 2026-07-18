import useTable from "../../hooks/useTable";
import SortableHeader from "../../component/SortableHeader";
import Pagination from "../../component/Pagination";
import { useApp } from "../../context/AppContext";
const InsidevisitorsTable = ({
  showAllvisitors,
  setShowAllvisitors,
  insidevisitors,
  setvisitors,
}) => {

  const { getStatusStyle } = useApp();

  const itemsPerPage = 7;

  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    paginatedData: paginatedvisitors,
    sortedData: sortedvisitors,
    totalPages,
    handleSort,
  } = useTable(insidevisitors, itemsPerPage);

  const handleCheckout = (phone) => {
    const outTime = Date.now();

    setvisitors(prev =>
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

  const finalvisitors = showAllvisitors
    ? paginatedvisitors
    : sortedvisitors.slice(0, 1);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-2 mt-2 flex flex-col">
        <h2 className="text-md font-semibold pl-4 mb-1">
          Currently Inside visitors ({insidevisitors.length})
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
              {finalvisitors.map((v) => (
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
                      className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(v.status)}`}
                    >
                      {v.status}
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
        <div className="border rounded-lg p-1 mt-4 text-center">
          <button
            onClick={() => setShowAllvisitors(!showAllvisitors)}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            {showAllvisitors
              ? "Show Less ↑"
              : "View All Inside visitors →"}
          </button>
        </div>


        {showAllvisitors && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalItems={insidevisitors.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </>
  );
};

export default InsidevisitorsTable;