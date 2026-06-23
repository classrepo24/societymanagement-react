import { createSlice } from "@reduxjs/toolkit";

const residentSlice = createSlice({
    name: "resident",
    initialState: [],
    reducers: {
        addResident: (state, action) => {
            state.push(action.payload);
        },

        updateResident: (state, action) => {
            const index = state.findIndex(
                (resident) => resident.id === action.payload.id
            );

            if (index !== -1) {
                state[index] = action.payload;
            }
        },

        deleteResident: (state, action) => {
            return state.filter(
                (resident) => resident.id !== action.payload
            );
        },
        addFamilyToResident: (state, action) => {
            const { residentId, familyMember } = action.payload;

            const resident = state.find(
                (item) => item.id === residentId
            );

            if (resident) {
                resident.family.push(familyMember);
            }
        },
        addVehicleToResident: (state, action) => {
            const { residentId, vehicle } = action.payload;

            const resident = state.find(
                (r) => r.id === residentId
            );

            if (resident) {
                resident.vehicles.push(vehicle);
            }
        },
        addNotesToResident: (state, action) => {
            const { residentId, note } = action.payload;

            const resident = state.find(
                (r) => r.id === residentId
            );

            if (resident) {
                if (!Array.isArray(resident.notes)) {
                    resident.notes = [];
                }

                resident.notes.push(note);
            }
        },
        updateFamilyMember: (state, action) => {
            const { residentId, member } = action.payload;

            const resident = state.find(r => r.id === residentId);

            if (resident) {
                const index = resident.family.findIndex(f => f.id === member.id);

                if (index !== -1) {
                    resident.family[index] = member;
                }
            }
        },
        updateVehicle: (state, action) => {
            const { residentId, vehicle } = action.payload;

            const resident = state.find(
                (r) => r.id === residentId
            );

            if (resident) {
                const index = resident.vehicles.findIndex(
                    (v) => v.id === vehicle.id
                );

                if (index !== -1) {
                    resident.vehicles[index] = vehicle;
                }
            }
        },
        deleteFamilyMember: (state, action) => {
            const { residentId, memberId } = action.payload;

            const resident = state.find(r => r.id === residentId);

            if (resident) {
                resident.family = resident.family.filter(
                    (f) => f.id !== memberId
                );
            }
        },
        deleteVehicle: (state, action) => {
            console.log("Reducer Payload:", action.payload);
            
            const { residentId, vehicleId } = action.payload;

            const resident = state.find(r => r.id === residentId);
            console.log("Resident Found:",resident);
            

            if (resident) {
                console.log("Before:", resident.vehicles.length);
                resident.vehicles = resident.vehicles.filter(
                    (v) => v.id !== vehicleId
                );
                 console.log("After:", resident.vehicles.length);
            }
        },
        deleteNote: (state, action) => {
            const { residentId, noteId } = action.payload;

            const resident = state.find(r => r.id === residentId);

            if (resident) {
                resident.notes = resident.notes.filter(
                    (n) => n.id !== noteId
                );
            }
        },
    },
});

export const {
    addResident,
    updateResident,
    deleteResident,
    addFamilyToResident,
    addVehicleToResident,
    addNotesToResident,
    updateFamilyMember,
    deleteFamilyMember,
    deleteNote,
    deleteVehicle,
    updateVehicle,
} = residentSlice.actions;

export default residentSlice.reducer;