import { Button, Card, Dropdown, Popover, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import React from "react";
import { useSelector } from "react-redux";

import "./DetailFileList.less";
import { DownOutlined, FolderOutlined } from "@ant-design/icons";
import { selectAllBucketDetail } from "@/redux/modules/bucketDetailSlice";
import { UploadFileAction, CreateFolderAction } from "./DetailFileNavActions";
import { useLocation } from "react-router-dom";

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

const DetailSearch = () => {
	const [searchValue, setSearchValue] = React.useState("");
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};
	return (
		<Search
			allowClear={true}
			value={searchValue}
			onChange={handleSearchChange}
			enterButton="搜索"
			placeholder="支持模糊搜索"
			className="detail-search"
		></Search>
	);
};

const DetailNav = () => {
   
	return (
		<Space className="action-btns">
			<UploadFileAction />
			<CreateFolderAction />
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
	);
};

const DetailFileList = () => {
	let detailTableData = useSelector(selectAllBucketDetail);
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	return (
		<Card>
			<DetailNav />
			<div className="detail-refresh-search">
				<Button type="primary">刷新</Button>
				<DetailSearch />
			</div>

			<div className="detail-list-content">
				<Table
					dataSource={detailTableData}
					columns={columns}
					rowSelection={{
						type: "checkbox",
						onChange: (selectedRowKeys) => {
							setSelectedRowKeys(selectedRowKeys);
						},
						selectedRowKeys,
					}}
					rowKey="name" //为了方便，使用了文件名作为key
				></Table>
			</div>
		</Card>
	);
};

export default DetailFileList;
