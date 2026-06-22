import React from 'react'

const VisitorCharts = () => {
  return (
    <>
      {/* CHART AREA */}
        <div className="col-span-1 flex flex-col gap-2">

          <div className="bg-white rounded-xl shadow p-4 h-56">
            <h2 className="text-sm font-semibold mb-2">
              Visitors by Purpose
            </h2>
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Donut Chart Space
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 h-56">
            <h2 className="text-sm font-semibold mb-2">
              Visitors by Time
            </h2>
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Line Chart Space
            </div>
          </div>

        </div>
      </>
  )
}

export default VisitorCharts