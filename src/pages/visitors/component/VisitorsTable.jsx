import React from 'react'

const VisitorsTable = ({
  activeTab,
  setActiveTab,
  currentPage,
  setCurrentPage,
  filteredVisitors,
  paginatedVisitors,
  totalPages,
  startPage,
  endPage,
  itemsPerPage,
  getStatusStyle,
}) => {
  return (
     <>

    {/* TABLE */}
        <div className="col-span-2">
          <div className="bg-white rounded-xl shadow p-4">

            <div className="flex items-center justify-between mb-4">

  {/* LEFT: TABS */}
  <div className="flex gap-6 text-sm font-bold items-end">
    {["All Visitors", "Inside Society", "Exited", "Pre Registered"].map((tab) => (
      <button
  key={tab}
  onClick={() => {
    setActiveTab(tab);
    setCurrentPage(1);
  }}
  className={`relative pb-2 inline-block transition-all duration-200 ${
    activeTab === tab
      ? "text-blue-600"
      : "text-gray-900"
  }`}
>
  {tab}

  {/* underline */}
  <span
    className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 ${
      activeTab === tab ? "bg-blue-600" : "bg-transparent"
    }`}
  />
</button>
      
    ))}
  </div>

  {/* RIGHT: FILTER + DATE */}
  <div className="flex items-center gap-3">

    {/* Filter Button */}
    <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white">
      <span>🔽</span>
      Filters
    </button>

    <div className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white">
  <span>📅</span>
  <span>
    <input type="date"></input>
  </span>
</div>

  </div>

</div>

            {/* TABLE */}
            <table className="w-full text-sm   border-collapse">
  <thead className=" border-b bg-gray-100">
    <tr>
      <th className="text-left p-4">Visitor Details</th>
      <th className="pr-2 ">Whom to Visit</th>
      <th className="pr-2">Flat/Wing</th>
      <th className="pr-2">Purpose</th>
      <th className="pr-2">In Time</th>
      <th className="pr-2">Out Time</th>
      <th className="pr-2">Status</th>
      <th className="pr-2">Actions</th>
    </tr>
  </thead>

  <tbody>
    {paginatedVisitors.map((v, i) => (
      <tr key={i} className="border-b  hover:bg-gray-50">

        <td className="p-2">
        <div className="flex items-center gap-3">
    
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
             {v.name.charAt(0)}
          </div>

          <div>
         <div className="font-medium">{v.name}</div>
         <div className="text-xs text-gray-400">{v.phone}</div>
        </div>
         </div>
        </td>

        <td className="pl-4">{v.whom}</td>
        <td className="pl-4">{v.flat}</td>
        <td className="pl-4">{v.purpose}</td>
        <td className="pl-4">{v.inTime}</td>
        <td className="pl-4">{v.outTime}</td>

        <td className="pl-4">
          <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(v.status)}`}>
            {v.status}
          </span>
        </td>

        {/* ✅ IMPORTANT: Actions column added */}
        <td className="pl-4">
         <button className="w-8 h-8 border rounded-md text-blue-600 mr-2 hover:bg-blue-50">
        <i className="bi bi-eye"></i>
        </button>

          <button className="w-8 h-8 border rounded-md text-red-600 bg-red-50">
          <i className="bi bi-trash3"></i>
          </button>
          </td>
      </tr>
    ))}
  </tbody>
</table>
{/* TABLE FOOTER */}
<div className="flex items-center justify-between mt-2 pt-3 ">
  
  <p className="text-sm text-gray-500">
  Showing{" "}
  {filteredVisitors.length === 0
    ? 0
    : (currentPage - 1) * itemsPerPage + 1}
  {" "}to{" "}
  {Math.min(
    currentPage * itemsPerPage,
    filteredVisitors.length
  )}{" "}
  of {filteredVisitors.length} entries
</p>

  <div className="flex items-center gap-2">
    <button
  className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
  onClick={() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }}
  disabled={currentPage === 1}
   >
  &lt;
</button>

   {Array.from(
       { length: endPage - startPage + 1 },
       (_, i) => startPage + i).map((page) => (
        <button
       key={page}
      onClick={() => setCurrentPage(page)}
       className={`w-8 h-8 border rounded ${
       currentPage === page
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`}
  >
    {page}
  </button>
))}

     <button
  className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
  onClick={() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }}
  disabled={currentPage === totalPages}
   >&gt;
</button>
</div>

</div>

          </div>
        </div>
    </>
  )
}

export default VisitorsTable