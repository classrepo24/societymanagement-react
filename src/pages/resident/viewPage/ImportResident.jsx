import React from "react";
import { useDispatch } from "react-redux";
import { addResident } from "../../../store/residentStore/residentSlice";

export const ImportResident = () => {
    const dispatch = useDispatch();

    const handleImport = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            const data = await response.json();

            data.forEach((user) => {
                dispatch(
                    addResident({
                        id: user.id,

                        profile: {
                            fullName: user.name,
                            email: user.email,
                            mobile: user.phone,
                            flatNumber: "A-" + user.id,
                            residentType: "Owner",
                            moveInDate: "2026-01-01",
                            towerWing: "A Wing",
                            floor: "1",
                            societyName: "Green Society",
                            registrationDate: "2026-01-01",
                            profileImage:
                                "https://i.pravatar.cc/150?img=" + user.id,
                        },

                        family: [],
                        vehicles: [],
                        notes: "",
                    })
                );
            });

            alert("Residents Imported Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={handleImport}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Import Residents From API
            </button>
        </div>
    );
};