import { message } from "antd";

enum StatusCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
}

/**
 * @description: 校验网络请求状态码
 * @param {StatusCode} status
 * @return void
 */
export const checkStatus = (status: StatusCode) => {
    switch (status) {
        case StatusCode.BadRequest:
            message.error("请求失败！请您稍后重试");
            break;
        case StatusCode.Unauthorized:
            message.error("登录失效！请您重新登录");
            break;
        case StatusCode.Forbidden:
            message.error("当前账号无权限访问！");
            break;
        case StatusCode.NotFound:
            message.error("你所访问的资源不存在！");
            break;
        case StatusCode.MethodNotAllowed:
            message.error("请求方式错误！请您稍后重试");
            break;
        case StatusCode.RequestTimeout:
            message.error("请求超时！请您稍后重试");
            break;
        case StatusCode.InternalServerError:
            message.error("服务异常！");
            break;
        case StatusCode.BadGateway:
            message.error("网关错误！");
            break;
        case StatusCode.ServiceUnavailable:
            message.error("服务不可用！");
            break;
        case StatusCode.GatewayTimeout:
            message.error("网关超时！");
            break;
        default:
            message.error("请求失败！");
    }
};
