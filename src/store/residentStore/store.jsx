import { configureStore } from "@reduxjs/toolkit";
import residentReducer from "./residentSlice"
import familyReducer from "./familySlice"
import notesReducer from "./notesSlice";
import vehiclesReducer from "./vehiclesSllice"

export const store = configureStore({
  reducer: {
    residents: residentReducer,
    family: familyReducer,
    vehicles: vehiclesReducer,
    notes: notesReducer,
  },
});