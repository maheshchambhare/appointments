import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  businessSectionType: string;
  disablememberAdd: boolean;
}

interface stateType {
  common: initialStateTypes;
}
const initialState = {
  businessSectionType: "1", // 1 for tabs,2 for slots form
  disablememberAdd: false,
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
  },
});

export const { setBusinessSectionType, setdisablememberAdd } =
  commonSlice.actions;

export const getBusinessSectionType = (state: stateType) =>
  state.common.businessSectionType;

export const getdisablememberAdd = (state: stateType) =>
  state.common.disablememberAdd;
export default commonSlice.reducer;
