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