import { createSlice } from "@reduxjs/toolkit";

const authState = {
	authButtons: {},
	authRouter: [],
};

export const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
	
		setAuthRouter: (state, action) => {
			state.authRouter = action.payload;
		},
	},
});

export const {  setAuthRouter } = authSlice.actions;

export default authSlice.reducer;
