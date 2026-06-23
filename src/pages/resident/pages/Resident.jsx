import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateResident } from "../store/residentSlice";

export const Resident = ({
    resident,
    onClose,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        ...resident.profile,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            updateResident({
                ...resident,
                profile: formData,
            })
        );

        onClose();
    };

    const inputClass =
        "w-full h-[45px] px-3 border border-gray-300 rounded-md";

    return (
        <form
            onSubmit={handleSave}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

            <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Edit Resident
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-red-500 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Flat Number</label>
                        <input
                            type="text"
                            name="flatNumber"
                            value={formData.flatNumber || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Resident Type</label>
                        <select
                            type="text"
                            name="residentType"
                            value={formData.residentType || ""}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="">Select Resident Type</option>
                            <option value="Owner">Owner</option>
                            <option value="Tenant">Tenant</option>
                        </select>
                    </div>

                    <div>
                        <label>Tower / Wing</label>
                        <input
                            type="text"
                            name="towerWing"
                            value={formData.towerWing || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Floor</label>
                        <input
                            type="text"
                            name="floor"
                            value={formData.floor || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label>Society Name</label>
                        <input
                            type="text"
                            name="societyName"
                            value={formData.societyName || ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        // onClick={handleSave}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </form>
    );
};