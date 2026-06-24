import React from "react";

const ViewVisitorModal = ({ visitor, onClose }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Visitor Details</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-6 border-b bg-gray-50">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            {visitor.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-3 text-lg font-semibold">
            {visitor.name}
          </h3>

          <p className="text-sm text-gray-500">
            {visitor.phone}
          </p>

          <span
  className={`mt-3 px-3 py-1 rounded-md text-xs font-medium ${
    visitor.status === "inside"
      ? "bg-green-100 text-green-700"
      : visitor.status === "exited"
      ? "bg-gray-200 text-gray-700"
      : visitor.status === "preRegistered"
      ? "bg-blue-100 text-blue-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {visitor.status === "inside"
    ? "Inside Society"
    : visitor.status === "exited"
    ? "Exited"
    : visitor.status === "preRegistered"
    ? "Pre Registered"
    : visitor.status}
</span>
        </div>

        {/* Details */}
        <div className="p-6 ml-20">
          <div className="grid grid-cols-2 gap-5">

            <div>
              <p className="text-xs text-gray-500 mb-1">Whom To Visit</p>
              <p className="font-medium">{visitor.whom}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Flat / Wing</p>
              <p className="font-medium">{visitor.flat}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Purpose</p>
              <p className="font-medium">{visitor.purpose}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
              <p className="font-medium">{visitor.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">In Time</p>
              <p className="font-medium">{visitor.inTime}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Out Time</p>
              <p className="font-medium">
                {visitor.outTime || "--"}
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewVisitorModal;