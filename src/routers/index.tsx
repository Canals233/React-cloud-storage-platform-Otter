import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Login from "@/views/login/index";
// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");
// * 处理路由
export const routerArray:RouteObject[] = [];
// console.log(metaRouters,'metaRouters')
Object.keys(metaRouters).forEach(item => {
    // console.log(metaRouters[item],'item')
    Object.keys(metaRouters[item] as Record<string,any>).forEach((key) => {
        const routers:RouteObject[] = (metaRouters[item] as Record<string,any>)[key];
        routerArray.push(...routers);
    });
});
export const rootRouter = [
    {
        path: "/",
        element: <Navigate to="/login"/>
    },
    {
        path: "/login",
        element: <Login />,
        meta: {
            requiresAuth: false,
            title: "登录页",
            key: "login"
        }
    },
    ...routerArray,
    {
        path: "*",
        element: <Navigate to="/404"/>
    }
];
// console.log(rootRouter,'rootRouter')
const Router = () => {
    const routes = useRoutes(rootRouter);
    return routes;
};
export default Router;
/**
 * 主要工作逻辑如下
● 通过globEager把上面代码块的所有默认导出的内容拼成 键名为globEager里面补全通配符的相对路径名字，值为一个带有symbol的Module对象
● 对metaRouters进行遍历，就可以取到这些module对象，遍历键来取值（即metaRouters[item][key]），就可以取到各个单路由的默认导出内容，比如上面的 homeRouter数组现在就被取到
● 将数组解构，得到的就是各个带有element和children的对象
● 创建rootRouter，建立能被接收react的useRoutes和antd接收的对象，把上面存对象的数组解构，把各个对象加入
● 如果直接用path，在antd里面就是直接点击，是children就会成抽屉
 */