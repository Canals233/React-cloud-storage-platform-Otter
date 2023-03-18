import { Modal } from "antd";

const showWarningModal = (title, content) => {
	Modal.warning({
		title: title,
		content: <div>{content}</div>,
		onOk() {},
		zIndex: 2000,
		width: 600,
		centered: true,
	});
};

export default  showWarningModal