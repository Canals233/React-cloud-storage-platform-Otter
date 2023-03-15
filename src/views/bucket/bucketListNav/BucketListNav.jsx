import { Button, Col, Row, Select, Space } from "antd";
import { PureComponent, useState } from "react";
import ChangeAuthModal from "./NavComponents/ChangeAuth/ChangeAuthModal";
import CreateBucketModal from "./NavComponents/CreateBucket/CreateBucketModal";
import { CreateBucketProvider } from "./provider/CreateBucketProvider";

const selectOptions = [
	{
		value: "name",
		label: "按名称搜索",
	},
	{
		value: "tag",
		label: "按标签搜索",
	},
];

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
const BucketlistNav = ({ value, handleChange, handleSearch }) => {
	//这三个参数现在只是防止报错加上去的，暂时没有任何作用
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
						<Select
							defaultValue="name"
							style={{
								width: 120,
							}}
							// onChange={handleChange}
							options={selectOptions}
						/>
						<Select
							showSearch
							value={value}
							placeholder={"请输入搜索内容"}
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							onSearch={handleSearch}
							onChange={handleChange}
							notFoundContent={null}
							style={{
								width: "15rem",
							}}
						/>
					</Space>
				</Col>
			</Row>
		</>
	);
};

export default BucketlistNav;
