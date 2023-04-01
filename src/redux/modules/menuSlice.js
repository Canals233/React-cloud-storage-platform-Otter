import { createSlice } from "@reduxjs/toolkit";

import menuData from "@/mock/menu.json";

const menuSlice = createSlice({
	name: "menu",
	initialState: {
		isCollapse: false,
		menuList: menuData,
	},
	reducers: {
		updateCollapse: (state, action) => {
			state.isCollapse = action.payload;
		},
		
	},
	
});

export const getIsCollapse = (state) => state.menu.isCollapse;
export const getMenuList = (state) => state.menu.menuList;
export const { updateCollapse} = menuSlice.actions;

export default menuSlice.reducer;
