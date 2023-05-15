import { createSlice } from "@reduxjs/toolkit";

export const pinSlice = createSlice({
  name: "pin",
  initialState: {
    pinChange: "",
  },
  reducers: {
    changePin: (state, action) => {
      return {
        pinChange: action.payload,
      };
    },
  },
});

export const { changePin } = pinSlice.actions;
export const selectPin = (state) => state.pinReducer.pinChange;

export default pinSlice.reducer;
