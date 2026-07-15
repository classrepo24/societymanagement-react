import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addVehicles } from '../../../store/residentStore/vehiclesSllice';


export const VehiclesForm = ({
  residentData,
  setResidentData,
}) => {
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState({
    vehNumber: "",
    vehType: "",
    vehModel: "",
    vehColor: "",
    vehParking: "",
  });
  const addVehicle = () => {
    setResidentData({
      ...residentData,
      vehicles: [
        ...residentData.vehicles,
        {
          id: Date.now(),
          ...vehicles,
        },
      ],
    });
    setVehicles({
      vehNumber: "",
      vehType: "",
      vehModel: "",
      vehColor: "",
      vehParking: "",
    });
  };
  const handleChange = (e) => {
    setVehicles({
      ...vehicles,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addVehicles({
      id: Date.now(),
      ...residentData,
    }));

    setResidentData({
      vehNumber: "",
      vehType: "",
      vehModel: "",
      vehColor: "",
      vehParking: "",
    });
  };
  const inputClass =
    "w-full h-[45px] px-3 border border-gray-300 rounded-md"
  return (
    <div className="w-full bg-white p-6">
      <div className="w-full bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
          Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicl Number
            </label>
            <input
              type="text"
              name="vehNumber"
              value={vehicles.vehNumber}
              onChange={handleChange}
              className={inputClass}
              
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicle Type 
            </label>
            <input
              type="text"
              name="vehType"
              value={vehicles.vehType}
              onChange={handleChange}
              className={inputClass}
              
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicle Model 
            </label>
            <input
              type="text"
              name="vehModel"
              value={vehicles.vehModel}
              onChange={handleChange}
              className={inputClass}
              
            />
          </div>

          {/* Flat Number */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Vehicle Color 
            </label>
            <input name="vehColor"
              value={vehicles.vehColor}
              onChange={handleChange}
              className={inputClass}
               >
            </input>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Parking Slot 
            </label>
            <input
              type="text"
              name="vehParking"
              value={vehicles.vehParking}
              onChange={handleChange}
              className={inputClass}
              
            />
          </div>


          {/* Button */}
          <div className="lg:col-span-3 mt-4">
            <button
              type="button"
              onClick={addVehicle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
