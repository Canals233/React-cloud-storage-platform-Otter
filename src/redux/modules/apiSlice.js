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
		console.log("拦截到的响应:", result);
		if (result.error?.status === "TIMEOUT_ERROR") {
			throw new Error("请求超时");
		} else if (result.error?.status === "FETCH_ERROR") {
			throw new Error("网络错误,请检查网络连接");
		} else if (result.data?.data?.errorMsg) {
			const errorMsg = result.data.data.errorMsg;
			console.log("拦截到的错误", errorMsg);
			if (errorMsg.includes("expired")) {
				store.dispatch(setToken(""));
				store.dispatch(setTokenExpired(true));
				throw new Error("token过期");
			} else if (errorMsg.includes("重复的存储桶名称")) {
				throw new Error(errorMsg);
			}
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
		deleteBucket: builder.mutation({
			query: (deleteBucketObject) => ({
				url: `/bucket/delete`,
				method: "POST",
				body: deleteBucketObject,
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
		getDirectoryContentList: builder.mutation({
			query: (getDirectoryContentListObject) => ({
				url: `/directory/list`,
				method: "GET",
				body: getDirectoryContentListObject,
			}),
			providesTags: ["DirectoryList"],
			invalidatesTags: ["DirectoryList"],
		}),
		createDirectory: builder.mutation({
			query: (createDirectoryObject) => ({
				url: `/directory/create`,
				method: "POST",
				body: createDirectoryObject,
			}),
			invalidatesTags: ["DirectoryList"],
		}),
		deleteDirectory: builder.mutation({
			query: (deleteDirectoryObject) => ({
				url: `/directory/delete`,
				method: "POST",
				body: deleteDirectoryObject,
			}),
			invalidatesTags: ["DirectoryList"],
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
	useDeleteBucketMutation,
	useRenameBucketMutation,
	useGetDirectoryContentListMutation,
	useCreateDirectoryMutation,
	useDeleteDirectoryMutation,
} = apiSlice;
