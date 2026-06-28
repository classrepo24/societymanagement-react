import React from 'react'

export const MaintenanceChargeConfigure = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-black">
                1. Maintenance Charge Configuration
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
                Define how maintenance charges are calculated.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Side */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Calculation Method
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Fixed Amount</option>
                        <option>Area Wise</option>
                        <option>Unit Wise</option>
                    </select>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Effective From
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                defaultValue="2025-04-01"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side Preview */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                    <h3 className="font-semibold text-slate-700 mb-4">
                        Preview
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-700">
                                Common Maintenance
                            </span>

                            <span className="text-slate-700">
                                ₹2,000.00 / Month
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-700">
                                Sinking Fund
                            </span>

                            <span className="text-slate-700">
                                ₹300.00 / Month
                            </span>
                        </div>

                        <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total</span>

                            <span className="text-blue-600">
                                ₹2,300.00 / Month
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
