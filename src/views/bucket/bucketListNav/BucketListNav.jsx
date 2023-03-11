import { Button, Col, Row, Select, Space } from "antd";
import { useState } from "react";
import CreateBucketModal from "./NavComponents/CreateBucketModal";

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

const BucketlistNav = ({ value, handleChange, handleSearch }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<CreateBucketModal open={isModalOpen} handleCancel={handleCancel} />
			<Row justify={"space-between"}>
				<Col>
					<Space size={8}>
						<Button type="primary" onClick={showModal}>
							创建存储桶
						</Button>
						<Button type="default">存储权限管理</Button>
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
