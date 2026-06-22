import React from "react";

const VisitorStatsCards = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold">Visitor Management</h1>
          <p className="text-gray-500 text-sm">
            Track and manage all visitors in the society.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm">
            Pre-Register Visitor
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            + Add New Visitor
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
            👥
          </div>
          <div>
            <p className="text-gray-500 text-sm">Visitors Today</p>
            <h2 className="text-2xl font-bold">23</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
            📅
          </div>
          <div>
            <p className="text-gray-500 text-sm">This Week</p>
            <h2 className="text-2xl font-bold">128</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl">
            📊
          </div>
          <div>
            <p className="text-gray-500 text-sm">This Month</p>
            <h2 className="text-2xl font-bold">542</h2>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl shadow flex items-start gap-4 h-32">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
            🕤
          </div>
          <div>
            <p className="text-gray-500 text-sm">Currently Inside</p>
            <h2 className="text-2xl font-bold">7</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorStatsCards;