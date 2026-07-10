import React from "react";

const DeleteModal = ({
  show,
  onClose,
  onDelete,
  title,
  message
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <div className="flex items-center gap-3 mb-4">

          <div>
            <h3 className="font-semibold text-red-700 text-lg">
              {title || "Delete Visitor"}
            </h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          {message || "Are you sure you want to delete this Visitor?"}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;