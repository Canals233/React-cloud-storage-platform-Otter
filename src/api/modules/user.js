import { USERPORT } from "@/api/config/servicePort";
import qs from "qs";
import myaxios from "@/api";
/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params, configs = {}) => {
	return myaxios.post(USERPORT + `/login`, params, configs);
};
export const registerApi = (params,configs = {}) => {
	return myaxios.post(USERPORT+`/register`,params,configs);
};
// * 获取按钮权限
export const getAuthorButtons = () => {
	return myaxios.get(USERPORT + `/auth/buttons`);
};
