import React from "react";

export const HistoryFilter = ({
    search,
    setSearch,
    status,
    setStatus,
    category,
    setCategory,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
}) => {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-t-2xl p-6">

            <div className="flex flex-wrap xl:flex-nowrap items-end gap-4 w-full">

                {/* Search */}
                <div className="w-full xl:flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                    </label>

                    <div className="relative">
                        <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Request ID, Title..."
                            className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="w-full sm:w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* Category */}
                <div className="w-full sm:w-[180px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="All">All</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Housekeeping">Housekeeping</option>
                        <option value="Parking">Parking</option>
                        <option value="Carpentry">Carpentry</option>
                    </select>
                </div>

                {/* Date Range (single box look) */}
                <div className="w-full xl:w-[340px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                    </label>

                    <div className="flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-1/2 h-full px-3 outline-none"
                        />

                        <span className="text-gray-400 px-2">—</span>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-1/2 h-full px-3 outline-none"
                        />

                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 xl:ml-auto">

                    <button className="h-12 px-5 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center gap-2">
                        <i className="bi bi-funnel"></i>
                        Filter
                    </button>

                    <button
                        onClick={resetFilters}
                        className="h-12 px-5 rounded-lg border border-gray-300 hover:bg-gray-100 transition flex items-center gap-2"
                    >
                        <i class="bi bi-download"></i>
                        Export

                    </button>

                </div>

            </div>
        </div>
    );
};