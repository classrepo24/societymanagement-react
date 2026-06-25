import React from "react";

const InsideVisitorsTable = ({
  showAllVisitors,
  setShowAllVisitors,
  insideVisitors,
  setSelectedVisitor,
  setShowVisitorModal,
}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-2 mt-1 flex flex-col">
        <h2 className="text-md font-semibold pl-4 mb-1">
          Currently Inside Visitors ({insideVisitors.length})
        </h2>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-green-50 border-b text-grey-500 text-md">
              <tr>
                <th className="text-left pl-8 p-2 whitespace-nowrap">
                  Visitor Details
                </th>
                <th className="text-left whitespace-nowrap">
                  Whom to Visit
                </th>
                <th className="text-left whitespace-nowrap">
                  Flat / Wing
                </th>
                <th className="text-left whitespace-nowrap">
                  In Time
                </th>
                <th className="text-left whitespace-nowrap">
                  Purpose
                </th>
                <th className="text-left whitespace-nowrap">
                  Contact
                </th>
                <th className="text-left whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {(showAllVisitors
                ? insideVisitors
                : insideVisitors.slice(0, 1)
              ).map((v, i) => (
                <tr
                  key={i}
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

                  <td className="whitespace-nowrap">
                    {v.whom}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.flat}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.inTime}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.purpose}
                  </td>

                  <td className="whitespace-nowrap">
                    {v.phone}
                  </td>

                  <td className="whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center"
                        onClick={() => {
                          setSelectedVisitor(v);
                          setShowVisitorModal(true);
                        }}
                      >
                        <i className="bi bi-eye"></i>
                      </button>

                      <button className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center">
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Button */}
        <div className="mt-4 border rounded-lg p-1 text-center">
          <button
            onClick={() =>
              setShowAllVisitors(!showAllVisitors)
            }
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            {showAllVisitors
              ? "Show Less ↑"
              : "View All Inside Visitors →"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InsideVisitorsTable;