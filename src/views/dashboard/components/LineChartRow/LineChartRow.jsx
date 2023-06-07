import React from 'react'

import "./LineChartRow.less";
import LineChartCard from '@/components/Linechart/LineChart';


const chartsOptionsAndTitles = [
	{
		option: {
			legend: {},
			tooltip: {},
			dataset: {
				dimensions: ["date", "写请求数", "读请求数"],
				source: [
					{ date: "2023-04-17", 写请求数: 32, 读请求数: 55 },
					{ date: "2023-04-18", 写请求数: 42, 读请求数: 67 },
					{ date: "2023-04-19", 写请求数: 52, 读请求数: 63 },
					{ date: "2023-04-20", 写请求数: 62, 读请求数: 71 },
					{ date: "2023-04-21", 写请求数: 72, 读请求数: 87 },
					{ date: "2023-04-22", 写请求数: 82, 读请求数: 79 },
					{ date: "2023-04-23", 写请求数: 92, 读请求数: 73 },
					{ date: "2023-04-24", 写请求数: 83, 读请求数: 89 },
					{ date: "2023-04-25", 写请求数: 71, 读请求数: 82 },
					{ date: "2023-04-26", 写请求数: 62, 读请求数: 76 },
					{ date: "2023-04-27", 写请求数: 54, 读请求数: 68 },
					{ date: "2023-04-28", 写请求数: 42, 读请求数: 64 },
					{ date: "2023-04-29", 写请求数: 32, 读请求数: 59 },
					{ date: "2023-04-30", 写请求数: 63, 读请求数: 83 },
					{ date: "2023-05-01", 写请求数: 43, 读请求数: 85 },
					{ date: "2023-05-02", 写请求数: 83, 读请求数: 73 },
					{ date: "2023-05-03", 写请求数: 86, 读请求数: 65 },
					{ date: "2023-05-04", 写请求数: 72, 读请求数: 53 },
					{ date: "2023-05-05", 写请求数: 62, 读请求数: 52 },
					{ date: "2023-05-06", 写请求数: 54, 读请求数: 41 },
					{ date: "2023-05-07", 写请求数: 45, 读请求数: 32 },
					{ date: "2023-05-08", 写请求数: 63, 读请求数: 45 },
					{ date: "2023-05-09", 写请求数: 84, 读请求数: 58 },
					{ date: "2023-05-10", 写请求数: 95, 读请求数: 67 },
					{ date: "2023-05-11", 写请求数: 87, 读请求数: 79 },
					{ date: "2023-05-12", 写请求数: 72, 读请求数: 83 },
					{ date: "2023-05-13", 写请求数: 63, 读请求数: 89 },
					{ date: "2023-05-14", 写请求数: 54, 读请求数: 91 },
					{ date: "2023-05-15", 写请求数: 45, 读请求数: 82 },
					{ date: "2023-05-16", 写请求数: 32, 读请求数: 73 },
					{ date: "2023-05-17", 写请求数: 63, 读请求数: 65 },
				],
			},
			xAxis: {
				type: "category",
				axisLabel: { interval: 1, rotate: 45 },
				axisPointer: {
					label: {
						formatter: function (params) {
							return "日期： " + params.value;
						},
					},
					show: true,
				},
			},
			yAxis: {
				type: "value",
				axisLabel: { formatter: "{value} 次" },
			},
			series: [
				{
					type: "line",
				},
				{ type: "line" },
			],
			legend: { bottom: -5 },
		},
		title: "请求数",
	},
	{
		option: {
			legend: {},
			tooltip: {},
			dataset: {
				dimensions: ["date", "存储用量"],
				source: [
					{ date: "2023-04-17", 存储用量: 32 },
					{ date: "2023-04-18", 存储用量: 32 },
					{ date: "2023-04-19", 存储用量: 32 },
					{ date: "2023-04-20", 存储用量: 32 },
					{ date: "2023-04-21", 存储用量: 32 },
					{ date: "2023-04-22", 存储用量: 32 },
					{ date: "2023-04-23", 存储用量: 32 },
					{ date: "2023-04-24", 存储用量: 42 },
					{ date: "2023-04-25", 存储用量: 42 },
					{ date: "2023-04-26", 存储用量: 42 },
					{ date: "2023-04-27", 存储用量: 42 },
					{ date: "2023-04-28", 存储用量: 42 },
					{ date: "2023-04-29", 存储用量: 52 },
					{ date: "2023-04-30", 存储用量: 52 },
					{ date: "2023-05-01", 存储用量: 52 },
					{ date: "2023-05-02", 存储用量: 62 },
					{ date: "2023-05-03", 存储用量: 62 },
					{ date: "2023-05-04", 存储用量: 62 },
					{ date: "2023-05-05", 存储用量: 72 },
					{ date: "2023-05-06", 存储用量: 72 },
					{ date: "2023-05-07", 存储用量: 72 },
					{ date: "2023-05-08", 存储用量: 82 },
					{ date: "2023-05-09", 存储用量: 82 },
					{ date: "2023-05-10", 存储用量: 82 },
					{ date: "2023-05-11", 存储用量: 82 },
					{ date: "2023-05-12", 存储用量: 92 },
					{ date: "2023-05-13", 存储用量: 92 },
					{ date: "2023-05-14", 存储用量: 92 },
					{ date: "2023-05-15", 存储用量: 92 },
					{ date: "2023-05-16", 存储用量: 92 },
					{ date: "2023-05-17", 存储用量: 92 },
				],
			},
			xAxis: {
				type: "category",
				axisLabel: { interval: 1, rotate: 45 },
				axisPointer: {
					label: {
						formatter: function (params) {
							return "日期： " + params.value;
						},
					},
					show: true,
				},
			},
			yAxis: {
				type: "value",
				axisLabel: { formatter: "{value} 次" },
			},
			series: [
				{
					type: "line",
				},
			],
			legend: { bottom: -5 },
		},
		title: "存储用量",
	},
];


const LineChartGroups = () => {
	return (
		<>
			<div justify={"space-between"} className="charts-row">
				{chartsOptionsAndTitles.map((item, index) => {
					return (
						<LineChartCard
							title={item.title}
							option={item.option}
							key={index}
						/>
					);
				})}
			</div>
		</>
	);
};

export default LineChartGroups;