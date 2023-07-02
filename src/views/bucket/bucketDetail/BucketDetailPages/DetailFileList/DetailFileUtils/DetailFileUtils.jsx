import { formatFileSize, formatTimestamp } from "@/utils/util.js";
import COS from "cos-js-sdk-v5";
// import { ipcRenderer } from "electron";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("123456789", 10);
/**用于快速返回一个标准的文件夹Map
 * content是一个Map
 * files是对象数组，要求成员都是File对象
 * directories是一个Map
 * 要求key为name(File文件的path)作为子文件夹名称，value为创建的StandardDirectoryMap
 * size用于记录当前文件夹的总大小
 **/
export class StandardDirectory {
	constructor(standardDirectory) {
		if (standardDirectory && !standardDirectory.isEmpty()) {
			this.files = standardDirectory.files;
			this.subDirectories = standardDirectory.subDirectories;
			this.size = standardDirectory.size;
		} else {
			this.files = [];
			this.subDirectories = new Map();
			this.size = 0;
		}
		this.uploadedFiles = {};
	}
	clean() {
		this.files = [];
		this.subDirectories = new Map();
		this.size = 0;
	}
	pushFile(file) {
		this.files.push(file);
	}
	isEmpty() {
		return this.files.length === 0 && this.subDirectories.size === 0;
	}
	deleteFileOrDirectoryByRecord(record) {
		// console.log(record)
		if (record.type === "file") {
			this.files = this.files.filter((file) => {
				return file.name !== record.name;
			});
		} else {
			this.subDirectories.delete(record.name);
		}
		this.size -= record.originSize;
		console.log("删除之后的内容", this);
	}
	setSubDirectoryByName(name) {
		// console.log(this.subDirectories, "this.subDirectories")
		if (!this.subDirectories.has(name)) {
			this.subDirectories.set(name, new StandardDirectory());
		}
	}
	getSubDirectoryByName(name) {
		return this.subDirectories.get(name);
	}
	getRenderableArray() {
		let renderableArray = [];
		let subDirectoriesArray = Array.from(this.subDirectories.entries());
		subDirectoriesArray.forEach((entry) => {
			const [key, { size }] = entry;
			// console.log(entry,key,size,'cur sub')
			renderableArray.push({
				id: nanoid(),
				name: key,
				originSize: size,
				size: formatFileSize(size),
				time: formatTimestamp(Date.now()),
				type: "directory",
			});
		});
		renderableArray = renderableArray.concat(
			filesToObjectArray(this.files)
		);
		return renderableArray;
	}

	async recursiveUploadFiles(cos, setUploadedFilesArray) {
		let renderableArray = [];
		this.files.forEach((file) => {
			cos.uploadFile(
				{
					Bucket: "c4-test-1256012308" /* 填写自己的 bucket，必须字段 */,
					Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
					Key: file.name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
					Body: file, // 上传文件对象
					SliceSize:
						1024 *
						1024 *
						5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
					onProgress: function (progressData) {
						console.log(JSON.stringify(progressData));
					},
				},
				function (err, data) {
					if (err) {
						console.log("上传失败", err);
					} else {
						console.log("上传成功");
						renderableArray = renderableArray.concat({
							id: nanoid(),
							name: file.name,
							size: formatFileSize(file.size),
							time: formatTimestamp(file.lastModified),
							type: "file",
						});
						setUploadedFilesArray(renderableArray);
					}
				}
			);
		});
		let subDirectoriesArray = Array.from(this.subDirectories.entries());
		subDirectoriesArray.forEach((entry) => {
			console.log(entry);
			const [key, { files }] = entry;
			// cos.uploadFile(
			// 	{
			// 		Bucket: "c4-test-1256012308" /* 填写自己的 bucket，必须字段 */,
			// 		Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
			// 		Key:
			// 			key +
			// 			"/" /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
			// 	},
			// 	function (err, data) {
			// 		if (err) {
			// 			console.log("上传失败", err);
			// 		} else {
			// 			console.log("上传成功");
			// 		}
			// 	}
			// );
			renderableArray = renderableArray.concat({
				id: nanoid(),
				name: key,
				type: "directory",
			});
			setUploadedFilesArray(renderableArray);
		});
	}
}
/**
 *
 * @param {File[]} files
 * @returns
 */
export function filesToObjectArray(files) {
	return files.map((file) => {
		return {
			id: nanoid(),
			name: file.name,
			originSize: file.size,
			size: formatFileSize(file.size),
			time: formatTimestamp(file.lastModified),
			type: "file",
		};
	});
}
/**
 *
 * @param {string[]} paths
 */
export const getRelativePaths = (paths, dropProps) => {
	let resultRelativePaths = [];
	paths.forEach((path, index) => {
		const pathArray = path.split("\\");

		let upperDirectory = findLastPathName(dropProps, path);

		// console.log(upperDirectory);
		let relativePathArray = pathArray.slice(
			pathArray.indexOf(upperDirectory)
		);
		// console.log(relativePathArray, "relativePathArray");
		let relativePath = "";
		if (relativePathArray.length !== 1) {
			relativePath = "/" + relativePathArray.join("/");
		} else {
			relativePath = relativePathArray[0];
		}
		resultRelativePaths.push(relativePath);
	});
	// console.log(resultRelativePaths, "resultRelativePaths");
	return resultRelativePaths;
};

function findLastPathName(dropProps, testPath) {
	let longestPrefix = "";
	let lastpathName = "";
	for (let { path, name } of dropProps) {
		if (testPath.startsWith(path) && path.length > longestPrefix.length) {
			longestPrefix = path;
			lastpathName = name;
		}
	}
	return lastpathName;
}

export const downloadFile = (key) => {
	const cos = new COS({
     
    });

	if (window.process && window.process.type === "renderer") {
		// 在渲染进程中
		ipcRenderer.send("download-file", key);
		return;
	} else {
		// 在浏览器环境中

		cos.getObjectUrl(
			{
				Bucket: "" /* 填写自己的 bucket，必须字段 */,
				Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
				Key: key /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
			},
			function (err, data) {
				if (err) return console.log(err);
				/* 通过指定 response-content-disposition=attachment 实现强制下载 */
				var downloadUrl =
					data.Url +
					(data.Url.indexOf("?") > -1 ? "&" : "?") +
					"response-content-disposition=attachment";
				/* 可拼接 filename 来实现下载时重命名 */
				/* downloadUrl += ';filename=myname'; */
				// （推荐使用 window.open()方式）这里是新窗口打开 url，如果需要在当前窗口打开，可以使用隐藏的 iframe 下载，或使用 a 标签 download 属性协助下载
				const downloadWindow = window.open(downloadUrl, "_blank");

				setTimeout(() => {
					downloadWindow.close();
				}, 2000); // 延迟 2 秒后关闭窗口
			}
		);
	}
};
