import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "/api",

		prepareHeaders: (headers, { getState }) => {
			const token = getState().global.token;
			if (token) {
				headers.set("token", `${token}`);
			}
			console.log(headers, "headers");
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
            query: (createBucketObject) => ({
                url: "/bucket/create",
                method: "POST",
                body: createBucketObject,
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
            query:(bucketId,newbucketName)=>({
                url:`/bucket/rename`,
                method:"POST",
                body:{bucketId,bucketName:newbucketName}
            }),
            invalidatesTags:["BucketList"]
        }),
	}),
});
//query导出Query，mutation导出Mutation

export const { useGetBucketListMutation } = apiSlice;
