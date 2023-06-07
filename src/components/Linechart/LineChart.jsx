import React from "react";
import { useEcharts } from "@/hooks/useEcharts";
import { Card, Radio, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import CalendarWithButtons from "@/components/CalendarWithButtons/CalendarWithButtons";
import "./LineChart.less";

const buttonArray = [
	<Radio.Button value="thismonth">本月</Radio.Button>,
	<Radio.Button value="week">近7天</Radio.Button>,
	// <Radio.Button value="fifteen">近15天</Radio.Button>,
	<Radio.Button value="month">近30天</Radio.Button>,
];

export const LineChartCard = ({ title, option, data, costomChartStyle }) => {
	const [echartsRef] = useEcharts(option, data);
	return (
		<Card className="linechart-card">
			<Row className="linechart-nav" justify={"space-between"}>
				{title}
				<DownloadOutlined />
			</Row>
			<Row className="linechart-calendar" justify={"center"}>
				<CalendarWithButtons radioButtons={buttonArray} />
			</Row>
			<div
				className="linechart-content"
				style={{
					height: "400px",
					marginTop: -20,
					zIndex: 2,
					width: "110%",
					...costomChartStyle,
				}}
				ref={echartsRef}
			/>
		</Card>
	);
};


export default LineChartCard;
