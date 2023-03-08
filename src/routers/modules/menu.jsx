import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
// menu 模块
const menuRouter = [
    {
        element: <LayoutIndex />,
        children: [
            {
                path: "/bucket/index",
                // element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
                element: <Home />,
                meta: {
                    requiresAuth: true,
                    title: "存储桶列表",
                    key: "bucket"
                }
            }
        ]
    }
];
export default menuRouter;
