import { Button, Card, Dropdown, Popover, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import React from "react";
import { useSelector } from "react-redux";

import "./DetailFileList.less";
import { DownOutlined, FolderOutlined } from "@ant-design/icons";
import { selectAllBucketDetail } from "@/redux/modules/bucketDetailSlice";

const columns = [
	{
		title: "文件名",
		dataIndex: "name",
		key: "name",
		sorter: (a, b) => {
			if (a.name === b.name) return 0;
			return a.name > b.name ? 1 : -1;
		},
		render: (text, record) => {
			if (record.type === "folder") {
				return (
					<a>
						<FolderOutlined />
						{text}/
					</a>
				);
			} else {
				return `${text}`;
			}
		},
	},
	{
		title: "大小",
		dataIndex: "size",
		key: "size",
		sorter: (a, b) => {
			if (a.size === b.size) return 0;
			return a.size > b.size ? 1 : -1;
		},
	},
	{
		title: "修改时间",
		dataIndex: "time",
		key: "time",
		sorter: (a, b) => {
			if (a.time === b.time) return 0;
			return a.time > b.time ? 1 : -1;
		},
	},
	{
		title: "操作",
		key: "action",
		render: (text, record) => (
			<Space size="small">
				<a>重命名</a>
				<a>下载</a>
				<a>删除</a>
			</Space>
		),
	},
];

const items = [
	{
		key: "1",
		label: (
			<a target="_blank" rel="noopener noreferrer">
				全部下载
			</a>
		),
	},
	{
		key: "2",
		label: (
			<a target="_blank" rel="noopener noreferrer">
				全部删除
			</a>
		),
	},
];

const DetailFileList = () => {
	const [searchValue, setSearchValue] = React.useState("");
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};
	let detailTableData = useSelector(selectAllBucketDetail);
	
	return (
		<Card>
			<Space className="action-btns">
				<Button type="primary"> 上传文件</Button>
				<Popover content={"文件夹功能正在开发中，敬请期待"}>
					<Button disabled> 新建文件夹</Button>
				</Popover>
				<Button>清空存储桶</Button>
				<Dropdown
					menu={{
						items,
					}}
				>
					<Button>
						更多操作
						<DownOutlined />
					</Button>
				</Dropdown>
				<Button type="primary">任务概览</Button>
			</Space>

			<div className="detail-refresh-search">
				<Button type="primary">刷新</Button>
				<Search
					allowClear={true}
					value={searchValue}
					onChange={handleSearchChange}
					enterButton="搜索"
					placeholder="支持模糊搜索"
					className="detail-search"
				></Search>
			</div>

			<div className="detail-list-content">
				<Table
					dataSource={detailTableData}
					columns={columns}
					rowSelection={{
						type: "checkbox",
						onChange: (selectedRowKeys, selectedRows) => {
							console.log(
								`selectedRowKeys: ${selectedRowKeys}`,
								"selectedRows: ",
								selectedRows
							);
						},
					}}
                    rowKey='name'
				></Table>
			</div>
		</Card>
	);
};

export default DetailFileList;
