import { Button, Dropdown, message, Modal, Popover, Space, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavActions.less";
const { Dragger } = Upload;
const getprops = (fileList, setFileList, args) => {
	return {
		name: "file",
		multiple: true,
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		headers: {
			authorization: "authorization-text",
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
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

const UploadFileAction = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const location = useLocation();
	//['','bucket','bucketPath']
	const bucketPath = location.pathname.split("/").slice(2).join("/");
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
				className="upload-file-modal"
				centered
				width={700}
			>
				<Space>
					<Upload {...getprops(fileList,setFileList)}>
						<Button type="primary">上传文件</Button>
					</Upload>
					<Upload {...getprops(fileList,setFileList)} directory>
						<Button>上传文件夹</Button>
					</Upload>
					<text className="upload-to-text">上传至</text>
					<text className="upload-path">{bucketPath}/</text>
				</Space>
				<p className="upload-info">
					若上传路径中存在同名文件，上传将覆盖原有文件。{" "}
				</p>
				<Dragger {...getprops(fileList,setFileList)} height={300}  multiple>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">未选择文件/文件夹</p>
					<p className="ant-upload-hint">
						支持拖拽上传，支持选择多个文件/文件夹
					</p>
				</Dragger>
			</Modal>
		</>
	);
};

const CreateFolderAction = () => {
	return (
		<Popover content={"文件夹功能正在开发中，敬请期待"}>
			<Button disabled> 新建文件夹</Button>
		</Popover>
	);
};
export { UploadFileAction, CreateFolderAction };
