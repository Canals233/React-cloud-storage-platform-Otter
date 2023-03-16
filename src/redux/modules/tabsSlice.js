import { createSlice } from "@reduxjs/toolkit";
import { HOME_URL } from "@/config/config";
const tabsState = {
	// tabsActive 其实没啥用，使用 pathname 就可以了😂
	tabsActive: HOME_URL,
	tabsList: [{ title: "首页", path: HOME_URL }],
};

export const tabsSlice = createSlice({
	name: "tabs",
	initialState: tabsState,
	reducers: {
		setTabsList: (state, action) => {
			state.tabsList = action.payload;
		},
		setTabsActive: (state, action) => {
			state.tabsActive = action.payload;
		},
	},
});

export const { setTabsList, setTabsActive } = tabsSlice.actions;
export default tabsSlice.reducer;
