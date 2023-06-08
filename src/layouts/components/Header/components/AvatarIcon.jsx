import { useRef } from "react";
import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/globalSlice";
import PasswordModal from "./PasswordModal";
import InfoModal from "./InfoModal";
import avatar from "@/assets/images/avatar.png";
const AvatarIcon = (props) => {
	const { setToken } = props;
	const navigate = useNavigate();
	const passRef = useRef(null);
	const infoRef = useRef(null);
	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				setToken("");
				message.success("退出登录成功！");
				navigate("/login");
			},
		});
	};
	// Dropdown Menu
	const items = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL),
		},
		{
			key: "2",
			label: <span className="dropdown-item">修改密码</span>,
			onClick: () => passRef.current.showModal({ name: 11 }),
		},

		{
			key: "3",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout,
		},
	];
	return (
		<>
			<Dropdown
				overlayStyle={{
					zIndex: 9999,
				}}
				menu={{ items }}
				placement="bottom"
				arrow
				trigger={["click"]}
			>
				<Avatar size="large" src={avatar} />
			</Dropdown>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};
const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(AvatarIcon);
