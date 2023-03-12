import { createSlice } from "@reduxjs/toolkit";

const authState = {
	authButtons: {},
	authRouter: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		setAuthButtons: (state, action) => {
			state.authButtons = action.payload;
		},
		setAuthRouter: (state, action) => {
			state.authRouter = action.payload;
		},
	},
});

export const { setAuthButtons, setAuthRouter } = authSlice.actions;

export default authSlice.reducer;
