import myaxios from "@/api";
import { BUCKETPORT } from "@/api/config/servicePort";
import API from "@/types/api";

export const createBucketApi:API.TBucketAPI= (params:Record<string,any>, configs :Record<string,any>) => {
	return myaxios.post(BUCKETPORT + `/create`, params, configs);
};

export const deleteBucketApi:API.TBucketAPI= (params:Record<string,any>, configs :Record<string,any>) => {
    return myaxios.post(BUCKETPORT + `/delete`, params, configs);
}