import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";

import BucketDetail from "@/views/bucket/bucketDetail/bucketDetail";
// bucket 模块
const bucketDetailRouter = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: "/bucket/:name:key",
                //业务逻辑通常就是使用bucket，无需懒加载进行额外等待
                // element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
                element: <BucketDetail/>,
                meta: {
                    requiresAuth: true,
                    title: "存储桶列表",
                    key: "bucket"
                }
            }
        ]
    }
];
export default bucketDetailRouter;
