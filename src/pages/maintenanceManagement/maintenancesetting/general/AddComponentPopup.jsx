import React, { useState } from "react";

export const AddComponentPopup = ({ onClose, onAdd }) => {

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        amount: "",
        enabled: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {

        if (
            !formData.name ||
            !formData.code ||
            !formData.amount
        ) {
            alert("Please fill all fields");
            return;
        }

        onAdd({
            id: Date.now(),
            ...formData
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-[450px] p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Add Maintenance Component
                </h2>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Component Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        type="text"
                        name="code"
                        placeholder="Short Code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                </div>

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Add
                    </button>

                </div>

            </div>

        </div>
    );
};