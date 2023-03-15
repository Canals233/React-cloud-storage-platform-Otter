import { Modal } from "antd";
import { useState, useContext } from "react";
import CreateBucketSteps from "./CreateBucketSteps";
import { CreateBucketContext } from "../../provider/CreateBucketProvider";
const CreateBucketModal = ({ open, handleModalClose }) => {
	//open控制modal是否打开，handleModalClose控制modal右上方的关闭键并被modal内部Steps的取消键使用
	const [current, setCurrent] = useState(0);
	//这里current只能写在这里，因为模态框的关闭也是可以重置进度
	const [newBucket, setNewBucket, cleanCreate] = useContext(CreateBucketContext);
	const restartCreate = () => {
		handleModalClose();
		setCurrent(0);
		cleanCreate();
	};

	return (
		<Modal
			title="创建存储桶"
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
