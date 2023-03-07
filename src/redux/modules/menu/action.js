import * as types from "@/redux/mutation-types";
import { getMenuList } from "@/api/modules/login";
// * updateCollapse
export const updateCollapse = (isCollapse) => ({
    type: types.UPDATE_COLLAPSE,
    isCollapse
});
// * setMenuList
export const setMenuList = (menuList) => ({
    type: types.SET_MENU_LIST,
    menuList
});
// * redux-thunk
export const getMenuListActionThunk = () => {
    return async (dispatch) => {
        const res = await getMenuList();
        dispatch({
            type: types.SET_MENU_LIST,
            menuList: res.data ?? []
        });
    };
};
// * redux-promise《async/await》
export const getMenuListAction = async () => {
    const res = await getMenuList();
    return {
        type: types.SET_MENU_LIST,
        menuList: res.data ? res.data : []
    };
};
// * redux-promise《.then/.catch》
export const getMenuListActionPromise = () => {
    return getMenuList().then(res => {
        return {
            type: types.SET_MENU_LIST,
            menuList: res.data ? res.data : []
        };
    });
};
