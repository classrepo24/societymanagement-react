import React from 'react'

export const DeletePopup = ({onClose, onConfirm}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Confirm Delete
        </h2>

        <p className="mb-6">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
