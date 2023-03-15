import { Divider, Radio, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBucketList } from "../../../../../redux/modules/bucketSlice";
import { visiableRenderMap } from "../../../api/bucketApi";
const columns = [
	{
		title: "存储桶名称",
		dataIndex: "name",
		render: (text) => <a>{text}</a>,
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
		height: 450, // 设置 Table 组件的高度为 600px
		//   padding: '24px', // 调整 Table 组件的 padding
		boxSizing: "border-box", // 设置盒模型为 border-box
		border: "1px solid #e8e8e8", // 调整 Table 组件的 border 样式
	},
};

const ChangeAuthContent = ({selectedRowKeys,setSelectedRowKeys,onCancel}) => {
	const tableData = useSelector(selectAllBucketList);
	const [selectedBuckets, setSelectedBuckets] = useState([]); //快速展示选中的桶
	
	// rowSelection object indicates the need for row selection
    
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
			checked: selectedRowKeys.includes(record.key), // 添加 checked 属性，用于控制行的选择状态
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

	return (
		<>
        <Space direction="horizontal" size={32}>
			<div>
				<Table
					rowSelection={{
						...rowSelection,
						selectedRowKeys: selectedRowKeys,
					}}
					columns={columns}
					dataSource={tableData}
					bordered
					pagination={false}
					scroll={{ y: 426 }}
					style={styles.tableWrapper}
				/>
			</div>
			<Table
				columns={resultColumns}
				dataSource={selectedBuckets}
				bordered
				pagination={false}
				scroll={{ y: 426 }}
				style={styles.tableWrapper}
			/>
		</Space>
        </>

	);
};

export default ChangeAuthContent;
