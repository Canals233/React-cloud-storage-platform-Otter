import React from "react";
import NestedCard from "@/components/NestedCard/NestedCard";
import LineChartSwitch from "./LineChartSwitch";

const cardcontents = [
	{
		title: "存储量",
		intense: "1",
		intenseUnit: "MB",
		content: "本存储桶用量",
	},
	{
		title: "对象总数",
		intense: "61",
		intenseUnit: "个",
		content: "本存储桶对象总数",
	},
	{
		title: "本月请求数",
		intense: "30",
		intenseUnit: "次",
		content: "上月总请求数：30次",
	},
];

const DataOverview = () => {
	return (
		<>
			<div
				style={{
					maxWidth: 1368,
					minWidth: 1024,
					margin: "0 auto",
					boxShadow: "0px 2px 3px -0.5px #ccc",
				}}
			>
				<NestedCard children={cardcontents} />
			</div>

			<br />
			<LineChartSwitch />
		</>
	);
};

export default DataOverview;
