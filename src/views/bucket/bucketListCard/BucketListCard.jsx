import { Card, Table } from "antd";
import Column from "antd/lib/table/Column";
import BucketlistCardActions from "./CardComponents/BucketListCardActions";
const visiableFilterArray=[
    {
        text: "公开读写",
        value: "公开读写",
    },
    {
        text: "公开读，私有写",
        value: "公开读，私有写",
    },
    {
        text: "私有读写",
        value: "私有读写",
    },
]
//这个组件是存储桶列表的卡片组件，包含了表格，表格的数据是从父组件传递过来的
const BucketlistCard = ({ TableData }) => {
	// 排序时候要注意，antd4的排序的参数是整行的数据对象，而不是单个数据，要访问属性后排序
    
	return (
		<>
			<Card>
				<Table dataSource={TableData}>
					<Column
						title="存储桶名称"
						dataIndex="name"
						key="name"
						sorter={(a, b) => {
							if (a.name === b.name) return 0;
							return a.name > b.name ? 1 : -1;
						}}
					></Column>
					<Column
						title="访问"
						dataIndex="visiable"
						key="visiable"
						filters={visiableFilterArray}
						onFilter={(value, record) =>
							record.visiable.indexOf(value) === 0
						}
					/>
					<Column
						title="创建时间"
						dataIndex="time"
						key="time"
						sorter={(a, b) => {
							if (a.time === b.time) return 0;
							return a.time > b.time ? 1 : -1;
						}}
						defaultSortOrder={"descend"}
					/>
					<Column
						title="操作"
						key="action"
						render={(_, record) => {
							return <BucketlistCardActions />;
						}}
					/>
				</Table>
			</Card>
		</>
	);
};
export default BucketlistCard;
