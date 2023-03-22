import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMenuList } from "@/api/modules/login";

export const getMenuListAction = createAsyncThunk(
	"menu/getMenuListAction",
	async () => {
		const res = await getMenuList();
		return res.data ? res.data : [];
	}
);
//实际上getMenu的函数根本没有用上。

const menuSlice = createSlice({
	name: "menu",
	initialState: {
		isCollapse: false,
		menuList: [],
	},
	reducers: {
		updateCollapse: (state, action) => {
			state.isCollapse = action.payload;
		},
		setMenuList: (state, action) => {
			state.menuList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMenuListAction.fulfilled, (state, action) => {
			state.menuList = action.payload;
		});
	},
});

export const getCollapse = (state) => state.menu.isCollapse;

export const { updateCollapse, setMenuList } = menuSlice.actions;

export default menuSlice.reducer;
