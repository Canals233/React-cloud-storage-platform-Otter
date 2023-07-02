import {
	Button,
	Card,
	Drawer,
	Dropdown,
	List,
	Popover,
	Space,
	Table,
} from "antd";
import Search from "antd/lib/input/Search";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./DetailFileList.less";
import {
	DownOutlined,
	FolderOutlined,
	FolderFilled,
	CheckCircleTwoTone,
} from "@ant-design/icons";
import { bucketDetailSelector } from "@/redux/modules/bucketDetailSlice";
import UploadFileAction from "./DetailFileNavActions/UploadFiles";
import COS from "cos-js-sdk-v5";
import {
	StandardDirectory,
	downloadFile,
} from "./DetailFileUtils/DetailFileUtils";

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
			if (record.type === "directory") {
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
				<a
					onClick={() => {
						downloadFile(record.name);
					}}
				>
					下载
				</a>
				<a>删除</a>
			</Space>
		),
	},
];

const actionDropdownItems = [
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

const DetailSearch = ({ searchValue, setSearchValue }) => {
	const handleSearchChange = (e) => {
		console.log(e.target.value, "search value");
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

const DetailNavAndDrawer = ({ controlDrawer, setDetailTableData }) => {
	const [currentFileDirectory, setCurrentFileDirectory] = useState(
		new StandardDirectory()
	); //当前文件目录
	useEffect(() => {
		if (currentFileDirectory.isEmpty()) {
			return;
		}
		const cos = new COS({
         
        });
		currentFileDirectory.recursiveUploadFiles(cos, setDetailTableData);
	}, [currentFileDirectory]);

	return (
		<>
			<Space className="action-btns">
				<UploadFileAction
					setCurrentFileDirectory={setCurrentFileDirectory}
				/>
				<Button>清空存储桶</Button>
				<Dropdown
					menu={{
						items: actionDropdownItems,
					}}
				>
					<Button>
						更多操作
						<DownOutlined />
					</Button>
				</Dropdown>
				<Button onClick={controlDrawer} type="primary">
					任务概览
				</Button>
			</Space>
		</>
	);
};

const DetailFileList = () => {
	// let detailTableData = useSelector(bucketDetailSelector);
	const [detailTableData, setDetailTableData] = useState([]); //当前文件目录
	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchValue) {
				detailTableData.filter((item) => {
					return item.name.includes(searchValue);
				});
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [searchValue]);

	const controlDrawer = () => {
		setOpen(!open);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Drawer
				title="任务管理"
				placement="right"
				onClose={onClose}
				open={open}
				mask={false}
			>
				<p
					style={{
						fontWeight: "bold",
					}}
				>
					刷新或关闭系统将取消所有任务，并清除任务记录。
				</p>
				<List
					itemLayout="horizontal"
					dataSource={detailTableData}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<CheckCircleTwoTone twoToneColor="#52c41a" />
								}
								title={
									<Space>
										{item.type === "directory" && (
											<FolderFilled
												style={{
													color: "lightblue",
												}}
											/>
										)}
										{item.name}
									</Space>
								}
								description="任务已完成"
							/>
						</List.Item>
					)}
				/>
			</Drawer>
			<Card
				style={{
					maxWidth: 1368,
					minWidth: 1024,
					margin: "0 auto",
					padding: "0 24px",
					boxShadow: "0px 2px 3px -0.5px #ccc",
				}}
			>
				<DetailNavAndDrawer
					controlDrawer={controlDrawer}
					setDetailTableData={setDetailTableData}
				/>
				<div className="detail-refresh-search">
					<Button type="primary">刷新</Button>
					<DetailSearch
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
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
		</>
	);
};

export default DetailFileList;
