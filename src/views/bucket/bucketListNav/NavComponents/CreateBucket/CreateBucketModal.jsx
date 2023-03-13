import { Modal } from "antd";
import { useState, useContext } from "react";
import CreateBucketSteps from "./CreateBucketSteps";
import { CreateBucketContext } from "../../provider/CreateBucketProvider";
const CreateBucketModal = ({ open, handleCancel }) => {
	//open控制modal是否打开，handleCancel控制modal右上方的关闭键和modal内部的取消键
	const [current, setCurrent] = useState(0);
	//这里current只能写在这里，因为模态框的关闭也是可以重置进度
	const [bucket, setBucket, cleanCreate] = useContext(CreateBucketContext);
	const restartCreate = () => {
		handleCancel();
		setCurrent(0);
		cleanCreate();
	};

	return (
		<Modal
			title="Basic Modal"
			open={open}
			onCancel={restartCreate}
			footer={[]}
		>
			<CreateBucketSteps
				restartCreate={restartCreate}
				current={current}
				setCurrent={setCurrent}
			/>
		</Modal>
	);
};

export default CreateBucketModal;
