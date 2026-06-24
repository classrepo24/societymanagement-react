import React from "react";

const DeleteVisitorModal = ({
  show,
  onClose,
  onDelete,
  visitor,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <i className="bi bi-trash text-red-600 text-xl"></i>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Delete Visitor
            </h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {visitor?.name}
          </span>
          ?
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

export default DeleteVisitorModal;