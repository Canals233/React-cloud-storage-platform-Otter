import { createSlice } from "@reduxjs/toolkit";

const globalState = {
	token: "",
    tokenExpired:false,
	userInfo: "",
	assemblySize: "middle",
	language: "",
	themeConfig: {
		primary: "#1890ff",
		isDark: false,
		weakOrGray: "",
		breadcrumb: true,
		tabs: true,
		footer: true,
	},
};

export const globalSlice = createSlice({
	name: "global",
	initialState: globalState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
        setTokenExpired: (state, action) => {
            state.tokenExpired = action.payload;
        },
		setAssemblySize: (state, action) => {
			state.assemblySize = action.payload;
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
		setThemeConfig: (state, action) => {
			state.themeConfig = action.payload;
		},
	},
});

export const { setToken,setTokenExpired, setAssemblySize, setLanguage, setThemeConfig } =
	globalSlice.actions;

export default globalSlice.reducer;
