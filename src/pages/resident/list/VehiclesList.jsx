import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicles, deleteVehicles, addVehicles } from "../store/vehiclesSllice";

export const VehiclesList = () => {
    const dispatch = useDispatch();

    const vehicles = useSelector(
        (state) => state.vehicles?.vehiclesList || []
    );

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const handleEdit = (item) => {
        setEditId(item.id);
        setEditData(item);
    };

    const handleSave = () => {
        dispatch(updateVehicles(editData));
        setEditId(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                
                Vehicles List
            </h2>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Sr No</th>
                        <th className="border p-2">Number</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Model</th>
                        <th className="border p-2">Color</th>
                        <th className="border p-2">Parking</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {vehicles.length > 0 ? (
                        vehicles.map((v, index) => (
                            <tr key={v.id} className="text-center">
                                <td className="border p-2">
                                    {index + 1}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <input
                                            value={editData.vehNumber}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    vehNumber: e.target.value,
                                                })
                                            }
                                            className="border p-1 w-full"
                                        />
                                    ) : (
                                        v.vehNumber
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <input
                                            value={editData.vehType}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    vehType: e.target.value,
                                                })
                                            }
                                            className="border p-1 w-full"
                                        />
                                    ) : (
                                        v.vehType
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <input
                                            value={editData.vehModel}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    vehModel: e.target.value,
                                                })
                                            }
                                            className="border p-1 w-full"
                                        />
                                    ) : (
                                        v.vehModel
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <input
                                            value={editData.vehColor}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    vehColor: e.target.value,
                                                })
                                            }
                                            className="border p-1 w-full"
                                        />
                                    ) : (
                                        v.vehColor
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <input
                                            value={editData.vehParking}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    vehParking: e.target.value,
                                                })
                                            }
                                            className="border p-1 w-full"
                                        />
                                    ) : (
                                        v.vehParking
                                    )}
                                </td>

                                <td className="border p-2">
                                    {editId === v.id ? (
                                        <i className="bi bi-bookmark text-green-600 hover:text-green-800 text-xl mx-1" onClick={handleSave}></i>
                                    ) : (
                                        <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 mr-2 text-xl" onClick={() => handleEdit(v)}></i>
                                    )}
                                    <i className="bi bi-trash text-red-500 hover:text-red-700 text-xl mx-1" onClick={() =>
                                        dispatch(deleteVehicles(v.id))
                                    }></i>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="7"
                                className="text-center p-3"
                            >
                                No Vehicles Added
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
