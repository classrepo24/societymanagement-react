import { createSlice } from "@reduxjs/toolkit";
import visitorsData from "../data/visitors.json";

const visitorsSlice = createSlice({
  name: "visitors",

  initialState: {
    visitors: visitorsData,
  },

  reducers: {
    setVisitors(state, action) {
      state.visitors = action.payload;
    },
  },
});

export const { setVisitors } = visitorsSlice.actions;

export default visitorsSlice.reducer;