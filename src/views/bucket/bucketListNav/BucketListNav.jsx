import { Button, Col, Row, Space } from "antd";
import { useState } from "react";
import ChangeAuthModal from "./NavComponents/ChangeAuth/ChangeAuthModal";
import CreateBucketModal from "./NavComponents/CreateBucket/CreateBucketModal";
import SearchBucket from "../components/SearchBucket";
import { CreateBucketProvider } from "./provider/CreateBucketProvider";

//用了provider，需要尽量保证数据不变
const CreateWithProvider = () => {
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const showCreate = () => {
		setIsCreateOpen(true);
	};
	const handleCreateClose = () => {
		setIsCreateOpen(false);
	};
	return (
		<CreateBucketProvider>
			<CreateBucketModal
				open={isCreateOpen}
				handleModalClose={handleCreateClose}
			/>
			<Space size={8}>
				<Button type="primary" onClick={showCreate}>
					创建存储桶
				</Button>
			</Space>
		</CreateBucketProvider>
	);
};

const ChangeAuthbutton = () => {
	const [isChangeAuthOpen, setIsChangeAuthOpen] = useState(false);
	const showChangeAuth = () => {
		setIsChangeAuthOpen(true);
	};
	const handleChangeAuthClose = () => {
		setIsChangeAuthOpen(false);
	};
	return (
		<>
			<ChangeAuthModal
				open={isChangeAuthOpen}
				handleModalClose={handleChangeAuthClose}
			/>
			<Button type="default" onClick={showChangeAuth}>
				访问权限管理
			</Button>
		</>
	);
};

//这个是列表之前的按钮们
const BucketlistNav = ({ setResult }) => {
	return (
		<>
			<Row justify={"space-between"}>
				<Col>
					<Space size={8}>
						<CreateWithProvider />
						<ChangeAuthbutton />
					</Space>
				</Col>
				<Col>
					<Space size={8}>
						<SearchBucket setResult={setResult} />
					</Space>
				</Col>
			</Row>
		</>
	);
};

export default BucketlistNav;
