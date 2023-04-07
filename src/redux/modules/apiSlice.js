import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { includes } from "lodash";
import { store } from "@/redux";
import { setToken, setTokenExpired } from "./globalSlice";
const bq = fetchBaseQuery({
	baseUrl: "/api",

	prepareHeaders: (headers, { getState }) => {
		const token = getState().global.token;
		if (token) {
			headers.set("token", `${token}`);
		}
		headers.set("Content-Type", "application/json;charset=UTF-8");

		return headers;
	},

	timeout: 10000,
});
export const apiSlice = createApi({
	reducerPath: "api",
	async baseQuery(...args) {
		const result = await bq(...args);
		console.log("拦截到的请求:", result);
		if (result.data.data.includes("expired")) {
            store.dispatch(setToken(''))
			store.dispatch(setTokenExpired(true));
			throw new Error("token过期");
		}
		return result;
	},

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
			query: (removeBucketObject) => ({
				url: `/bucket/remove`,
				method: "POST",
				body: removeBucketObject,
			}),
			invalidatesTags: ["BucketList"],
		}),
		renameBucket: builder.mutation({
			query: (renameBucketObject) => ({
				url: `/bucket/rename`,
				method: "POST",
				body: renameBucketObject,
			}),
			invalidatesTags: ["BucketList"],
		}),
	}),
});
//query导出Query，mutation导出Mutation
// apiSlice.middleware.unshift({
// 	async onResponse(res) {
// 		// 在这里处理响应
// 		console.log("拦截到响应:", res);

// 		// 返回响应本身或者经过处理后的结果
// 		return res;
// 	},
// });
export const {
	useGetBucketListMutation,
	useCreateBucketMutation,
	useRemoveBucketMutation,
	useRenameBucketMutation,
} = apiSlice;
