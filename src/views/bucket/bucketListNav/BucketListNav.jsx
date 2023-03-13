import { Button, Col, Row, Select, Space } from "antd";
import { PureComponent, useState } from "react";
import CreateBucketModal from "./NavComponents/CreateBucket/CreateBucketModal";
import {CreateBucketProvider} from "./provider/CreateBucketProvider";

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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
	};
	return (
		<CreateBucketProvider>
			<CreateBucketModal open={isModalOpen} handleModalClose={handleModalClose} />
			<Space size={8}>
				<Button type="primary" onClick={showModal}>
					创建存储桶
				</Button>
			</Space>
		</CreateBucketProvider>
	);
}

//这个是列表之前的按钮们
const BucketlistNav = ({ value, handleChange, handleSearch }) => {
	//这三个参数现在只是防止报错加上去的，暂时没有任何作用
	return (
		<>
			<Row justify={"space-between"}>
				<Col>
					<CreateWithProvider />
					<Button type="default">存储权限管理</Button>
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
