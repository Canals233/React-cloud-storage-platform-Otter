import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import Bucket from "@/views/bucket";
import BucketDetail from "../../views/bucket/bucketDetail/BucketDetail";
// bucket 模块
const bucketRouter = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/bucket/:name", // 将动态路由放在静态路由之前
				element: <BucketDetail />,
			},
			{
				path: "/bucket",
				//业务逻辑通常就是使用bucket，无需懒加载进行额外等待
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Bucket />,
				meta: {
					requiresAuth: true,
					title: "存储桶列表",
					key: "bucket",
				},
			},
		],
	},
];
export default bucketRouter;
