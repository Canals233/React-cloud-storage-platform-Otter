import React from "react";
import StatisticsNav from "./StatisticsNav/StatisticsNav";
import StatisticsListCard from "./StatisticsContent/StatisticsListCard";

const StatisticsList = () => {
	return (
		<div
			style={{
				maxWidth: 1368,
				minWidth: 1024,
				margin: "0 auto",
				padding: "0 24px",
			}}
		>
			<div
				style={{
					marginBottom: "1.25rem",
				}}
			>
				<StatisticsNav />
			</div>
			<div
				style={{
					boxShadow: "0px 2px 4px -0.5px #ccc",
					backgroundColor: "#fff",
				}}
			>
				<StatisticsListCard />
			</div>
		</div>
	);
};

export default StatisticsList;
