import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
  },
  reducers: {
    login(state, action) {
        return {
            user: action.payload,
            isAuth: true
        }
    },
    logout(state, action) {
        return {
            user:null,
            isAuth: false
        }
    },
  },
});

export const {login,logout} = authSlice.actions

export const getAuthData = authSlice.auth

export default authSlice.reducer