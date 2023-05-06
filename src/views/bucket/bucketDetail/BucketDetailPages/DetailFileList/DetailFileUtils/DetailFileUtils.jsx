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
		this.files=[];
        this.subDirectories = new Map();
        this.size = 0;
	}
    enableStandardSubDirectories() {
        this.subDirectories=new StandardDirectory()
    }
    pushFile(file) {
        this.files.push(file);
    }
    setSubDirectoryByName(name) {
        // console.log(this.subDirectories, "this.subDirectories")
        if(!this.subDirectories.has(name)){
            this.subDirectories.set(name, new StandardDirectory());
        }
    }
    getSubDirectoryByName(name) {
        return this.subDirectories.get(name);
    }
}
/**
 *
 * @param {File[]} files
 * @returns
 */

export const filesToObjectArray = (files) => {
	return files.map((file) => {
		return {
			id: nanoid(),
			name: file.name,
			size: formatFileSize(file.size),
			time: formatTimestamp(file.lastModified),
		};
	});
};
