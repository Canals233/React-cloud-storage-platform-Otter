import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { updateCollapse } from "@/redux/modules/menuSlice";
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

	
	return (
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
export default LayoutIndex;
