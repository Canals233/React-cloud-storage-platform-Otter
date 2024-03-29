import { Drawer, Divider, Switch } from "antd";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import { setThemeConfig } from "@/redux/modules/globalSlice";
import { updateCollapse, getIsCollapse } from "@/redux/modules/menuSlice";
import SwitchDark from "@/components/SwitchDark";
const Theme = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const isCollapse = useSelector((state) => getIsCollapse);
	const { themeConfig } = useSelector((state) => state.global);
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;
	const setWeakOrGray = (checked, theme) => {
		dispatch(
			setThemeConfig({ ...themeConfig, weakOrGray: checked ? theme : "" })
		);
	};
	const onChange = (checked, keyName) => {
		dispatch(setThemeConfig({ ...themeConfig, [keyName]: !checked }));
	};
	return (
		<>
			<i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					setOpen(true);
				}}
			></i>
			<Drawer
				title="布局设置"
				closable={false}
				onClose={() => {
					setOpen(false);
				}}
				open={open}
				width={320}
			>
				{/* 全局主题 */}
				<Divider className="divider">
					<FireOutlined />
					全局主题
				</Divider>
				<div className="theme-item">
					<span>夜晚模式</span>
					<SwitchDark />
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						checked={weakOrGray === "gray"}
						onChange={(e) => {
							setWeakOrGray(e, "gray");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						checked={weakOrGray === "weak"}
						onChange={(e) => {
							setWeakOrGray(e, "weak");
						}}
					/>
				</div>
				<br />
				{/* 界面设置 */}
				<Divider className="divider">
					<SettingOutlined />
					界面设置
				</Divider>
				{/* <div className="theme-item">
					<span>折叠菜单</span>
					<Switch
						checked={isCollapse}
						onChange={(e) => {
							updateCollapse(e);
						}}
					/>
				</div> */}
				<div className="theme-item">
					<span>面包屑导航</span>
					<Switch
						checked={!breadcrumb}
						onChange={(e) => {
							onChange(e, "breadcrumb");
						}}
					/>
				</div>
				{/* <div className="theme-item">
					<span>标签栏</span>
					<Switch
						checked={!tabs}
						onChange={(e) => {
							onChange(e, "tabs");
						}}
					/>
				</div> */}
				<div className="theme-item">
					<span>页脚</span>
					<Switch
						checked={!footer}
						onChange={(e) => {
							onChange(e, "footer");
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};

export default Theme;
