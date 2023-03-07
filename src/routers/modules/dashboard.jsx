import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
// dashboard 模块
const dashboardRouter = [
    {
        element: <LayoutIndex />,
        meta: {
            title: "Dashboard"
        },
        children: [
            {
                path: "/dashboard/dataVisualize",
                element: lazyLoad(React.lazy(() => import("@/views/dashboard/dataVisualize/index"))),
                meta: {
                    requiresAuth: true,
                    title: "数据可视化",
                    key: "dataVisualize"
                }
            }
        ]
    }
];
export default dashboardRouter;
