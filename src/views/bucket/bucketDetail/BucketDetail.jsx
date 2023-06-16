import { Layout, Menu } from "antd";
import {
	AppstoreOutlined,
	MailOutlined,
	ArrowLeftOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBucketListByName } from "@/redux/modules/bucketSlice";
import "./BucketDetail.less";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCurrentBreadcrumb } from "@/redux/modules/breadcrumbSlice";
import DetailFileList from "./BucketDetailPages/DetailFileList/DetailFileList";
import BucketConfigs from "./BucketDetailPages/BucketConfigs/BucketConfigs";
import DataOverview from "./BucketDetailPages/DataOverview/DataOverview";

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
	getItem("数据概览", "dataOverview", <PieChartOutlined />),
	getItem("文件列表", "file", <MailOutlined />),
	// getItem("基本配置", "configs", <AppstoreOutlined />, [
	// 	getItem("基本信息", "bucketInfoConfig"),
	// 	getItem("权限管理", "publicEnableConfig"),
	// ]),
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
	const type = searchParams.get("type");
	const anchorType = searchParams.get("anchorType");

	const BucketDetailOutlet = () => {
		if (type === "file") {
			return <DetailFileList />;
		}
        else if(type === "dataOverview"){
            return  <DataOverview/>
        }
        else if (
			type === "bucketInfoConfigConfig" ||
			type === "publicEnableConfig"
		) {
			return <BucketConfigs anchorType={anchorType} />;
		} else {
			return <div>文件列表</div>;
		}
	};

	const onMenuChange = (e) => {
		console.log("click ", e);

		//没开多选，所以e.key只有一个
		if (e.keyPath.length === 1) {
			navigate(`/bucket/${bucketName}?type=${e.key}`);
		} else {
			navigate(
				`/bucket/${bucketName}?type=${e.key}&anchorType=${e.keyPath[0]}`
			);
		}

		//菜单子选项太多，不如传参条件渲染
	};

	const onBackClick = () => {
		navigate(`/bucket`);
		dispatch(
			setCurrentBreadcrumb({
				title: [`存储桶列表`],
				path: ["/bucket"],
			})
		);
	};

	return (
		<div className="detail-content">
			<div className="side-menu">
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
			<div className="children-page">
				<BucketDetailOutlet />
			</div>
		</div>
	);
};

export default BucketDetail;
