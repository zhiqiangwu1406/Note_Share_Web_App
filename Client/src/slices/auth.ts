import { createSlice } from "@reduxjs/toolkit";

export type authType = {
  userInfo: {
    id: string;
    username?: string;
    email: string;
    password?: string;
  } | null;
};

const initialState: authType = {
  userInfo:
    localStorage.getItem("userInfo") !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUserInfo: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    deleteUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { createUserInfo, deleteUserInfo } = authSlice.actions;
export default authSlice.reducer;
