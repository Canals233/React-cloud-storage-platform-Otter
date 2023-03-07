import produce from "immer";
import * as types from "@/redux/mutation-types";
const breadcrumbState = {
    breadcrumbList: {}
};
// breadcrumb reducer
const breadcrumb = (state = breadcrumbState, action) => produce(state, draftState => {
    switch (action.type) {
        case types.SET_BREADCRUMB_LIST:
            draftState.breadcrumbList = action.breadcrumbList;
            break;
        default:
            return draftState;
    }
});
export default breadcrumb;
