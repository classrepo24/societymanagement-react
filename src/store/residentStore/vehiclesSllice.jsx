import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehiclesList: [],
};

const vehiclesSlice = createSlice({
    name: "vehicles",
    initialState,
    reducers: {
        addVehicles: (state, action) => {
            state.vehiclesList.push(action.payload);
        },

        deleteVehicles: (state, action) => {
            state.vehiclesList = state.vehiclesList.filter(
                (vehicle) => vehicle.id !== action.payload
            );
        },

        updateVehicles: (state, action) => {
            const index = state.vehiclesList.findIndex(
                (note) => note.id === action.payload.id
            );

            if (index !== -1) {
                state.vehiclesList[index] = action.payload;
            }
        },
    },
});

export const { addVehicles, deleteVehicles, updateVehicles } =
    vehiclesSlice.actions;

export default vehiclesSlice.reducer;