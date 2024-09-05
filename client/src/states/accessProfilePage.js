import { createSlice } from "@reduxjs/toolkit";
//hydi lhatta if form submit it successfully
const initialState = {
  isUserAuthenticate: false,
};

export const accessProfilePage = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    setUserAuthenticate: (state, action) => {
      state.isUserAuthenticate = action.payload;
    },
  },
});

export const { setUserAuthenticate } = accessProfilePage.actions;

export default accessProfilePage.reducer;
