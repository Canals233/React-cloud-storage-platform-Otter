import { useState, useImperativeHandle } from "react";
import { Modal, message } from "antd";
const PasswordModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useImperativeHandle(props.innerRef, () => ({
        showModal
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
    return (<Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>Some Password...</p>
			<p>Some Password...</p>
			<p>Some Password...</p>
		</Modal>);
};
export default PasswordModal;
