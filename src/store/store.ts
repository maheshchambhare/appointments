import { configureStore } from "@reduxjs/toolkit";
import commonSlices from "./slices/commonSlices";

export default configureStore({
  reducer: { common: commonSlices },
});
