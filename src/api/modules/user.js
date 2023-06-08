import myaxios from "@/api";
import { HELPPORT, LOGINPORT, REGISTERPORT } from "@/api/config/servicePort";

const queryObjectToQurey = (queryObject) => {
	if (queryObject === null || queryObject === undefined) return "";
	let query = "";
	for (const key in queryObject) {
		query += `${key}=${queryObject[key]}&`;
	}
	return query.slice(0, -1);
};

/**
 * @name 登录模块
 * @param {string} subport
 * @param {object} queryObject
 * @param {object} configs
 */
// * 用户登录接口
export const loginApi = (subport, queryObject, configs = {}) => {
	return myaxios.post(
		LOGINPORT + subport + "?" + queryObjectToQurey(queryObject),
		configs
	);
};
/**
 *
 * @param {string} subport
 * @param {object} queryObject
 * @param {object} params
 * @param {object} configs
 * @returns
 */
export const registerApi = (subport, queryObject, params, configs = {}) => {
	return myaxios.post(
		REGISTERPORT + subport + "?" + queryObjectToQurey(queryObject),
		params,
		configs
	);
};
/**
 *
 * @param {string} subport
 * @param {object} queryObject
 * @param {object} params
 * @param {object} configs
 * @returns
 */
export const helpApi = (subport, queryObject, params, configs = {}) => {
	return myaxios.post(
		HELPPORT + subport + "?" + queryObjectToQurey(queryObject),
		params,
		configs
	);
};
