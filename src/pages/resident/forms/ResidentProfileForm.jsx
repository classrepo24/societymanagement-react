import React, { useState } from 'react'
import { ProfilyForm } from './ProfilyForm'
import { FamilyForm } from './FamilyForm'
import { VehiclesForm } from './VehiclesForm'
import { NotesForm } from './NotesForm'
import { useDispatch } from 'react-redux'
import { addResident } from '../../../store/residentStore/residentSlice'

export const ResidentProfileForm = () => {
    const dispatch = useDispatch();
    const [residentData, setResidentData] = useState({
        profile: {},
        family: [],
        vehicles: [],
        notes: "",
    });
    const [preview, setPreview] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SUBMIT DATA => ", residentData);
        const data = {
            id: Date.now(),
            ...residentData,
        };

        console.log("DISPATCH DATA =>", data);



        dispatch(
            addResident({
                id: Date.now(),
                ...residentData,
            })
        );

        console.log(residentData);
        setResidentData({
            profile: {
                fullName: "",
                email: "",
                mobile: "",
                flatNumber: "",
                residentType: "",
                moveInDate: "",
                towerWing: "",
                floor: "",
                societyName: "",
                registrationDate: "",
                profileImage: "",
            },
            family: [],
            vehicles: [],
            notes: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-xl shadow-md p-6 space-y-8"
        >
            <ProfilyForm
                residentData={residentData}
                setResidentData={setResidentData}
                preview={preview}
                setPreview={setPreview}
            />

            <FamilyForm
                residentData={residentData}
                setResidentData={setResidentData}
            />

            <VehiclesForm
                residentData={residentData}
                setResidentData={setResidentData}
            />

            <NotesForm
                residentData={residentData}
                setResidentData={setResidentData}
            />

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                >
                    Save Complete Resident Profile
                </button>
            </div>
        </form>
    )
}
