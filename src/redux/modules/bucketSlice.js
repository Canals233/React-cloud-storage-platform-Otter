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
        deleteBucketByBucketId(state, action) {
            const bucketId = action.payload;
            state.bucketList = state.bucketList.filter((bucket) => bucket.bucketId !== bucketId);
        },
        renameBucketByBucketId(state, action) {
            const { bucketId, newBucketName } = action.payload;
            state.bucketList = state.bucketList.map((bucket) => {
                if (bucket.bucketId === bucketId) {
                    return { ...bucket, name: newBucketName };
                }
                return bucket;
            });
        },
		changeBucketsAuth(state, action) {
			
			const [bucketIds, newPublicEnableObject] = action.payload;
			//直接利用immer的特性，直接修改state
			state.bucketList = state.bucketList.map((bucket) => {
				if (bucketIds.includes(bucket.bucketId)) {
					return { ...bucket, ...newPublicEnableObject };
				}
				return bucket;
			});
		},
		updateBucketTagsByBucketId(state, action) {
			const { bucketId, tags } = action.payload;
			state.bucketList = state.bucketList.map((bucket) => {
				if (bucket.bucketId === bucketId) {
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
export const selectBucketByBucketId = (bucketId) => (state) =>
	state.bucket.bucketList.filter((bucket) => bucket.bucketId === bucketId)[0];

export const {
	setBucketList,
	addBucketList,
    deleteBucketByBucketId,
    renameBucketByBucketId,
	changeBucketsAuth,
	updateBucketTagsByBucketId,
} = bucketSlice.actions;

export default bucketSlice.reducer;
