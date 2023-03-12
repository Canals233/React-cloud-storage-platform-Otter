import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState: {
    breadcrumbList: {}
  },
  reducers: {
    setBreadcrumbList(state, action) {
      state.breadcrumbList = action.payload;
    }
  }
});

export const { setBreadcrumbList } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
