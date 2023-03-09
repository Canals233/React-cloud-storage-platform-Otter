import { PageHeader, Tabs } from "antd";
// import Bucketlist from "./bucketChildren/bucketlist";
import { Button, Card, Col, Row, Space, Select, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
import { useState } from "react";
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

const TableData = [
	{
		key: "1",
		firstName: "John",
		lastName: "Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		firstName: "Jim",
		lastName: "Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		firstName: "Joe",
		lastName: "Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

const BucketlistCard = () => {
	return (
		<>
			<Card>
				<Table dataSource={TableData}>
					<Column title="Name" dataIndex="firstName"
							key="firstName">
						
					</Column>
					<Column title="Age" dataIndex="age" key="age" />
					<Column title="Address" dataIndex="address" key="address" />
					<Column
						title="Tags"
						dataIndex="tags"
						key="tags"
						render={(tags) => (
							<>
								{tags.map((tag) => (
									<Tag color="blue" key={tag}>
										{tag}
									</Tag>
								))}
							</>
						)}
					/>
					<Column
						title="Action"
						key="action"
						render={(_, record) => (
							<Space size="middle">
								<a>Invite {record.lastName}</a>
								<a>Delete</a>
							</Space>
						)}
					/>
				</Table>
			</Card>
		</>
	);
};
const BucketlistNav = ({ value, handleChange, handleSearch }) => {
	return (
		<>
			<Row justify={"space-between"}>
				<Col>
					<Space size={8}>
						<Button type="primary">创建存储桶</Button>
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
const BucketlistIn = () => {
	const [data, setData] = useState([]);
	const [value, setValue] = useState();
	const handleSearch = (newValue) => {
		if (newValue) {
			setData(["i am test data", "yeaaa"]);
			// fetch(newValue, setData);
		} else {
			setData([]);
		}
	};
	const handleChange = (newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<BucketlistNav
				value={value}
				handleChange={handleChange}
				handleSearch={handleSearch}
			/>
			<p style={{ height: ".25rem" }} />
			<BucketlistCard />
		</>
	);
};
//上面的代码记得放在BucketList里面，现在是因为Tabs的渲染问题在另一个文件写热更新不了才这样写

const Bucket = () => {
	const items = [
		{ label: "存储列表", key: "item-1", children: <BucketlistIn /> }, // 务必填写 key
		{ label: "数据统计", key: "item-2", children: "内容 2" },
	];

	return (
		<div>
			<PageHeader title={"存储桶列表"} ghost={false} />
			<Tabs items={items} />
		</div>
	);
};

export default Bucket;
