import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { setAuthButtons } from "@/redux/modules/authSlice";
import { updateCollapse } from "@/redux/modules/menuSlice";
import { getAuthorButtons } from "@/api/modules/login";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";

import "./index.less";
import { useDispatch } from "react-redux";
import { Content } from "antd/lib/layout/layout";
const LayoutIndex = () => {
	const { Sider } = Layout;
	const dispatch = useDispatch();

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		const { data } = await getAuthorButtons();
        console.log(data,'authButtons')
		setAuthButtons(data);
	};
	// 监听窗口大小变化

	useEffect(() => {
		getAuthButtonsList();
	}, []);
	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<Layout className="container">
			<Sider
				trigger={null}
				// collapsed={props.isCollapse}
				onBreakpoint={(broken) => {
					dispatch(updateCollapse(broken));
				}}
				theme="dark"
				breakpoint="lg"
				collapsedWidth="56"
			>
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Content>
                <Outlet></Outlet>
                </Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</Layout>
	);
};
// const mapStateToProps = (state) => state.menu;
export default LayoutIndex;
