import { Button, Col, Row, Space } from "antd";
import {  useState } from "react";
import ChangeAuthModal from "./NavComponents/ChangeAuth/ChangeAuthModal";

import SearchBucket from "../components/SearchBucket";
import {
	
	BucketCreateProvider,
} from "./provider/BucketCreateProvider";
import CreateBucketContent from "./NavComponents/CreateBucket/CreateBucketContent";

//用了provider，需要尽量保证数据不变

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
						<BucketCreateProvider>
							<CreateBucketContent />
						</BucketCreateProvider>
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
