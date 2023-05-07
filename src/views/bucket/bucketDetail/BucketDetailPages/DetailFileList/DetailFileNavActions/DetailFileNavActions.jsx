import { Button, Modal, Popover, Space, Table, Upload } from "antd";
import { InboxOutlined, FolderFilled, FileFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./NavActions.less";
import { useDropzone } from "react-dropzone";
import nodepath from "path";

import {
	StandardDirectory,
	filesToObjectArray,
	getRelativePaths,
} from "../DetailFileUtils/DetailFileUtils";
import { useSelector } from "react-redux";
import { getIsElectorn } from "@/redux/modules/globalSlice";

const bucketUploadDirectory = new StandardDirectory();

const getUploadProps = (fileList, setFileList, args) => {
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

const RecursivelyCreateDirectory = (
	pathArray,
	currentDirectory, //可以认为当前在这一层的文件夹中进行操作
	originalFile //传入的是引用
) => {
	currentDirectory.size += originalFile.size; //文件不会被重新访问，所以可以直接在这里加上文件大小
	if (pathArray.length <= 1) {
		//访问到了最后的文件，推入当前文件夹的文件列表中
		currentDirectory.pushFile(originalFile);

		return;
	}
	//仍然有子文件夹，继续递归
	const newFileName = pathArray[0];
	// console.log(currentDirectory, "currentDirectory");
	currentDirectory.setSubDirectoryByName(newFileName);
	RecursivelyCreateDirectory(
		pathArray.slice(1),
		currentDirectory.getSubDirectoryByName(newFileName),
		originalFile
	);
};

const MyDragger = ({ fileList, setFileList, isElectron }) => {
	const onDrop = (acceptedFiles) => {
		setFileList(fileList.concat(acceptedFiles));
		let relativePaths = acceptedFiles.map((file) => file.path);
		if (isElectron) {
			relativePaths = getRelativePaths(relativePaths);
		}
		// console.log(relativePaths, "relativePaths");
		// console.log(acceptedFiles, "acceptedFiles");
		acceptedFiles.forEach((acceptedFile, index) => {
			const path = relativePaths[index];

			const pathArray = path.split("/").slice(1); //path有一个/开头，需要去掉第一个空元素
			// console.log(pathArray, "cur path");
			RecursivelyCreateDirectory(
				pathArray.slice(1),
				bucketUploadDirectory,
				acceptedFile //同一个对象的引用，性能问题不是很大?
			);
		});
		// console.log(bucketUploadDirectory, "processed bucket directory");
	};
	//需要允许重复上传
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
			render: (text, record) => {
				return (
					<Space>
						{record.type === "directory" && <FolderFilled style={{
                            color:'lightblue'
                        }} />}
						{text}
					</Space>
				);
			},
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
	let renderableArray = bucketUploadDirectory.getRenderableArray();
    // console.log(renderableArray, "renderable array");
	return (
		<Table
			className="upload-file-table"
			scroll={{
				y: 200,
			}}
			dataSource={renderableArray}
			columns={columns}
			rowKey={"id"}
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

const UploadFileAction = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
	const isElectron = useSelector(getIsElectorn);
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
					<Upload {...getUploadProps(fileList, setFileList)}>
						<Button type="primary">上传文件</Button>
					</Upload>
					<Upload
						{...getUploadProps(fileList, setFileList)}
						directory
					>
						<Button>上传文件夹</Button>
					</Upload>
					<span className="upload-to-text">上传至</span>
					<span className="upload-path">{bucketPath}/</span>
				</Space>
				<p className="upload-info">
					若上传路径中存在同名文件，上传将覆盖原有文件。 <br />
					{/* 上传文件夹将拆分上传文件夹内的所有文件，直接上传文件夹功能正在加紧开发中，敬请期待！ */}
				</p>
				<MyDragger
					fileList={fileList}
					setFileList={setFileList}
					isElectron={isElectron}
				/>

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

export { UploadFileAction };
