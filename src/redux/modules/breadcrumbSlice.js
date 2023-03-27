import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
	name: "breadcrumb",
	initialState: {
		breadcrumbList: {},
		currentBreadcrumb: {},
	},
	reducers: {
		setBreadcrumbList(state, action) {
			state.breadcrumbList = action.payload;
		},
		setCurrentBreadcrumb(state, action) {
			state.currentBreadcrumb = action.payload;
		},
		backToOneBreadcrumb(state, action) {
			const endPath = action.payload;
			if (endPath === "/home") {
				state.currentBreadcrumb = {
					path: ["/home"],
					title: ["概览"],
				};
			} else {
				let len = state.currentBreadcrumb.path.length;

				for (let i = len - 1; i >= 0; i--) {
					console.log(state.currentBreadcrumb.path[i], endPath);
					if (state.currentBreadcrumb.path[i] === endPath) {
						break;
					}
					state.currentBreadcrumb.path.pop();
					state.currentBreadcrumb.title.pop();
				}
			}
		},
	},
});
export const getCurrentBreadcrumb = (state) =>
	state.breadcrumb.currentBreadcrumb;

export const { setBreadcrumbList, setCurrentBreadcrumb, backToOneBreadcrumb } =
	breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
