import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Family, FamilyPopup } from "../popup/FamilyPopup";
import { Vehicles, VehiclesPopup } from "../popup/VehiclesPopup";
import { Notes, NotesPopup } from "../popup/NotesPopup";
import { updateFamilyMember, deleteFamilyMember, deleteVehicle, updateVehicle } from "../../../store/residentStore/residentSlice";
import { Resident, ResidentPopup } from "../popup/ResidentPopup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DeletePopup } from "../../../components/DeletePopup";
import { Breadcrumb } from "../../../components/Breadcrumb";

export const ResidentProfileView = ({
    residentId,
}) => {
    console.log("ResidentProfileView Loaded");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showEditResidentModal, setShowEditResidentModal] = useState(false);
    const [selectedResident, setSelectedResident] = useState(null);
    const [showFamilyModal, setShowFamilyModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [selectedResidentId, setSelectedResidentId] = useState(null);
    const [showFamilyDeletePopup, setShowFamilyDeletePopup] = useState(false);
    const [showVehicleDeletePopup, setShowVehicleDeletePopup] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    //const [selectedResidentId, setSelectedResidentId] = useState(null);
    const handleEditResident = (resident) => {
        setSelectedResident(resident);
        setShowEditResidentModal(true);
    };
    const handleAddFamily = (residentId) => {
        console.log("Button Clicked", residentId);
        setSelectedResidentId(residentId);
        setShowFamilyModal(true);
        console.log("Modal Open");
    };
    const handleAddVehicle = (residentId) => {
        setSelectedResidentId(residentId);
        setShowVehicleModal(true);
    };
    const handleAddNotes = (residentId) => {
        setSelectedResidentId(residentId);
        setShowNotesModal(true);
    };

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [editingVehicleId, setEditingVehicleId] = useState(null);
    const [vehicleEditForm, setVehicleEditForm] = useState({});

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditForm(item);
    };
    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value,
        });
    };
    const handleSave = (residentId) => {
        console.log("Resident ID:", residentId);
        console.log("Edit Form:", editForm);

        dispatch(
            updateFamilyMember({
                residentId,
                member: editForm,
            })
        );

        setEditingId(null);
    };
    const handleVehicleEdit = (vehicle) => {
        setEditingVehicleId(vehicle.id);
        setVehicleEditForm(vehicle);
    };
    const handleVehicleChange = (e) => {
        setVehicleEditForm({
            ...vehicleEditForm,
            [e.target.name]: e.target.value,
        });
    };
    const handleVehicleSave = (residentId) => {
        dispatch(
            updateVehicle({
                residentId,
                vehicle: vehicleEditForm,
            })
        );

        setEditingVehicleId(null);
    };

    const residents = useSelector((state) => state.residents);
    console.log("Residents =", residents);


    return (
        <>
            <div className="space-y-6">
                {residents.map((resident) => (
                    <div
                        key={resident.id}
                        className="bg-white-100 border shadow-sm"
                    >
                        <div className="bg-[#fbfbfe] min-h-screen p-6">
                            {/* Page Header */}
                            <div className="flex justify-between items-start mb-6">

                                <div>
                                    <Breadcrumb
                                        items={[
                                            { label: "Residents" },
                                            { label: "Resident Profile" },
                                        ]}
                                        title="Resident Profile"
                                        subtitle="Manage resident information, family members and vehicles."
                                    />
                                </div>

                                <div className="flex gap-3 mt-10">
                                    {/* Buttons */}
                                    <button
                                        onClick={() => navigate("/resident-profile-view")}
                                        className="border px-4 py-2 rounded-lg"
                                    >
                                        ← Back to Resident
                                    </button>
                                    <button
                                        onClick={() => handleEditResident(resident)}
                                        className="border px-4 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        <i className="bi bi-pencil-square text-lg"></i>
                                        <span>Edit Resident</span>
                                    </button>

                                    <button
                                        onClick={() => navigate("/resident-form")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        + Add New Resident
                                    </button>

                                </div>

                            </div>

                            {/* Main Card */}
                            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                                <div className="flex items-start gap-8">


                                    {/* Profile Image */}
                                    <div className="w-28 h-28 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                        <img
                                            src={resident?.profile?.profileImage}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Left Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-5">
                                            <h2 className="text-3xl font-bold text-slate-900">
                                                {resident?.profile?.fullName}
                                            </h2>

                                            <span className="px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-[150px_300px] gap-y-5">

                                            <p className="text-gray-500  text-left">Email</p>
                                            <p className="font-medium  text-left">
                                                {resident?.profile?.email}
                                            </p>

                                            <p className="text-gray-500  text-left">Mobile</p>
                                            <p className="font-medium  text-left">
                                                +91  {resident?.profile?.mobile}
                                            </p>

                                            <p className="text-gray-500  text-left">Flat Number</p>
                                            <p className="font-medium  text-left">
                                                {resident?.profile?.flatNumber}
                                            </p>

                                            <p className="text-gray-500  text-left">Resident Type</p>

                                            <div className="text-left">
                                                <span className="inline-block px-3 py-1 border border-blue-500 text-blue-600 rounded-md text-sm">
                                                    {resident?.profile?.residentType}
                                                </span>
                                            </div>

                                            <p className="text-gray-500  text-left">Move-in Date</p>
                                            <p className="font-medium  text-left">
                                                {resident?.profile?.moveInDate}
                                            </p>

                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-px h-44 bg-gray-200 mt-12 "></div>

                                    {/* Right Details */}
                                    <div className="flex-1">

                                        <div className="grid grid-cols-[180px_220px] gap-y-5 text-left mt-12">

                                            <p className="text-gray-500 text-left">
                                                Tower / Wing
                                            </p>
                                            <p className="font-medium text-left">
                                                {resident?.profile?.towerWing}
                                            </p>

                                            <p className="text-gray-500 text-left">
                                                Floor
                                            </p>
                                            <p className="font-medium text-left">
                                                {resident?.profile?.floor}
                                            </p>

                                            <p className="text-gray-500 text-left">
                                                Society Name
                                            </p>
                                            <p className="font-medium text-left">
                                                {resident?.profile?.societyName}
                                            </p>

                                            <p className="text-gray-500 text-left">
                                                Registration Date
                                            </p>
                                            <p className="font-medium text-left">
                                                {resident?.profile?.registrationDate}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Family Members */}
                                {/* Family Members */}
                                <div div className="mt-8 border rounded-xl overflow-hidden bg-white" >

                                    <div className="flex justify-between items-center px-5 py-4 border-b">
                                        <h2 className="text-xl font-bold flex items-center gap-2">
                                            <i className="bi bi-people-fill text-blue-600"></i>
                                            Family Members
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => handleAddFamily(resident.id)}
                                            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg"
                                        >
                                            + Add Family Member
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto m-5">
                                        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                                            <thead>
                                                <tr className="bg-slate-50 border">
                                                    <th className="px-4 py-4 text-left">Sr. No.</th>
                                                    <th className="px-4 py-4 text-left">Name</th>
                                                    <th className="px-4 py-4 text-left">Relation</th>
                                                    <th className="px-4 py-4 text-left">Age</th>
                                                    <th className="px-4 py-4 text-left">Gender</th>
                                                    <th className="px-4 py-4 text-left">Mobile Number</th>
                                                    <th className="px-4 py-4 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resident?.family?.length > 0 ? (
                                                    resident.family.map((item, index) => (
                                                        <tr
                                                            key={item.id}
                                                            className="hover:bg-slate-50"
                                                        >
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {index + 1}
                                                            </td>

                                                            {/* NAME */}
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingId === item.id ? (
                                                                    <input
                                                                        name="name"
                                                                        value={editForm.name}
                                                                        onChange={handleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.name
                                                                )}
                                                            </td>

                                                            {/* RELATION */}
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingId === item.id ? (
                                                                    <input
                                                                        name="relation"
                                                                        value={editForm.relation}
                                                                        onChange={handleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.relation
                                                                )}
                                                            </td>

                                                            {/* AGE */}
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingId === item.id ? (
                                                                    <input
                                                                        name="age"
                                                                        value={editForm.age}
                                                                        onChange={handleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.age
                                                                )}
                                                            </td>
                                                            {/* MOBILE */}
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingId === item.id ? (
                                                                    <input
                                                                        name="gender"
                                                                        value={editForm.gender}
                                                                        onChange={handleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.gender
                                                                )}
                                                            </td>

                                                            {/* MOBILE */}
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingId === item.id ? (
                                                                    <input
                                                                        name="mobileNum"
                                                                        value={editForm.mobileNum}
                                                                        onChange={handleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    `+91 ${item.mobileNum}`
                                                                )}
                                                            </td>

                                                            {/* ACTIONS */}
                                                            <td className="border-t border-b px-4 py-4 ">
                                                                <div className="flex justify-center gap-3 text-left">

                                                                    {editingId === item.id ? (
                                                                        <button
                                                                            onClick={() => {
                                                                                console.log("Saved clicked", item.id);
                                                                                handleSave(resident.id)
                                                                            }}
                                                                            className="text-green-600 text-left"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    ) : (
                                                                        <button onClick={() => {
                                                                            console.log("EDIT CLICKED", item.id);
                                                                            handleEdit(item)
                                                                        }}>
                                                                            <i className="bi bi-pencil-square text-amber-500 text-lg text-left"></i>
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedMember(item);
                                                                            setSelectedResidentId(resident.id);
                                                                            setShowFamilyDeletePopup(true);
                                                                        }}
                                                                    >
                                                                        <i className="bi bi-trash text-red-500 text-lg hover:text-red-600"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="7"
                                                            className="text-center py-6 text-gray-500"
                                                        >
                                                            No Family Members Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                {/* Vehicles */}
                                <div className="mt-8 border rounded-xl overflow-hidden bg-white">

                                    <div className="flex justify-between items-center px-5 py-4 border-b">
                                        <h2 className="text-xl font-bold flex items-center gap-2">
                                            <i class="bi bi-car-front-fill text-blue-600"></i>
                                            Vehicles
                                        </h2>

                                        <button
                                            onClick={() => handleAddVehicle(resident.id)}
                                            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
                                        >
                                            + Add Vehicle
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full table-fixed">
                                            <thead>
                                                <tr className="bg-slate-100 text-gray-700">

                                                    <th className="px-4 py-4 text-left">Sr No</th>
                                                    <th className="px-4 py-4 text-left">Vehicle Number</th>
                                                    <th className="px-4 py-4 text-left">Vehicle Type</th>
                                                    <th className="px-4 py-4 text-left">Model</th>
                                                    <th className="px-4 py-4 text-left">Color</th>
                                                    <th className="px-4 py-4 text-left">Parking Slot</th>
                                                    <th className="px-4 py-4 text-center">Actions</th>

                                                </tr>
                                            </thead>

                                            <tbody>
                                                {resident?.vehicles?.length > 0 ? (
                                                    resident.vehicles.map((item, index) => (
                                                        <tr
                                                            key={item.id}
                                                            className="hover:bg-slate-50"
                                                        >
                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {index + 1}
                                                            </td>

                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingVehicleId === item.id ? (
                                                                    <input
                                                                        name="vehNumber"
                                                                        value={vehicleEditForm.vehNumber}
                                                                        onChange={handleVehicleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.vehNumber
                                                                )}
                                                            </td>

                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingVehicleId === item.id ? (
                                                                    <input
                                                                        name="vehType"
                                                                        value={vehicleEditForm.vehType}
                                                                        onChange={handleVehicleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.vehType
                                                                )}
                                                            </td>

                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingVehicleId === item.id ? (
                                                                    <input
                                                                        name="vehModel"
                                                                        value={vehicleEditForm.vehModel}
                                                                        onChange={handleVehicleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.vehModel
                                                                )}
                                                            </td>

                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingVehicleId === item.id ? (
                                                                    <input
                                                                        name="vehColor"
                                                                        value={vehicleEditForm.vehColor}
                                                                        onChange={handleVehicleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.vehColor
                                                                )}
                                                            </td>

                                                            <td className="border-t border-b px-4 py-4 text-left">
                                                                {editingVehicleId === item.id ? (
                                                                    <input
                                                                        name="vehParking"
                                                                        value={vehicleEditForm.vehParking}
                                                                        onChange={handleVehicleChange}
                                                                        className="border p-1 w-full"
                                                                    />
                                                                ) : (
                                                                    item.vehParking
                                                                )}
                                                            </td>

                                                            {/* ACTIONS */}
                                                            <td className="border-t border-b px-4 py-4">
                                                                <div className="flex justify-center gap-3">

                                                                    {editingVehicleId === item.id ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleVehicleSave(resident.id)
                                                                            }
                                                                            className="text-green-600"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleVehicleEdit(item)
                                                                            }
                                                                        >
                                                                            <i className="bi bi-pencil-square text-amber-500 text-lg"></i>
                                                                        </button>
                                                                    )}

                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedVehicle(item);
                                                                            setSelectedResidentId(resident.id);
                                                                            setShowVehicleDeletePopup(true);
                                                                        }}
                                                                    >
                                                                        <i className="bi bi-trash text-red-500 text-lg hover:text-red-600"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="7"
                                                            className="text-center py-6 text-gray-500"
                                                        >
                                                            No Vehicles Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                {/* Notes */}
                                <div className="mt-8 border rounded-xl p-5">

                                    <div className="flex justify-between items-center px-5 py-4 border-b">
                                        <h2 className="text-xl font-bold">📝 Additional Notes</h2>

                                        <button
                                            onClick={() => handleAddNotes(resident.id)}
                                            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg"
                                        >
                                            + Add Notes
                                        </button>
                                    </div>

                                    <div className="mt-4 space-y-2 text-left">
                                        {Array.isArray(resident?.notes) && resident.notes.length > 0 ? (
                                            resident.notes.map((note) => (
                                                <p key={note.id} className="text-gray-700 border p-2 rounded">
                                                    {note.text}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">
                                                No additional notes available.
                                            </p>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div >

                    </div>

                ))}


            </div>
            {showEditResidentModal && (
                <ResidentPopup
                    resident={selectedResident}
                    onClose={() =>
                        setShowEditResidentModal(false)
                    }
                />
            )}
            {showFamilyModal && (
                <FamilyPopup
                    residentId={selectedResidentId}
                    onClose={() => setShowFamilyModal(false)}
                />
            )}
            {showVehicleModal && (
                <VehiclesPopup
                    residentId={selectedResidentId}
                    onClose={() => setShowVehicleModal(false)}
                />
            )}
            {showNotesModal && (
                <NotesPopup
                    residentId={selectedResidentId}
                    onClose={() => setShowNotesModal(false)}
                />
            )}
            {showFamilyDeletePopup && (
                <DeletePopup
                    onClose={() => {
                        setShowFamilyDeletePopup(false);
                        setSelectedMember(null);
                    }}
                    onConfirm={() => {
                        dispatch(
                            deleteFamilyMember({
                                residentId: selectedResidentId,
                                memberId: selectedMember.id,
                            })
                        );

                        setShowFamilyDeletePopup(false);
                        setSelectedMember(null);
                    }}
                />
            )}
            {showVehicleDeletePopup && (
                <DeletePopup
                    onClose={() => {
                        setShowVehicleDeletePopup(false);
                        setSelectedVehicle(null);
                    }}
                    onConfirm={() => {
                        dispatch(
                            deleteVehicle({
                                residentId: selectedResidentId,
                                vehicleId: selectedVehicle.id,
                            })
                        );

                        setShowVehicleDeletePopup(false);
                        setSelectedVehicle(null);
                    }}
                />
            )}

        </>
    );
};
