import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const bucketDetailAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.name.localeCompare(a.name),
});

const initialState = bucketDetailAdapter.getInitialState({
	status: "idle",
	error: null,
    ids:[],
    entities: {}
});

const bucketDetailSlice = createSlice({
	name: "bucketDetail",
	initialState: initialState,
	reducers: {
		setAllBucketDetail: (state,action)=>{
            bucketDetailAdapter.setAll(state,action.payload)
        },
	},
});
export const { selectAll: selectAllBucketDetail } =
	bucketDetailAdapter.getSelectors(state=>state.bucketDetail);
export const { setAllBucketDetail } = bucketDetailSlice.actions;
export default bucketDetailSlice.reducer;
