import { createSlice } from "@reduxjs/toolkit";
import staffData from "../data/staff.json";

const savedStaffs = JSON.parse(localStorage.getItem("staffs"));

const initialState = {
  staffs: savedStaffs || staffData.staff,
  selectedStaff: null,
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,

  
  reducers: {

    setStaffs(state, action) {
      state.staffs = action.payload;
      localStorage.setItem("staffs", JSON.stringify(action.payload));
    },

    addStaff(state, action) {
  state.staffs.unshift(action.payload);
  localStorage.setItem("staffs", JSON.stringify(state.staffs));
},

    updateStaff(state, action) {
      state.staffs = state.staffs.map((staff) =>
        staff.id === action.payload.id ? action.payload : staff
      );
      localStorage.setItem("staffs", JSON.stringify(state.staffs));
    },

    deleteStaff(state, action) {
      state.staffs = state.staffs.filter(
        (staff) => staff.id !== action.payload
      );
      localStorage.setItem("staffs", JSON.stringify(state.staffs));
    },

    setSelectedStaff(state, action) {
  state.selectedStaff = action.payload;
},

clearSelectedStaff(state) {
  state.selectedStaff = null;
},
  },
});

export const {
  setStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  setSelectedStaff,
  clearSelectedStaff
} = staffSlice.actions;

export default staffSlice.reducer;