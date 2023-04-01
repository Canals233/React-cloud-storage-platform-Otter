import { useState, useImperativeHandle } from "react";
import { Modal, message } from "antd";
const InfoModal = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    useImperativeHandle(props.innerRef, () => ({
        showModal
    }));
    const showModal = (params) => {
        console.log(params);
        setModalOpen(true);
    };
    const handleOk = () => {
        setModalOpen(false);
        message.success("修改用户信息成功 🎉🎉🎉");
    };
    const handleCancel = () => {
        setModalOpen(false);
    };
    return (<Modal title="个人信息" open={modalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>User Info...</p>
			<p>User Info...</p>
			<p>User Info...</p>
		</Modal>);
};
export default InfoModal;
