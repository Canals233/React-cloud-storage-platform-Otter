import { Button, Space } from "antd";
import { useContext } from "react";
import { BucketContext } from "../../provider/BucketProvider";
import CreateBucketModal from "./CreateBucketModal";

const CreateBucketContent = () => {
    //这是创建桶的父组件
	const { modalOpen, setModalOpen } = useContext(BucketContext);
	const showCreate = () => {
		setModalOpen(true);
	};
	return (
		<>
			<CreateBucketModal open={modalOpen} />
			<Space size={8}>
				<Button type="primary" onClick={showCreate}>
					创建存储桶
				</Button>
			</Space>
		</>
	);
};

export default CreateBucketContent;
