import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxPromise from "redux-promise";
import globalReducer from "./modules/globalSlice";
import menuReducer from "./modules/menuSlice";
import tabsReducer from "./modules/tabsSlice";
import authReducer from "./modules/authSlice";
import breadcrumbReducer from "./modules/breadcrumbSlice";
import bucketReducer from "./modules/bucketSlice";
import bucketDetailReducer from "./modules/bucketDetailSlice";
import { apiSlice } from "./modules/apiSlice";
// 创建reducer(合并reducer)
const rootReducer = combineReducers({
	global: globalReducer,
	menu: menuReducer,
	tabs: tabsReducer,
	auth: authReducer,
	breadcrumb: breadcrumbReducer,
	bucket: bucketReducer,
	bucketDetail: bucketDetailReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage, //配置模式为storage模式
	// debug:true
	blacklist: ["bucket"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware).concat([reduxPromise]),
	devTools: true,
});

// 创建持久化 store
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
