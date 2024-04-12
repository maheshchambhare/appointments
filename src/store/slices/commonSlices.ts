import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  businessSectionType: string;
  disablememberAdd: boolean;
  callAppointments: boolean;
}

interface stateType {
  common: initialStateTypes;
}
const initialState = {
  businessSectionType: "1", // 1 for tabs,2 for slots form
  disablememberAdd: false,
  callAppointments: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setBusinessSectionType: (state, data) => {
      state.businessSectionType = data.payload;
    },
    setdisablememberAdd: (state, data) => {
      state.disablememberAdd = data.payload;
    },
    setCallAppointments: (state, data) => {
      state.callAppointments = data.payload;
    },
  },
});

export const {
  setBusinessSectionType,
  setdisablememberAdd,
  setCallAppointments,
} = commonSlice.actions;

export const getBusinessSectionType = (state: stateType) =>
  state.common.businessSectionType;

export const getdisablememberAdd = (state: stateType) =>
  state.common.disablememberAdd;

export const getCallAppointments = (state: stateType) =>
  state.common.callAppointments;
export default commonSlice.reducer;
