import { Button, Form, Space, Table, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBucketList } from "@/redux/modules/bucketSlice";
import { radioTextMap, visiableRenderMap } from "@/views/bucket/api/bucketApi";
import AuthRadio from "@/views/bucket/components/AuthRadio";
import { changeBucketsAuth } from "@/redux/modules/bucketSlice";
import SearchBucket from "../../../components/SearchBucket";
import { showWarning } from "../../../api/bucketApi";
const columns = [
	{
		title: "存储桶名称",
		dataIndex: "name",
		width: 150,
	},
	{
		title: "访问权限",
		dataIndex: "visiable",
		render: visiableRenderMap,
		width: 150,
	},
];

const styles = {
	tableWrapper: {
		width: 400, // 设置 Table 组件的宽度为 800px
		height: 350, // 设置 Table 组件的高度为 600px
		//   padding: '24px', // 调整 Table 组件的 padding
		boxSizing: "border-box", // 设置盒模型为 border-box
		border: "1px solid #e8e8e8", // 调整 Table 组件的 border 样式
	},
};

const ChangeAuthContent = ({
	selectedRowKeys,
	setSelectedRowKeys,
	selectedBuckets,
	setSelectedBuckets,
	radioValue,
	setRadioValue,
	onCancel,
}) => {
	const dispath = useDispatch();
	const [tableData, setTableData] = useState([]);
	let newBucketData = useSelector(selectAllBucketList);
	useEffect(() => {
		setTableData(
			[...newBucketData].sort((a, b) => a.name.localeCompare(b.name))
		);
	}, [newBucketData]);

	const [radioText, setRadioText] = useState(
		"只有创建者和授权用户才能对进行读写操作。"
	);
	// rowSelection object indicates the need for row selection

	const resultColumns = [
		...columns,
		{
			title: "",
			dataIndex: "",
			key: "del",
			render: (_, record) => (
				<a onClick={() => handleDelete(record.key)}>删除</a>
			),
		},
	];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				"selectedRows: ",
				selectedRows
			);
			setSelectedBuckets(selectedRows);
			setSelectedRowKeys(selectedRowKeys);
		},
		getCheckboxProps: (record) => ({
			// Column configuration not to be checked
			name: record.name,
			selectedRowKeys: selectedRowKeys.includes(record.key), // 添加 checked 属性，用于控制行的选择状态
		}),
	};

	const handleDelete = (key) => {
		const newSelectedData = selectedBuckets.filter(
			(item) => item.key !== key
		);
		setSelectedBuckets(newSelectedData);
		// 取消选择时，更新第一个表格中相应行的选择状态为未选中
		const newSelectedRowKeys = selectedRowKeys.filter(
			(item) => item !== key
		);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const handleComfirm = () => {
		dispath(changeBucketsAuth([selectedRowKeys, radioValue]));
		message.info(`更改了${selectedRowKeys.length}个存储桶的访问权限`);
		onCancel();
	};

	const handleRadioChange = (event) => {
		const value = event.target.value;

		if (value === "644" || value === "666") {
			showWarning(
				"提示",
				"注意：公有读权限可以通过匿名身份直接读取您存储桶中的数据，存在一定的安全风险，为确保您的数据安全，不推荐此配置，建议您选择私有。"
			);
		}
		setRadioValue(value);
		setRadioText(radioTextMap(value));
		// console.log(value, newText);
	};

	return (
		<Space size={24} direction="vertical">
			<Space direction="horizontal" size={32}>
				<div>
					<p
						style={{
							fontWeight: 600,
						}}
					>
						选择存储桶 (共{tableData.length}个)
					</p>
					<SearchBucket
						showSearchMode={false}
						searchBarStyle={{
							width: 400,
							marginBottom: 10,
						}}
						setResult={setTableData}
					/>

					<Table
						size="small"
						rowSelection={{
							...rowSelection,
							selectedRowKeys: selectedRowKeys,
						}}
						columns={columns}
						dataSource={tableData}
						bordered
						pagination={false}
						scroll={{ y: 310 - 42 }}
						style={{
							...styles.tableWrapper,
							height: 350 - 42,
						}}
					/>
				</div>
				<div>
					<p
						style={{
							fontWeight: 600,
						}}
					>
						已选择({selectedBuckets.length}个)
					</p>
					<Table
						size="small"
						columns={resultColumns}
						dataSource={selectedBuckets}
						bordered
						pagination={false}
						scroll={{ y: 310 }}
						style={styles.tableWrapper}
					/>
				</div>
			</Space>
			<Form>
				<Form.Item
					label="访问权限"
					style={{
						fontWeight: 600,
					}}
				>
					<AuthRadio
						authValue={radioValue}
						radioText={radioText}
						handleRadioChange={handleRadioChange}
					/>
				</Form.Item>
			</Form>

			<div
				style={{
					textAlign: "center",
				}}
			>
				<Space size={8}>
					<Button
						type="primary"
						onClick={handleComfirm}
						disabled={selectedBuckets.length === 0}
					>
						确定
					</Button>
					<Button onClick={onCancel}>取消</Button>
				</Space>
			</div>
		</Space>
	);
};

export default ChangeAuthContent;
