import { Dropdown, Menu } from "antd";
import { setAssemblySize } from "@/redux/modules/globalSlice";
import { connect } from "react-redux";
const AssemblySize = (props) => {
	const { assemblySize, setAssemblySize } = props;
	// 切换组件大小
	const onClick = (e) => {
		setAssemblySize(e.key);
	};
	const items = [
		{
			key: "middle",
			disabled: assemblySize == "middle",
			label: <span>默认</span>,
			onClick,
		},
		{
			disabled: assemblySize == "large",
			key: "large",
			label: <span>大型</span>,
			onClick,
		},
		{
			disabled: assemblySize == "small",
			key: "small",
			label: <span>小型</span>,
			onClick,
		},
	];
	return (
		<Dropdown
			menu={{ items }}
			placement="bottom"
			trigger={["click"]}
			arrow={true}
		>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};
const mapStateToProps = (state) => state.global;
const mapDispatchToProps = { setAssemblySize };
export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);
