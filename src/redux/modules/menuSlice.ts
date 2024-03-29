import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const menuData = [
	{
		icon: "HomeOutlined",
		title: "概览",
		path: "/home",
	},
	{
		icon: "DatabaseOutlined",
		title: "存储桶列表",
		path: "/bucket",
	},
	{
		icon: "FundOutlined",
		title: "可视化统计",
		path: "/dashboard",
	},
];

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

export const getIsCollapse = (state:RootState) => state.menu.isCollapse;
export const { updateCollapse } = menuSlice.actions;

export default menuSlice.reducer;
