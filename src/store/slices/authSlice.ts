import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface initialStateTypes {
  userLoggedIn: boolean;
  businessUserLoggedIn: boolean;
  userData: any;
}

interface stateType {
  auth: initialStateTypes;
}

const businessUser = Cookies.get("businessUser") || null;
// const businessUser = Cookies.get("businessUser") || null;

const initialState = {
  userLoggedIn: false,
  businessUserLoggedIn: businessUser ? true : false,
  userData: businessUser !== null ? JSON.parse(businessUser) : null || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBusinessUserLoggedIn: (state, data) => {
      state.businessUserLoggedIn = data.payload;
    },
    setUserLoggedIn: (state, data) => {
      state.userLoggedIn = data.payload;
    },
    setUserData: (state, data) => {
      state.userData = data.payload;
    },
  },
});

export const { setBusinessUserLoggedIn, setUserLoggedIn, setUserData } =
  authSlice.actions;

export const getBusinessLoggedIn = (state: stateType) =>
  state.auth.businessUserLoggedIn;
export const getUserLoggedIn = (state: stateType) => state.auth.userLoggedIn;
export const getUserData = (state: stateType) => state.auth.userData;

export default authSlice.reducer;
