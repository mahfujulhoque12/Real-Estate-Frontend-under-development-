import { createSlice } from "@reduxjs/toolkit";

const listingEditSlice = createSlice({
  name: "listingEdit",
  initialState: {
    editId: null,
    editData: null,
  },
  reducers: {
    setEditId(state, action) {
      state.editId = action.payload;
    },
    setEditData(state, action) {
      state.editData = action.payload;
    },
    clearEdit(state) {
      state.editId = null;
      state.editData = null;
    },
  },
});

export const { setEditId, setEditData, clearEdit } = listingEditSlice.actions;
export default listingEditSlice.reducer;
