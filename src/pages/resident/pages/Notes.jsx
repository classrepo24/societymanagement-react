import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotesToResident } from "../store/residentSlice";

export const Notes = ({
    residentId,
    onClose,
}) => {

    const dispatch = useDispatch();

    const [notes, setNotes] = useState({
        note: ""
    });

    const handleChange = (e) => {
        setNotes({
            ...notes,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            addNotesToResident({
                residentId,
                note: {
                    id: Date.now(),
                    text: notes.note,
                },
            })
        );

        onClose();
    };

    const inputClass =
        "w-full h-[60px] px-3 border border-gray-300 rounded-md";

    return (
        <form
            onSubmit={handleSave}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

            <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Add Notes
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
                        <label>Add Additional Notes</label><span className="text-red-500">*</span>
                        <textarea
                            name="note"
                            value={notes.note}
                            onChange={handleChange}
                            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md"
                            required
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
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Save
                    </button>

                </div>

            </div>

        </form>
    );
};
