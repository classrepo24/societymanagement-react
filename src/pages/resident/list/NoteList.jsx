import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, updateNotes } from "../store/notesSlice"

export const NoteList = () => {
    const notesList = useSelector(
        (state) => state.notes.notesList
    );

    const dispatch = useDispatch();

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (note) => {
        setEditId(note.id);
        setEditText(note.notes);
    };

    const handleSave = (id) => {
        console.log("SAVE CLICKED", id, editText);
        dispatch(
            updateNotes({
                id,
                notes: editText,
            })
        );

        setEditId(null);
        setEditText("");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-4">
                Notes List
            </h2>

            <table className="w-full border">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="border p-3">Sr No</th>
                        <th className="border p-3">Notes</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {notesList.length > 0 ? (
                        notesList.map((note, index) => (
                            <tr key={note.id}>
                                <td className="border p-3 text-center">
                                    {index + 1}
                                </td>

                                <td className="border p-3">
                                    {editId === note.id ? (
                                        <textarea
                                            value={editText}
                                            onChange={(e) =>
                                                setEditText(e.target.value)
                                            }
                                            className="w-full border p-2"
                                        />
                                    ) : (
                                        note.notes
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editId === note.id ? (
                                        <i className="bi bi-bookmark text-green-600 hover:text-green-800 text-xl mx-1" onClick={() => handleSave(note.id)}></i>
                                    ) : (
                                        <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 mr-2 text-xl" onClick={() => handleEdit(note)}></i>
                                    )}
                                    <i className="bi bi-trash text-red-500 hover:text-red-700 text-xl mx-1" onClick={() =>
                                        dispatch(deleteNotes(note.id))
                                    }></i>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center p-4"
                            >
                                No Notes Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
