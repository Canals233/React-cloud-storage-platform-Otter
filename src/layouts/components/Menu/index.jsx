import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { getOpenKeys, handleRouter, searchRoute } from "@/utils/util";

import { setCurrentBreadcrumb } from "@/redux/modules/breadcrumbSlice";
import { setAuthRouter } from "@/redux/modules/authSlice";

import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@ant-design/icons";
import Logo from "./components/Logo";
import "./index.less";
import { getIsCollapse } from "@/redux/modules/menuSlice";

const getItem = (label, key, icon, children, type) => {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
};

// 动态渲染 Icon 图标
const customIcons = Icons;
const addIcon = (name) => {
	return React.createElement(customIcons[name]);
};
// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
const deepLoopFloat = (menuList, newArr = []) => {
	menuList.forEach((item) => {
		// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
		if (!item?.children?.length)
			return newArr.push(
				getItem(item.title, item.path, addIcon(item.icon))
			);
		newArr.push(
			getItem(
				item.title,
				item.path,
				addIcon(item.icon),
				deepLoopFloat(item.children)
			)
		);
	});
	return newArr;
};
// 获取菜单列表并处理成 antd menu 需要的格式，本地直接用，没延时

const rawMenuList = [
	{
		icon: "HomeOutlined",
		title: "概览",
		path: "/home",
	},
	{
		icon: "DatabaseOutlined",
		title: "存储桶列表",
		path: "/bucket",
	},
	{
		icon: "FundOutlined",
		title: "可视化统计",
		path: "/dashboard",
	},
];

const LayoutMenu = (props) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState([pathname]);
	const [openKeys, setOpenKeys] = useState([]);

	const isCollapse = useSelector(getIsCollapse);

	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys) => {
		if (openKeys.length === 0 || openKeys.length === 1)
			return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	dispatch(setAuthRouter(handleRouter(rawMenuList)));
	const menuList = deepLoopFloat(rawMenuList);
	console.log(menuList);

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu = ({ key }) => {
		const route = searchRoute(key, props.menuList);

		dispatch(
			setCurrentBreadcrumb({
				path: [route.path],
				title: [route.title],
			})
		);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};
	return (
		<div className="menu">
			<Logo></Logo>
			<Menu
				theme="dark"
				mode="inline"
				triggerSubMenuAction="click"
				openKeys={openKeys}
				selectedKeys={selectedKeys}
				items={menuList}
				onClick={clickMenu}
				onOpenChange={onOpenChange}
			></Menu>
		</div>
	);
};

export default LayoutMenu;
