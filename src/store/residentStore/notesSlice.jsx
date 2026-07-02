import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesList: [],
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNotes: (state, action) => {
            state.notesList.push(action.payload);
        },

        deleteNotes: (state, action) => {
            state.notesList = state.notesList.filter(
                (note) => note.id !== action.payload
            );
        },

        updateNotes: (state, action) => {
            const index = state.notesList.findIndex(
                (note) => note.id === action.payload.id
            );

            if (index !== -1) {
                state.notesList[index] = action.payload;
            }
        },
    },
});

export const { addNotes, deleteNotes, updateNotes } =
    notesSlice.actions;

export default notesSlice.reducer;