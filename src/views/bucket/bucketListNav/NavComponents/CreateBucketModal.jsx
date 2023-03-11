import { Modal } from "antd";
import { useState } from "react";
import CreateBucketSteps from "./CreateBucketSteps";

const CreateBucketModal = ({ open, handleCancel }) => {
	const [current, setCurrent] = useState(0);
	return (
		<Modal
			title="Basic Modal"
			open={open}
			onCancel={() => {
				handleCancel();
				setCurrent(0);
			}}
			footer={[]}
		>
			<CreateBucketSteps
				handleCancel={handleCancel}
				current={current}
				setCurrent={setCurrent}
			/>
		</Modal>
	);
};

export  default  CreateBucketModal;