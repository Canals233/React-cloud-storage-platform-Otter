import { useState, useImperativeHandle } from "react";
import { Modal, message } from "antd";
import { useSelector } from "react-redux";
import { getEmail } from "@/redux/modules/globalSlice";
import { PopHover } from "@/components/PopInfo/PopInfo";
const PasswordModal = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const email = useSelector(getEmail);

	const popContent = <div>暂不支持修改绑定邮箱</div>;

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));
	const showModal = (params) => {
		console.log(params);
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		message.success("修改密码成功 🎉🎉🎉");
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div style={{
            zIndex: 9999,
        }}>
			<Modal
				title="修改密码"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				destroyOnClose={true}
			>
				<p>
					账号绑定邮箱
					<PopHover content={popContent} />:{email}
				</p>
				<p>Some Password...</p>
				<p>Some Password...</p>
			</Modal>
		</div>
	);
};
export default PasswordModal;
