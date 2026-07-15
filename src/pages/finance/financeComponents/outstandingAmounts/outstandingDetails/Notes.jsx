import React from "react";

export const Notes = ({ data }) => {

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6 mt-6">

            <div className="flex justify-between items-center mb-6">

                <h3 className="text-lg font-semibold text-[#1E2A5A]">
                    Notes
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-[#1E2A5A] text-sm font-medium shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-all">
                    <i className="bi bi-plus-lg"></i>
                    Add Note
                </button>
            </div>
            {data.notes.length === 0 ? (
                <div className="text-left">
                    <p className="text-gray-500 mt-3">
                        No Notes Available for this invoice
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.notes.map((note, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-4"
                        >
                            <p>{note.message}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {note.date}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};