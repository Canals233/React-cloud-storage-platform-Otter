import { useState, useImperativeHandle } from "react";
import { Modal, message } from "antd";
const PasswordModal = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    useImperativeHandle(props.innerRef, () => ({
        showModal
    }));
    const showModal = (params) => {
        console.log(params);
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        message.success("修改密码成功 🎉🎉🎉");
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (<Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>Some Password...</p>
			<p>Some Password...</p>
			<p>Some Password...</p>
		</Modal>);
};
export default PasswordModal;
