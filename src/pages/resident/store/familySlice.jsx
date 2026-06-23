import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    familyList: [],
};

const familySlice = createSlice({
    name: "family",
    initialState,
    reducers: {
        addFamily: (state, action) => {
            state.familyList.push(action.payload)
        },
        deleteFamily: (state, action) => {
            state.familyList = state.familyList.filter(
                (member) => member.id !== action.payload
            );
        },
        updateFamily: (state, action) => {
            const index = state.familyList.findIndex(
                (member)=> member.id === action.payload.id
            );
            if(index !== -1){
                state.familyList[index] = action.payload;
            }
        },
    },
});

export const { addFamily, deleteFamily, updateFamily } = familySlice.actions;
export default familySlice.reducer;