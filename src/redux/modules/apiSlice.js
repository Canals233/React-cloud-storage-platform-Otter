import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "/api",

		prepareHeaders: (headers, { getState }) => {
			const token = getState().global.token;
			if (token) {
                console.log("token",token)
				headers.set("token", `${token}`);
			}
            headers.set('Content-Type','application/json;charset=UTF-8')
			
			return headers;
		},
		timeout: 10000,
	}),

	endpoints: (builder) => ({
		getBucketList: builder.mutation({
			query: () => ({
				url: "/bucket/list",
				method: "GET",
			}),
			providesTags: ["BucketList"],
			invalidatesTags: ["BucketList"],
		}),
		createBucket: builder.mutation({
			query: (bucketName,publicWriteEnable,publicReadEnable) => ({
				url: "/bucket/create",
				method: "POST",
				body: {
                    bucketName,
                    publicWriteEnable,
                    publicReadEnable
                }
			}),
			invalidatesTags: ["BucketList"],
		}),
		removeBucket: builder.mutation({
			query: (bucketId) => ({
				url: `/bucket/remove`,
				method: "POST",
				body: { bucketId },
			}),
			invalidatesTags: ["BucketList"],
		}),
		renameBucket: builder.mutation({
			query: (bucketId, newbucketName) => ({
				url: `/bucket/rename`,
				method: "POST",
				body: { bucketId, bucketName: newbucketName },
			}),
			invalidatesTags: ["BucketList"],
		}),
	}),
});
//query导出Query，mutation导出Mutation

export const {
	useGetBucketListMutation,
	useCreateBucketMutation,
	useRemoveBucketMutation,
	useRenameBucketMutation,
    
} = apiSlice;
