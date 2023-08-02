import { createSlice } from "@reduxjs/toolkit";





const bucketDetailSlice = createSlice({
	name: "bucketDetail",
	initialState: {
        bucketDetailDirectory:[],
    },
	reducers: {
		setAllDetailDirectory(state, action) {
            state.bucketDetailDirectory = action.payload;
        }
	},
});
export const bucketDetailSelector = (state:any) => state.bucketDetail;
export const { setAllDetailDirectory } = bucketDetailSlice.actions;
export default bucketDetailSlice.reducer;
