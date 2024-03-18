import { configureStore } from "@reduxjs/toolkit";
import commonSlices from "./slices/commonSlices";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: { common: commonSlices, auth: authSlice },
});
