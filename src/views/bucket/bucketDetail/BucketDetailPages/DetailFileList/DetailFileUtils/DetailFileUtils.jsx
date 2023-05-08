import { formatFileSize, formatTimestamp } from "@/utils/util.js";

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
	constructor() {
		this.files = [];
		this.subDirectories = new Map();
		this.size = 0;
	}
	clean() {
		this.files = [];
		this.subDirectories = new Map();
		this.size = 0;
	}
	pushFile(file) {
		this.files.push(file);
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
	for (let { path,name } of dropProps) {
		if (testPath.startsWith(path) && path.length > longestPrefix.length) {
			longestPrefix = path;
			lastpathName = name;
		}
	}

	return lastpathName;
}
