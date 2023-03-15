import { Modal } from "antd";
import { useState, useContext } from "react";
import ChangeAuthContent from "./ChangeAuthCotent";
const ChangeAuthModal = ({ open, handleModalClose }) => {
	//open控制modal是否打开，handleModalClose控制modal右上方的关闭键和modal内部的取消键

	return (
		<Modal
			title="访问权限管理"
			open={open}
			onCancel={handleModalClose}
		>
            <ChangeAuthContent />
        </Modal>
	);
};

export default ChangeAuthModal;
