import { useState, useEffect } from "react";
import { getBrowserLang } from "@/utils/util";
import { ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, setIsElectorn } from "@/redux/modules/globalSlice";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import useTheme from "@/hooks/useTheme";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import i18n from "i18next";
import "moment/dist/locale/zh-cn";
import { getGlobalState } from "./redux/modules/globalSlice";

const App = () => {
	const { language, assemblySize, themeConfig } = useSelector(getGlobalState);
	const dispatch = useDispatch();
	const [i18nLocale, setI18nLocale] = useState(zhCN);
	// 全局使用主题
	useTheme(themeConfig);
	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == "zh") return setI18nLocale(zhCN);
		if (language && language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};
	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		dispatch(setLanguage(language || getBrowserLang()));
		setAntdLanguage();
	}, [language]);
	useEffect(() => {
		document.ondragover =
			document.ondragenter =
			document.ondrop =
				(ev) => ev.preventDefault();
		console.log("禁止所有的打开文件操作");
		//禁止所有的打开文件操作
		let isElectron;
		if (typeof window === "undefined") {
			isElectron = true; // Electron
		} else {
			isElectron = false; // Browser

			if (typeof process === "object" && typeof process.versions === "object" && typeof process.versions.electron !== "undefined") {
				isElectron = true; // Electron
			} else if (navigator.userAgent.indexOf("Electron") >= 0) {
				isElectron = true; // Electron
			}
			dispatch(setIsElectorn(isElectron));
		}
	}, []);
	return (
		<HashRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

export default App;
