import { Layout, Menu } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	ArrowLeftOutlined 
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { selectBucketListByName } from "@/redux/modules/bucketSlice";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
const items = [
	getItem("文件列表", "file", <MailOutlined />),
	getItem("基本配置", "config", <AppstoreOutlined />, [
		getItem("标签管理", "tagsConfig"),
		getItem("权限管理", "visiableConfig"),
	]),
];

const BucketDetail = ({ bucketName }) => {
	const currentBucket = useSelector(selectBucketListByName(bucketName));
	console.log(currentBucket);
	const onClick = (e) => {
		console.log("click ", e);
	};
	return (
		<>
			
				<div
					style={{
						width: 180,
						height: "100%",
						backgroundColor: "white",
					}}
				>
                    <ArrowLeftOutlined />
					<Menu
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						mode="inline"
						items={items}
						onClick={onClick}
					/>
				</div>
			
		</>
	);
};

export default BucketDetail;
