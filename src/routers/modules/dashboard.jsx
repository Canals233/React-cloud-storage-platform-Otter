import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
// dashboard 模块
const dashboardRouter = [
    {
        element: <LayoutIndex />,
     
        children: [
            {
                path: "/dashboard",
                element: lazyLoad(React.lazy(() => import("@/views/dashboard/index"))),
                meta: {
                    requiresAuth: true,
                    title: "可视化统计",
                    key: "dataVisualize"
                }
            }
        ]
    }
];
export default dashboardRouter;
