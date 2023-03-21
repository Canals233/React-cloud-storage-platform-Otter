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
		addBucketList(state, action) {
			state.bucketList.unshift(action.payload);
		},
		changeBucketsAuth(state, action) {
			console.log("changeBucketsAuth", action.payload);
			const [keys, newVisiable] = action.payload;
			//直接利用immer的特性，直接修改state
			state.bucketList = state.bucketList.map((bucket) => {
				if (keys.includes(bucket.key)) {
					return { ...bucket, visiable: newVisiable };
				}
				return bucket;
			});
		},
		updateBucketTagsByKey(state, action) {
			const { key, tags } = action.payload;
			state.bucketList = state.bucketList.map((bucket) => {
				if (bucket.key === key) {
					return { ...bucket, tags };
				}
				return bucket;
			});
		},
	},
});

export const selectAllBucketList = (state) => state.bucket.bucketList;
export const selectBucketListByName = (bucketName) => (state) =>
	state.bucket.bucketList.filter((bucket) => bucket.name === bucketName)[0];
export const selectBucketByKey = (bucketKey) => (state) =>
	state.bucket.bucketList.filter((bucket) => bucket.key === bucketKey)[0];

export const {
	setBucketList,
	addBucketList,
	changeBucketsAuth,
	updateBucketTagsByKey,
} = bucketSlice.actions;

export default bucketSlice.reducer;
