namespace API {
    export type TRequestMethod = (url: string, params?: any, _object?: any) => any;
    export type TBucketAPI =(params:Record<string,any>, configs :Record<string,any>) => any;
    export type TLoginAPI = (subport: string, queryObject: Record<string,any>, configs: Record<string,any>) => any;
    export type TRegisterAPI = (subport: string, queryObject: Record<string,any>, params: Record<string,any>, configs: Record<string,any>) => any;
    export type TUtilAPI=TRegisterAPI;
}

export default API