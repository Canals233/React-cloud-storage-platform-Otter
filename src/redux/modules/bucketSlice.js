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
        changeBucketsAuth(state, action) {
            console.log("changeBucketsAuth", action.payload)
            const [keys, newVisiable] = action.payload;
            //直接利用immer的特性，直接修改state
            state.bucketList = state.bucketList.map((bucket) => {
                if (keys.includes(bucket.key)) {
                    return {...bucket, visiable: newVisiable};
                }
                return bucket;
            });
            
        }
	},
});

export const selectAllBucketList = (state) => state.bucket.bucketList;

export const { setBucketList,addBucketList,changeBucketsAuth } = bucketSlice.actions;

export default bucketSlice.reducer;
