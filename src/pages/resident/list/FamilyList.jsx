import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFamily, updateFamily } from '../store/familySlice'

export const FamilyList = () => {
    const dispatch = useDispatch();
    const familyList = useSelector(
        (state) => state.family.familyList
    );

    const [editId, setEditId] = useState(null);

    const [editData, setEditData] = useState({
        fullName: "",
        relation: "",
        age: "",
        gender: "",
        mobileNum: "",
    });

    const handleEdit = (member) => {
        setEditId(member.id);
        setEditData(member);
    };

    const handleSave = () => {
        dispatch(updateFamily(editData));

        setEditId(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                Family Members List
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-3">Sr No</th>
                            <th className="border p-3">Name</th>
                            <th className="border p-3">Relation</th>
                            <th className="border p-3">Age</th>
                            <th className="border p-3">Gender</th>
                            <th className="border p-3">Mobile</th>
                            <th className="border p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {familyList.length > 0 ? (
                            familyList.map((member, index) => (
                                <tr key={member.id}>
                                    <td className="border p-3">
                                        {index + 1}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <input
                                                value={editData.fullName}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        fullName: e.target.value,
                                                    })
                                                }
                                                className="border p-1 w-full"
                                            />
                                        ) : (
                                            member.fullName
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <input
                                                value={editData.relation}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        relation: e.target.value,
                                                    })
                                                }
                                                className="border p-1 w-full"
                                            />
                                        ) : (
                                            member.relation
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <input
                                                value={editData.age}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        age: e.target.value,
                                                    })
                                                }
                                                className="border p-1 w-full"
                                            />
                                        ) : (
                                            member.age
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <input
                                                value={editData.gender}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        gender: e.target.value,
                                                    })
                                                }
                                                className="border p-1 w-full"
                                            />
                                        ) : (
                                            member.gender
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <input
                                                value={editData.mobileNum}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        mobileNum: e.target.value,
                                                    })
                                                }
                                                className="border p-1 w-full"
                                            />
                                        ) : (
                                            member.mobileNum
                                        )}
                                    </td>

                                    <td className="border p-3">
                                        {editId === member.id ? (
                                            <i className="bi bi-bookmark text-green-600 hover:text-green-800 text-xl mx-1" onClick={handleSave}></i>
                                        ) : (
                                            <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 mr-2 text-xl" onClick={() => handleEdit(member)}></i>
                                        )}

                                        <i className="bi bi-trash text-red-500 hover:text-red-700 text-xl mx-1" onClick={() =>
                                            dispatch(deleteFamily(member.id))
                                        }></i>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center p-4"
                                >
                                    No Family Members Added
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
