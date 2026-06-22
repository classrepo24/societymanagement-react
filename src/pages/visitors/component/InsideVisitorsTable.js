import React from 'react'

const InsideVisitorsTable = ({showAllVisitors,setShowAllVisitors,insideVisitors}) => {
  return (
    <>
      {/* CURRENTLY INSIDE VISITORS */}
      <div className="bg-white rounded-xl shadow p-4 mt-2">
      <h2 className="text-lg font-semibold mb-4">
    Currently Inside Visitors ({insideVisitors.length})
     </h2>

  <table className="w-full text-sm">
    <thead className="bg-green-150 border-b">
      <tr>
        <th className="text-left p-3">Visitor Details</th>
        <th className="text-left">Whom to Visit</th>
        <th className="text-left">Flat / Wing</th>
        <th className="text-left">In Time</th>
        <th className="text-left">Purpose</th>
        <th className="text-left">Contact</th>
        <th className="text-left">Actions</th>
      </tr>
    </thead>

   <tbody>
  {(showAllVisitors? insideVisitors: insideVisitors.slice(0, 1)).map((v, i) => (
    <tr key={i} className="border-b hover:bg-gray-50">
      <td className="p-3">
        <div className="font-medium">{v.name}</div>
        <div className="text-gray-500 text-xs">
          {v.phone}
        </div>
      </td>

      <td>{v.whom}</td>
      <td>{v.flat}</td>
      <td>{v.inTime}</td>
      <td>{v.purpose}</td>
      <td>{v.phone}</td>

      <td>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
            👁
          </button>

          <button className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center">
            ↗
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
  </table>

  {/* FOOTER BUTTON */}
  <div className="mt-4 border rounded-lg p-3 text-center">
  <button
    onClick={() => setShowAllVisitors(!showAllVisitors)}
    className="text-blue-600 font-medium hover:text-blue-700"
  >
    {showAllVisitors
  ? "Show Less ↑"
  : `View All Inside Visitors →`}
  </button>
</div>
</div>
    </>
  )
}

export default InsideVisitorsTable