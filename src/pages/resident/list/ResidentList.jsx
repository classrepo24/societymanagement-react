import React from 'react'
import { useSelector } from 'react-redux'

export const ResidentList = () => {
    const residents = useSelector(
        (state) => state.residents
    );
    return (
        <div className="space-y-6 mt-6">
      {residents.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-8">

            {/* Left Section */}
            <div className="flex items-start gap-6 flex-1">

              {/* Profile Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Resident Details */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {item.fullName}
                  </h2>

                  <span className="px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-[150px_300px] gap-y-5">
                  <p className="text-gray-500 text-left">Email</p>
                  <p className="font-semibold text-left">{item.email}</p>

                  <p className="text-gray-500 text-left">Mobile</p>
                  <p className="font-semibold text-left">{item.mobile}</p>

                  <p className="text-gray-500 text-left">Flat Number</p>
                  <p className="font-semibold text-left">{item.flatNumber}</p>

                  <p className="text-gray-500 text-left">Resident Type</p>

                  <div>
                    <span className="px-4 py-1 border border-blue-500 text-blue-600 rounded-md text-sm text-left">
                      {item.residentType}
                    </span>
                  </div>

                  <p className="text-gray-500 text-left">Move-in Date</p>

                  <p className="font-semibold text-left">
                    {item.moveInDate
                      ? new Date(item.moveInDate).toLocaleDateString("en-GB")
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-44 bg-gray-200"></div>

            {/* Right Section */}
            <div className="flex-1">
              <div className="grid grid-cols-[180px_200px] gap-y-5">
                <p className="text-gray-500 text-left">Tower / Wing</p>
                <p className="font-semibold text-left">{item.towerWing}</p>

                <p className="text-gray-500 text-left">Floor</p>
                <p className="font-semibold text-left">{item.floor}</p>

                <p className="text-gray-500 text-left">Society Name</p>
                <p className="font-semibold text-left">{item.societyName}</p>

                <p className="text-gray-500 text-left">Registration Date</p>

                <p className="font-semibold text-left">
                  {item.registrationDate
                    ? new Date(item.registrationDate).toLocaleDateString(
                        "en-GB"
                      )
                    : "-"}
                </p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
    )
}
