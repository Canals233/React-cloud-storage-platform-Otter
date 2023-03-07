import * as types from "@/redux/mutation-types";
// * setAuthButtons
export const setAuthButtons = (authButtons) => ({
    type: types.SET_AUTH_BUTTONS,
    authButtons
});
// * setAuthRouter
export const setAuthRouter = (authRouter) => ({
    type: types.SET_AUTH_ROUTER,
    authRouter
});
