import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.isAuthenticated = true;
      const { email } = action.payload;
      console.log("email", email);
      if (email === "testing2609@gmail.com") {
        state.isAdmin = true;
      }
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.userInfo = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
