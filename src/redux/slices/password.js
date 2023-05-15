import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password",
  initialState: {
    passwordChange: "",
  },
  reducers: {
    changePassword: (state, action) => {
      return {
        passwordChange: action.payload,
      };
    },
  },
});

export const { changePassword } = passwordSlice.actions;
export const selectPassword = (state) => state.passwordReducer.passwordChange;

export default passwordSlice.reducer;
