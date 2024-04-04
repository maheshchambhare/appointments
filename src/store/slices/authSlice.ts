import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const JWTUSER: any = process.env.NEXT_PUBLIC_USER;

const BUSINESSUSER: any = process.env.NEXT_PUBLIC_USERBUSINESS;
const MEMBERUSER: any = process.env.NEXT_PUBLIC_USERMEMBER;

console.log(JWTUSER, "UU");

interface initialStateTypes {
  userLoggedIn: boolean;
  businessUserLoggedIn: boolean;
  userData: any;
  userType: any;
}

interface stateType {
  auth: initialStateTypes;
}

const businessUser = Cookies.get("businessUser") || null;
const userTypeData = Cookies.get("appointifyUser") || null;

const initialState = {
  userLoggedIn: false,
  businessUserLoggedIn: businessUser ? true : false,
  userData: businessUser !== null ? JSON.parse(businessUser) : null || null,
  userType:
    userTypeData !== null
      ? userTypeData == BUSINESSUSER
        ? 0
        : userTypeData == MEMBERUSER
        ? 1
        : null
      : null,
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
    setUserType: (state, data) => {
      state.userType = data.payload;
    },
  },
});

export const {
  setBusinessUserLoggedIn,
  setUserLoggedIn,
  setUserData,
  setUserType,
} = authSlice.actions;

export const getBusinessLoggedIn = (state: stateType) =>
  state.auth.businessUserLoggedIn;
export const getUserLoggedIn = (state: stateType) => state.auth.userLoggedIn;
export const getUserData = (state: stateType) => state.auth.userData;
export const getUserTypeData = (state: stateType) => state.auth.userType;

export default authSlice.reducer;
