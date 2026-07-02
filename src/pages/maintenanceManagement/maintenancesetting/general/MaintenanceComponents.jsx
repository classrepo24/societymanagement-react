import React, { useState } from "react";
import { AddComponentPopup } from "./AddComponentPopup";
import { DeletePopup } from "../../../../components/DeletePopup";

export const MaintenanceComponents = () => {
    const [components, setComponents] = useState([
        {
            id: 1,
            name: "Common Maintenance",
            code: "CM",
            amount: "2000",
            enabled: true,
        },
        {
            id: 2,
            name: "Sinking Fund",
            code: "SF",
            amount: "300",
            enabled: true,
        },
        {
            id: 3,
            name: "Water Charges",
            code: "WC",
            amount: "100",
            enabled: true,
        },
        {
            id: 4,
            name: "Electricity (Common Area)",
            code: "ECA",
            amount: "250",
            enabled: true,
        },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleSave = () => {
        setEditingId(null);
    };

    const handleChange = (id, field, value) => {
        setComponents((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    const openDeletePopup = (id) => {
        setDeleteId(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        setComponents((prev) =>
            prev.filter((item) => item.id !== deleteId)
        );

        setDeleteId(null);
        setShowDeletePopup(false);
    };
    const handleAddComponent = (component) => {

        setComponents((prev) => [...prev, component]);

    };

    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold">
                6. Maintenance Components
            </h2>

            <p className="text-gray-500 text-sm mb-5">
                Manage different maintenance charge heads.
            </p>

            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left p-3">Component Name</th>
                        <th>Short Code</th>
                        <th>Included</th>
                        <th>Amount (₹)</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {components.map((item) => (
                        <tr key={item.id} className="border-t">

                            {/* Name */}
                            <td className="p-3">
                                {editingId === item.id ? (
                                    <input
                                        value={item.name}
                                        onChange={(e) =>
                                            handleChange(item.id, "name", e.target.value)
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>

                            {/* Code */}
                            <td className="text-center">
                                {editingId === item.id ? (
                                    <input
                                        value={item.code}
                                        onChange={(e) =>
                                            handleChange(item.id, "code", e.target.value)
                                        }
                                        className="border rounded px-2 py-1 w-16 text-center"
                                    />
                                ) : (
                                    item.code
                                )}
                            </td>

                            {/* Toggle */}
                            <td className="text-center">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={item.enabled}
                                        onChange={() =>
                                            handleChange(
                                                item.id,
                                                "enabled",
                                                !item.enabled
                                            )
                                        }
                                        className="peer sr-only"
                                    />

                                    <div className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-600 transition after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                                </label>
                            </td>
                            {/* Amount */}
                            <td className="text-center">
                                {editingId === item.id ? (
                                    <input
                                        value={item.amount}
                                        onChange={(e) =>
                                            handleChange(item.id, "amount", e.target.value)
                                        }
                                        className="border rounded px-2 py-1 w-24 text-center"
                                    />
                                ) : (
                                    item.amount
                                )}
                            </td>

                            {/* Actions */}
                            <td className="text-center">
                                {editingId === item.id ? (
                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={handleSave}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="bi bi-pencil-square fs-5"></i>
                                        </button>

                                        <button
                                            onClick={() => openDeletePopup(item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <i className="bi bi-trash fs-5"></i>
                                        </button>

                                    </div>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => setShowAddPopup(true)}
                className="mt-5 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
            >
                <i className="bi bi-plus-lg"></i>

                Add Component
            </button>

            {showDeletePopup && (
                <DeletePopup
                    onClose={() => {
                        setShowDeletePopup(false);
                        setDeleteId(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
            {
                showAddPopup && (
                    <AddComponentPopup
                        onClose={() => setShowAddPopup(false)}
                        onAdd={handleAddComponent}
                    />
                )
            }
        </div>
    );
};

