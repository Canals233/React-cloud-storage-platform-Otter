import NProgress from "@/config/nprogress";
import axios, { CreateAxiosDefaults } from "axios";
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from "@/config/serviceLoading";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { setToken } from "@/redux/modules/globalSlice";
import { message } from "antd";
import { store } from "@/redux";
type MyRequestMethod = (url: string, params?: any, _object?: any) => any;

const axiosCanceler = new AxiosCanceler();
const config = {
    // 默认地址请求地址，可在 .env 开头文件中修改
    baseURL: (import.meta as any).env.VITE_API_URL,
    // 设置超时时间（10s）
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true,
};
class RequestHttp {
    get: MyRequestMethod;
    post: MyRequestMethod;
    put: MyRequestMethod;
    delete: MyRequestMethod;
    service;
    constructor(config: CreateAxiosDefaults<any> | undefined) {
        // 实例化axios
        this.service = axios.create(config);
        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
         */
        this.service.interceptors.request.use(
            (originalConfig: any) => {
                // console.log(originalConfig,'原生请求头')
                NProgress.start();
                // * 将当前请求添加到 pending 中
                axiosCanceler.addPending(originalConfig);
                // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
                originalConfig.headers.noLoading || showFullScreenLoading();
                const token = store.getState().global.token;
                return {
                    ...originalConfig,
                    headers: { ...originalConfig.headers, token: token },
                };
                //为所有请求添加上token
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response) => {
                console.log(response, "OKresponse");
                const { data, config } = response;
                NProgress.done();
                // * 在请求结束后，移除本次请求(关闭loading)
                axiosCanceler.removePending(config);
                tryHideFullScreenLoading();
                // * 登录失效（code == 599）
                if (data.code == ResultEnum.OVERDUE) {
                    store.dispatch(setToken(""));
                    message.error(data.msg);
                    window.location.hash = "/login";
                    return Promise.reject(data);
                }
                // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code === 0) {
                    console.log(data.code, "data.code");
                    message.error(data.msg);
                    return Promise.reject(data);
                }
                // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
                return data;
            },
            async (error) => {
                const { response } = error;
                console.log(response, "ERRORresponse");
                NProgress.done();
                tryHideFullScreenLoading();
                // 请求超时单独判断，请求超时没有 response
                if (error.message.indexOf("timeout") !== -1)
                    message.error("请求超时，请稍后再试");
                // 根据响应的错误状态码，做不同的处理
                if (response) checkStatus(response.status);
                // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
                if (!window.navigator.onLine) window.location.hash = "/500";
                return Promise.reject(error);
            }
        );
        this.get = (url, params, _object) => {
            return this.service.get(url, { params, ..._object });
        };

        this.post = (url, params, _object) => {
            return this.service.post(url, params, _object);
        };

        this.put = (url, params, _object) => {
            return this.service.put(url, params, _object);
        };

        this.delete = (url, params, _object) => {
            return this.service.delete(url, { params, ..._object });
        };
    }
}
export default new RequestHttp(config);
