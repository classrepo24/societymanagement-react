import React from "react";

export const RequestPopup = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-[92%] max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">

          <h2 className="text-lg font-semibold text-gray-800">
            Request Details
          </h2>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          >
            <i className="bi bi-x-lg text-gray-600"></i>
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Request ID</p>
              <p className="font-semibold text-gray-800">{data.id}</p>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-semibold text-gray-800">{data.category}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Title</p>
              <p className="font-semibold text-gray-800">{data.title}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-500">Description</p>
              <p className="text-gray-700">{data.description}</p>
            </div>

            <div>
              <p className="text-gray-500">Priority</p>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                {data.priority}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                {data.status}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Requested On</p>
              <p className="font-medium text-gray-800">
                {data.requestedDate} {data.requestedTime}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Updated On</p>
              <p className="font-medium text-gray-800">
                {data.updatedDate} {data.updatedTime}
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end bg-gray-50">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};