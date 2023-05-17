import { PageHeader } from "antd";
import React from "react";
import NestedCard from "@/components/NestedCard/NestedCard.jsx";
import LineChartGroups from "./LinechartGroups/LineChartGroups.jsx";



const cardDataChildren = [
	{
		title: "存储桶数量",
		intense: "1",
		intenseUnit: "个",
	},
	{
		title: "对象总数",
		intense: "1",
		intenseUnit: "个",
	},
	{
		title: "日均存储用量",
		intense: "10",
		intenseUnit: "KB",
	},
];

const DataVisualize = () => {
	return (
		<>
			<PageHeader
				title={"使用统计"}
				ghost={false}
				style={{ padding: "2px 24px", marginBottom: 24 }}
			/>
			<div
				style={{
					maxWidth: 1368,
					minWidth: 1024,
					margin: "0 auto",
					padding: "0 24px",
				}}
			>
				<NestedCard children={cardDataChildren} />
                <LineChartGroups/>
			</div>
		</>
	);
};

export default DataVisualize;
