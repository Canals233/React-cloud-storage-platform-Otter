import { createSlice } from "@reduxjs/toolkit";

const globalState = {
	token: "",
	tokenExpired: false,
	userInfo: "",
	assemblySize: "middle",
	language: "",
	isElectorn: false,
	email: "",
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
		setIsElectorn: (state, action) => {
			state.isElectorn = action.payload;
		},
		setEmail: (state, action) => {
			state.email = action.payload;
		},
	},
});

export const {
	setToken,
	setTokenExpired,
	setAssemblySize,
	setLanguage,
	setThemeConfig,
	setIsElectorn,
	setEmail,
} = globalSlice.actions;
export const getGlobalState = (state:any) => state.global;
export const getIsElectorn = (state:any) => state.global.isElectorn;
export const getEmail = (state:any) => state.global.email;

export default globalSlice.reducer;
