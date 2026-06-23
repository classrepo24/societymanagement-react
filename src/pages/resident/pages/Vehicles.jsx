import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVehicleToResident } from "../store/residentSlice";

export const Vehicles = ({
    residentId,
    onClose,
}) => {

    const dispatch = useDispatch();

    const [vehicle, setVehicle] = useState({
        vehNumber: "",
        vehType: "",
        vehModel: "",
        vehColor: "",
        vehParking: "",
    });

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(
            addVehicleToResident({
                residentId,
                vehicle: {
                    id: Date.now(),
                    ...vehicle,
                },
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
                        Add Vehicle
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
                        <label>Vehicle Number</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="vehNumber"
                            value={vehicle.vehNumber}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Vehicle Type</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="vehType"
                            value={vehicle.vehType}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Vehicle Model</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="vehModel"
                            value={vehicle.vehModel}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Vehicle Color</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="vehColor"
                            value={vehicle.vehColor}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label>Parking Slot</label><span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="vehParking"
                            value={vehicle.vehParking}
                            onChange={handleChange}
                            className={inputClass}
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