import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isloggedin: false },
  reducers: {
    login(state, action) {
      state.isloggedin = true;
      console.log("true from store");
    },
    logout(state, action) {
      state.isloggedin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
