import dayjs from "dayjs";

export const visiableRenderMap = (code) => {
	let visiableStr = "";
	if (code === "600") {
		visiableStr = "私有读写";
	} else if (code === "644") {
		visiableStr = "公开读，私有写";
	} else if (code === "666") {
		visiableStr = "公开读写";
	}
	return <>{visiableStr}</>;
};

export const radioTextMap = (value) => {
	let newText = "";
	//和linux的读写权限一样
	if (value === "600") {
		newText = "只有创建者和授权用户才能对进行读写操作。";
	} else if (value === "644") {
		newText = "所有人都可以读取，但只有创建者和授权用户才能写入";
	} else if (value === "666") {
		newText = "所有人都可以读取和写入";
	}
	return newText;
};

export function formatFileSize(size) {
	const units = ["B", "KB", "MB", "GB", "TB"];
	let i = 0;
	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++;
	}
	return `${size.toFixed(2)} ${units[i]}`;
}
export function formatTimestamp(timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
  }