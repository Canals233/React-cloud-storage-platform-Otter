import { Card, Table } from "antd";
import Column from "antd/lib/table/Column";
import BucketlistCardActions from "./CardComponents/BucketListCardActions";
import { PopHover } from "@/views/bucket/components/PopInfo";

const publicEnableFilterArray = [
	{ text: "公开读写", value: "publicReadWrite" },
	{ text: "私有读写", value: "privateReadWrite" },
	{ text: "公开读私有写", value: "publicReadPrivateWrite" },
];
const onPublicEnableFilter = (value, record) => {
    if (value === "publicReadWrite") {
        return (
            record.publicWriteEnable &&
            record.publicReadEnable
        );
    } else if (value === "publicReadPrivateWrite") {
        return (
            !record.publicWriteEnable &&
            record.publicReadEnable
        );
    } else if (value === "privateReadWrite") {
        return (
            !record.publicWriteEnable &&
            !record.publicReadEnable
        );
    }
}
const popContent = <div>存储桶名称由[自定义名称]-[开发商 APPID]构成</div>;
import { publicEnableRenderMap } from "@/views/bucket/api/bucketApi.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentBreadcrumb } from "@/redux/modules/breadcrumbSlice";
import { setAllBucketDetail } from "@/redux/modules/bucketDetailSlice";

//这个组件是存储桶列表的卡片组件，包含了表格，表格的数据是从父组件传递过来的
const BucketlistCard = ({ TableData }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleBucketClick = (name, files) => {
		navigate(`/bucket/${name}?anchorType=file`);

		dispatch(setAllBucketDetail(files));
		dispatch(
			setCurrentBreadcrumb({
				title: [`存储桶列表`, `${name}`],
				path: ["/bucket", `/bucket/${name}`],
			})
		);
	};
	// 排序时候要注意，antd4的排序的参数是整行的数据对象，而不是单个数据，要访问属性后排序

	return (
		<>
			<Table dataSource={TableData} rowKey={"bucketId"}>
				<Column
					title={
						<>
							存储桶名称{" "}
							<PopHover
								content={popContent}
								placement={"right"}
							/>
						</>
					}
					dataIndex="name"
					key="name"
					sorter={(a, b) => {
						if (a.name === b.name) return 0;
						return a.name > b.name ? 1 : -1;
					}}
					render={(text, record) => {
						return (
							<a
								onClick={() =>
									handleBucketClick(record.name, record.files)
								}
							>
								{text}
							</a>
						);
					}}
				></Column>
				<Column
					title="访问权限"
					dataIndex={["publicWriteEnable", "publicReadEnable"]}
					key="publicEnable"
					filters={publicEnableFilterArray}
					onFilter={onPublicEnableFilter}
                    //过滤逻辑是text映射value，再传到onfilter去筛选
					render={(_, record) => {
						return publicEnableRenderMap(
							record.publicWriteEnable,
							record.publicReadEnable
						);
					}}
				/>
				<Column
					title="创建时间"
					dataIndex="time"
					key="time"
					sorter={(a, b) => {
						if (a.time === b.time) return 0;
						return a.time > b.time ? 1 : -1;
					}}
				/>
				<Column
					title="操作"
					key="action"
					render={(_, record) => {
						return (
							<BucketlistCardActions bucketId={record.bucketId} />
						);
					}}
				/>
			</Table>
		</>
	);
};
export default BucketlistCard;
