import React, { useEffect, useState } from "react";

const Edit = ({
  isOpen,
  document,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (document) {
      setStatus(document.status || "Pending");
    }
  }, [document]);

  if (!isOpen || !document) return null;

  const handleSave = () => {
    onSave({
      ...document,
      status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Edit Document
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Document Name
            </label>

            <input
              type="text"
              value={document.documentName}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
};

export default Edit;