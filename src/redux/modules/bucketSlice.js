import { createSlice } from "@reduxjs/toolkit";



const bucketSlice = createSlice({
	name: "bucket",
	initialState: {
		bucketList:[],
	},
	reducers: {
		setBucketList(state, action) {
			state.bucketList = action.payload;
		},
        addBucketList(state, action) {
            state.bucketList.unshift(action.payload);
        },
	},
});

export const { setBucketList,addBucketList } = bucketSlice.actions;

export default bucketSlice.reducer;
