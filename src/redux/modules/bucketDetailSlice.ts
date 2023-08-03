import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";





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
export const bucketDetailSelector = (state:RootState) => state.bucketDetail;
export const { setAllDetailDirectory } = bucketDetailSlice.actions;
export default bucketDetailSlice.reducer;
