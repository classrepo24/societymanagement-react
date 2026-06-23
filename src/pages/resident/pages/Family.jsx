import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFamilyToResident } from "../store/residentSlice";

export const Family = ({ residentId, onClose }) => {
    const dispatch = useDispatch();

    const [family, setFamily] = useState({
        name: "",
        relation: "",
        age: "",
        gender: "",
        mobileNum: "",
    });

    const handleChange = (e) => {
        setFamily({
            ...family,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            addFamilyToResident({
                residentId,
                familyMember: {
                    id: Date.now(),
                    ...family,
                },
            })
        );

        onClose();
    };

    const inputClass =
        "w-full h-[45px] px-3 border border-gray-300 rounded-md";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Add Family Member
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-red-500 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form
                    id="familyForm"
                    onSubmit={handleSave}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div>
                        <label>Full Name</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="name"
                            value={family.name}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Relation</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="relation"
                            value={family.relation}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Age</label><span className="text-red-500">*</span>
                        <input
                            type="number"
                            name="age"
                            value={family.age}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Gender</label><span className="text-red-500">*</span>
                        <select
                            name="gender"
                            value={family.gender}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="transgender">Transgender</option>
                        </select>
                    </div>

                    <div>
                        <label>Mobile Number</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="mobileNum"
                            value={family.mobileNum}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                </form>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        form="familyForm"
                        type="submit"
                        // onClick={handleSave}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
};