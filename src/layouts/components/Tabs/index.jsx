import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import { setTabsList } from "@/redux/modules/tabsSlice";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import MoreButton from "./components/MoreButton";
import "./index.less";
const LayoutTabs = () => {
	const dispatch = useDispatch();
	const tabsList = useSelector((state) => state.tabs.tabsList);
	const themeConfig = useSelector((state) => state.global.themeConfig);

	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState(pathname);
	useEffect(() => {
		addTabs();
	}, [pathname]);
	// click tabs
	const clickTabs = (path) => {
		navigate(path);
	};
	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);

		let newTabsList = JSON.parse(JSON.stringify(tabsList));

		if (tabsList.every((item) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta?.title, path: route.path });
		}
		dispatch(setTabsList(newTabsList));
		setActiveValue(pathname);
	};
	// delete tabs
	const delTabs = (tabPath) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item, index) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签");
		dispatch(setTabsList(tabsList.filter((item) => item.path !== tabPath)));
	};
	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={(path) => {
							delTabs(path);
						}}
						items={tabsList.map((item) => {
							return (
								<span
									key={item.path}
									tab={
										<span>
											{item.path == HOME_URL ? (
												<HomeFilled />
											) : (
												""
											)}
											{item.title}
										</span>
									}
									closable={item.path !== HOME_URL}
								></span>
							);
						})}
					></Tabs>
					<MoreButton
						tabsList={tabsList}
						delTabs={delTabs}
						setTabsList={setTabsList}
					></MoreButton>
				</div>
			)}
		</>
	);
};

export default LayoutTabs;
