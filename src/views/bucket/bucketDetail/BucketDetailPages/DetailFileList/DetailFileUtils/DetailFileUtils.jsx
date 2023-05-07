import { formatFileSize, formatTimestamp } from "@/utils/util.js";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("123456789", 10);
/**用于快速返回一个标准的文件夹Map
 * content是一个Map
 * files是对象数组，要求成员都是File对象
 * directories是一个Map
 * 要求key为name(File文件的path)作为子文件夹名称，value为创建的StandardDirectoryMap，初始的Map只是占位用
 * size用于记录当前文件夹的总大小
 **/
export class StandardDirectory {
	constructor() {
		this.files = [];
		this.subDirectories = new Map();
		this.size = 0;
	}
	enableStandardSubDirectories() {
		this.subDirectories = new StandardDirectory();
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
                type: 'directory'
            });
		});

		renderableArray = renderableArray.concat(
			filesToObjectArray(this.files)
		);
        
        return renderableArray
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
            type: 'file'
		};
	});
}
/**
 *
 * @param {string[]} paths
 */
export const getRelativePaths = (paths) => {
	let frequencyMap = new Map();
	let relativePaths = [];
	paths.forEach((path) => {
		const pathArray = path.split("\\");
		pathArray.forEach((pathElement) => {
			if (frequencyMap.has(pathElement)) {
				frequencyMap.set(
					pathElement,
					frequencyMap.get(pathElement) + 1
				);
			} else {
				frequencyMap.set(pathElement, 1);
			}
		});
	});
	let frequencyArray = Array.from(frequencyMap.entries());
	let maxcount = frequencyArray[0][1];
	let lastrelativePath = frequencyArray
		.filter((item) => item[1] === maxcount)
		.at(-1)[0];
	paths.forEach((path) => {
		const pathArray = path.split("\\");
		let relativePathArray = pathArray.slice(
			pathArray.indexOf(lastrelativePath)
		);
		let relativePath = "";
		if (relativePathArray.length !== 1) {
			relativePath = "/" + relativePathArray.join("/");
		} else {
			relativePath = relativePathArray[0];
		}
		relativePaths.push(relativePath);
	});

	return relativePaths;
};
