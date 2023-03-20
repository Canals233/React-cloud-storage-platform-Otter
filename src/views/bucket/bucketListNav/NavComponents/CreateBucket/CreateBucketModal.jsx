import { Modal } from "antd";
import { useContext } from "react";
import CreateBucketSteps from "./CreateBucketSteps";
import { BucketContext } from "../../provider/BucketProvider";
const CreateBucketModal = () => {
	
	const {modalOpen,restartCreate} = useContext(BucketContext);
	

	return (
		<Modal
			title="创建存储桶"
			open={modalOpen}
			onCancel={restartCreate}
			footer={[]}
		>
			<CreateBucketSteps
				restartCreate={restartCreate}
			
			/>
		</Modal>
	);
};

export default CreateBucketModal;
