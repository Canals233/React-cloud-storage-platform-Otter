import { Layout, Menu } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	ArrowLeftOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { selectBucketListByName } from "@/redux/modules/bucketSlice";
import "./BucketDetail.less";
import { useNavigate } from "react-router-dom";
import { BucketDetailContext } from "./provider/BucketDetailProvider";
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
	getItem("基本配置", "configs", <AppstoreOutlined />, [
		getItem("标签管理", "tagsConfig"),
		getItem("权限管理", "visiableConfig"),
	]),
];

const styles = {
	backBtn: {
		fontSize: 16,
	},
};

const BucketDetail = ({ bucketName, anchorType }) => {
	const {
		currentOpenKeys,
		setCurrentOpenKeys,
		currentSelectedKeys,
		setCurrentSelectedKeys,
	} = useContext(BucketDetailContext);
	const navigate = useNavigate();
	const currentBucket = useSelector(selectBucketListByName(bucketName));
	// console.log(currentBucket);
	const onMenuChange = (e) => {
		// console.log("click ", e);
		if (e.key === "file") {
			return;
		}
		setCurrentSelectedKeys([e.key]);
		//没开多选，所以只有一个
		navigate(`/bucket?name=${bucketName}&anchorType=${e.key}`);
	};
	const onSubMenuOpenChange = (openKeys) => {
		setCurrentOpenKeys(openKeys);
	};
	const onBackClick = () => {
		navigate(`/bucket`);
	};

    console.log(anchorType,currentSelectedKeys)
	return (
		<>
			<div
				style={{
					width: 180,
					height: "100%",
					backgroundColor: "white",
				}}
			>
				<div className="back-btn" onClick={onBackClick}>
					<ArrowLeftOutlined className="back-icon" />
					<span className="back-text">返回列表</span>
				</div>
				<Menu
					defaultSelectedKeys={[anchorType]}
					defaultOpenKeys={currentOpenKeys}
					mode="inline"
					items={items}
					onClick={onMenuChange}
					onOpenChange={onSubMenuOpenChange}
				/>
			</div>
		</>
	);
};

export default BucketDetail;
