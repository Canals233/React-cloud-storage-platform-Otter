import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
	name: "breadcrumb",
	initialState: {
		breadcrumbList: {},
        currentBreadcrumb:{},
	},
	reducers: {
		setBreadcrumbList(state, action) {
			state.breadcrumbList = action.payload;
		},
        setCurrentBreadcrumb(state, action) {
            state.currentBreadcrumb = action.payload;
        }
	},
});

export const { setBreadcrumbList ,setCurrentBreadcrumb} = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
