import { createSlice } from "@reduxjs/toolkit";

const bucketSlice = createSlice({
	name: "bucket",
	initialState: {
		bucketList: [],
	},
	reducers: {
		setBucketList(state, action) {
			state.bucketList = action.payload;
		},
	},
});

export const { setBucketList } = bucketSlice.actions;

export default bucketSlice.reducer;
