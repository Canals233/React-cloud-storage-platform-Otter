import myaxios from "@/api";
import { HELPPORT, LOGINPORT, REGISTERPORT } from "@/api/config/servicePort";
import API from "@/types/api";

const queryObjectToQurey = (queryObject:Record<string,any>) => {
	if (queryObject === null || queryObject === undefined) return "";
	let query = "";
	for (const key in queryObject) {
		query += `${key}=${queryObject[key]}&`;
	}
	return query.slice(0, -1);
};

// * 用户登录接口
export const loginApi:API.TLoginAPI = (subport, queryObject, configs) => {
	return myaxios.post(
		LOGINPORT + subport + "?" + queryObjectToQurey(queryObject),
		configs
	);
};

export const registerApi:API.TRegisterAPI = (subport, queryObject, params, configs :object) => {
	return myaxios.post(
		REGISTERPORT + subport + "?" + queryObjectToQurey(queryObject),
		params,
		configs
	);
};

export const utilAPI:API.TUtilAPI = (subport, queryObject, params, configs :object) => {
	return myaxios.post(
		HELPPORT + subport + "?" + queryObjectToQurey(queryObject),
		params,
		configs
	);
};
