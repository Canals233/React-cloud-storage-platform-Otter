import { Layout, Menu } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	ArrowLeftOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBucketListByName } from "@/redux/modules/bucketSlice";
import "./BucketDetail.less";
import { useLocation, useNavigate, useParams } from "react-router-dom";


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

const BucketDetail = () => {
    //redux相关
    const dispatch = useDispatch();
    

    //路由相关
	const location = useLocation();
	const navigate = useNavigate();
	const URLParams = useParams(); //如果有多级会有多个参数
	const bucketName = URLParams.name;
	const searchParams = new URLSearchParams(location.search);
	const currentBucket = useSelector(selectBucketListByName(bucketName));
	const anchorType = searchParams.get("anchorType");


	const onMenuChange = (e) => {
		// console.log("click ", e);

		//没开多选，所以e.key只有一个
		navigate(`/bucket/${bucketName}?anchorType=${e.key}`);
		//菜单子选项太多，不如传参条件渲染

	};

	const onBackClick = () => {
		navigate(`/bucket`);
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
				<div className="back-btn" onClick={onBackClick}>
					<ArrowLeftOutlined className="back-icon" />
					<span className="back-text">返回列表</span>
				</div>
				<Menu
					defaultSelectedKeys={"file"}
					mode="inline"
					items={items}
					onClick={onMenuChange}
				/>
			</div>
		</>
	);
};

export default BucketDetail;
