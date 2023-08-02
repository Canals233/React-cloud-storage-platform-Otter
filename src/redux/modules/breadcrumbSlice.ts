import { createSlice } from "@reduxjs/toolkit";

const breadcrumbSlice = createSlice({
	name: "breadcrumb",
	initialState: {
		breadcrumbList: {},//这个属性已经不再使用，记得去掉
		currentBreadcrumb: {
			path: ["/home"],
			title: ["概览"],
		},
	},
	reducers: {
		
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
export const getCurrentBreadcrumb = (state:any) =>
	state.breadcrumb.currentBreadcrumb;

export const { setCurrentBreadcrumb, backToOneBreadcrumb } =
	breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
