import * as types from "@/redux/mutation-types";
// * setBreadcrumbList
export const setBreadcrumbList = (breadcrumbList) => ({
    type: types.SET_BREADCRUMB_LIST,
    breadcrumbList
});
