import { Card, Table } from "antd";
import Column from "antd/lib/table/Column";
import BucketlistCardActions from "./CardComponents/BucketListCardActions";
import { PopHover } from "@/views/bucket/components/PopInfo";

const visiableFilterArray = [
	{
		text: "公开读写",
		value: "666",
	},
	{
		text: "公开读，私有写",
		value: "644",
	},
	{
		text: "私有读写",
		value: "600",
	},
];
const popContent = <div>存储桶名称由[自定义名称]-[开发商 APPID]构成</div>;
import { visiableRenderMap } from "@/views/bucket/api/bucketApi.jsx";
import { useNavigate } from "react-router-dom";

//这个组件是存储桶列表的卡片组件，包含了表格，表格的数据是从父组件传递过来的
const BucketlistCard = ({ TableData }) => {
	const navigate = useNavigate();
	const handleBucketClick = (name) => {
		navigate(`/bucket/${name}?anchorType=file`);
	};
	// 排序时候要注意，antd4的排序的参数是整行的数据对象，而不是单个数据，要访问属性后排序

	return (
		<>
			<Table dataSource={TableData}>
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
							<a onClick={() => handleBucketClick(record.name)}>
								{text}
							</a>
						);
					}}
				></Column>
				<Column
					title="访问权限"
					dataIndex="visiable"
					key="visiable"
					filters={visiableFilterArray}
					onFilter={(value, record) =>
						record.visiable.indexOf(value) === 0
					}
					render={visiableRenderMap}
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
						return <BucketlistCardActions bucketKey={record.key} />;
					}}
				/>
			</Table>
		</>
	);
};
export default BucketlistCard;
