import { Button, Modal, Popover, Space, Table, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavActions.less";
import { useDropzone } from "react-dropzone";
import { formatFileSize, formatTimestamp } from "@/utils/util.js";

import { customAlphabet } from "nanoid";
const nanoid=customAlphabet('123456789',10)

const getprops = (fileList, setFileList, args) => {
	return {
		name: "file",
		multiple: true,
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer);
		},
		showUploadList: false,
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
		...args,
	};
};

// 只在这个组件里会用到。所以放在这里
const filesToObjectArray = (files) => {
	return files.map((file) => {
		return {
			id: nanoid(),
			name: file.name,
			size: formatFileSize(file.size),
			time: formatTimestamp(file.lastModified),
		};
	});
};

const FilesTableContent = ({ fileList, setFileList }) => {
	const handleDeleteFile = (fileName) => {
		const newFileList = fileList.filter((file) => file.name !== fileName);
		setFileList(newFileList);
		console.log(newFileList);
	};
	const columns = [
		{
			title: "文件/文件夹",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "大小",
			dataIndex: "size",
			key: "size",
		},
		{
			title: "操作",
			key: "action",
			render: (text, record) => (
				<a
					onClick={() => {
						handleDeleteFile(record.name);
					}}
				>
					删除
				</a>
			),
		},
	];

	const data = filesToObjectArray(fileList);

	return (
		<Table
			className="upload-file-table"
			scroll={{
				y: 200,
			}}
			dataSource={data}
			columns={columns}
		></Table>
	);
};

const EmptyContent = () => {
	return (
		<>
			<p className="upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="upload-text">未选择文件/文件夹</p>
			<p className="upload-hint">支持拖拽上传，支持选择多个文件/文件夹</p>
		</>
	);
};

const MyDragger = ({ fileList, setFileList }) => {
	const onDrop = (acceptedFiles) => {
		setFileList([...fileList, ...acceptedFiles]);
		//下面是对file的细致操作,暂时还不用做
		// acceptedFiles.forEach((file) => {

		// 	const reader = new FileReader();

		// 	reader.onabort = () => console.log("file reading was aborted");
		// 	reader.onerror = () => console.log("file reading has failed");
		// 	// reader.onload = () => {
		// 	// 	// Do whatever you want with the file contents
		// 	// 	const binaryStr = reader.result;
		// 	// 	console.log(binaryStr);
		// 	// };
		// 	reader.readAsArrayBuffer(file);
		// });
	};
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		multiple: true,
	});

	//directory 和 webkitdirectory似乎因为React的TS定义原因要指定空字符串
	return (
		<div {...getRootProps()} className="upload-content">
			<input {...getInputProps()} className="drag-upload-form" />
			{fileList.length > 0 ? (
				<FilesTableContent
					fileList={fileList}
					setFileList={setFileList}
				/>
			) : (
				<EmptyContent />
			)}
		</div>
	);
};

const UploadFileAction = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
	const showModal = () => {
		setIsModalOpen(true);
		setFileList([]);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setFileList([]);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setFileList([]);
	};
	const location = useLocation();
	//['','bucket','bucketPath']
	const bucketPath = location.pathname.split("/").slice(2).join("/");
	// console.log(fileList);
	return (
		<>
			<Button type="primary" onClick={showModal}>
				{" "}
				上传文件
			</Button>
			<Modal
				title="上传文件"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				width={700}
				footer={null}
			>
				<Space>
					<Upload {...getprops(fileList, setFileList)}>
						<Button type="primary">上传文件</Button>
					</Upload>
					<Upload {...getprops(fileList, setFileList)} directory>
						<Button >上传文件夹</Button>
					</Upload>
					<span className="upload-to-text">上传至</span>
					<span className="upload-path">{bucketPath}/</span>
				</Space>
				<p className="upload-info">
					若上传路径中存在同名文件，上传将覆盖原有文件。 <br />
					{/* 上传文件夹将拆分上传文件夹内的所有文件，直接上传文件夹功能正在加紧开发中，敬请期待！ */}
				</p>
				<MyDragger fileList={fileList} setFileList={setFileList} />

				<div className="upload-footer">
					{/* Space长度为元素长度，要套一层才能实现居中 */}
					<Space>
						<Button type="primary" onClick={handleOk}>
							{" "}
							确定
						</Button>
						<Button type="default" onClick={handleCancel}>
							{" "}
							取消
						</Button>
					</Space>
				</div>
			</Modal>
		</>
	);
};

const CreateFolderAction = () => {
	return (
		<Popover content={"文件夹功能正在开发中，敬请期待"}>
			<Button type="primary"> 新建文件夹</Button>
		</Popover>
	);
};
export { UploadFileAction, CreateFolderAction };
