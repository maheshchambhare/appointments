import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  businessSectionType: string;
}

interface stateType {
  common: initialStateTypes;
}
const initialState = {
  businessSectionType: "1", // 1 for tabs,2 for slots form
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setBusinessSectionType: (state, data) => {
      state.businessSectionType = data.payload;
    },
  },
});

export const { setBusinessSectionType } = commonSlice.actions;

export const getBusinessSectionType = (state: stateType) =>
  state.common.businessSectionType;

export default commonSlice.reducer;
