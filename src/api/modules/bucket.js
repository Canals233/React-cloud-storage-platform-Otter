import myaxios from "@/api";
import { BUCKETPORT } from "@/api/config/servicePort";

export const createBucketApi= (params, configs = {}) => {
	return myaxios.post(BUCKETPORT + `/create`, params, configs);
};

export const removeBucketApi= (params, configs = {}) => {
    return myaxios.post(BUCKETPORT + `/remove`, params, configs);
}