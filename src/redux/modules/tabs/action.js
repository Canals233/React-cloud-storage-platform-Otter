import * as types from "@/redux/mutation-types";
// * setTabsList
export const setTabsList = (tabsList) => ({
    type: types.SET_TABS_LIST,
    tabsList
});
// * setTabsActive
export const setTabsActive = (tabsActive) => ({
    type: types.SET_TABS_ACTIVE,
    tabsActive
});
