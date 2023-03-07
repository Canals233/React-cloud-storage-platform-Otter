import { useState, useImperativeHandle } from "react";
import { Modal, message } from "antd";
const InfoModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    useImperativeHandle(props.innerRef, () => ({
        showModal
    }));
    const showModal = (params) => {
        console.log(params);
        setModalVisible(true);
    };
    const handleOk = () => {
        setModalVisible(false);
        message.success("修改用户信息成功 🎉🎉🎉");
    };
    const handleCancel = () => {
        setModalVisible(false);
    };
    return (<Modal title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>User Info...</p>
			<p>User Info...</p>
			<p>User Info...</p>
		</Modal>);
};
export default InfoModal;
