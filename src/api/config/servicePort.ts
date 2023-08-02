// 定义一个类型别名，包含所有可能的端口名
type PortName = "/user" | "/bucket" | "/login" | "/register" | "/help";

// 导出变量，并指定类型为 PortName
export const USERPORT: PortName = "/user";
export const BUCKETPORT: PortName = "/bucket";
export const LOGINPORT: PortName = "/login";
export const REGISTERPORT: PortName = "/register";
export const HELPPORT: PortName = "/help";

