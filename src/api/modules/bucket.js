import myaxios from "@/api";
import { BUCKETPORT } from "@/api/config/servicePort";

export const createBucketApi= (params, configs = {}) => {
	return myaxios.post(BUCKETPORT + `/create`, params, configs);
};

export const deleteBucketApi= (params, configs = {}) => {
    return myaxios.post(BUCKETPORT + `/delete`, params, configs);
}