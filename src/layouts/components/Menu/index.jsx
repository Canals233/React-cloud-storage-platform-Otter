import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import {
	findAllBreadcrumb,
	getOpenKeys,
	handleRouter,
	searchRoute,
} from "@/utils/util";
import { setMenuList } from "@/redux/modules/menuSlice";
import { setBreadcrumbList } from "@/redux/modules/breadcrumbSlice";
import { setAuthRouter } from "@/redux/modules/authSlice";

import { connect } from "react-redux";
import * as Icons from "@ant-design/icons";
import Logo from "./components/Logo";
import "./index.less";
import menuData from "@/mock/menu.json";
const LayoutMenu = (props) => {
	const { pathname } = useLocation();
	const {
		isCollapse,
		setBreadcrumbList,
		setAuthRouter,
		setMenuList: setMenuListAction,
	} = props;
	const [selectedKeys, setSelectedKeys] = useState([pathname]);
	const [openKeys, setOpenKeys] = useState([]);
	// 刷新页面菜单保持高亮
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
	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			//使用了静态数据其实没有try的必要，
			// console.log(menuData,'menumenuDataRaw')
			if (!menuData) return;
			setMenuList(deepLoopFloat(menuData));
			// 存储处理过后的所有面包屑导航栏到 redux 中
			setBreadcrumbList(findAllBreadcrumb(menuData));
			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			const dynamicRouter = handleRouter(menuData);
			setAuthRouter(dynamicRouter);
			setMenuListAction(menuData);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenuData();
	}, []);
	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu = ({ key }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};
	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
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
			</Spin>
		</div>
	);
};
const mapStateToProps = (state) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
