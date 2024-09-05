import { configureStore } from "@reduxjs/toolkit";
import accessProfilePage from "./accessProfilePage";
export default configureStore({
  reducer: {
    userAuthentication: accessProfilePage,
  },
});
