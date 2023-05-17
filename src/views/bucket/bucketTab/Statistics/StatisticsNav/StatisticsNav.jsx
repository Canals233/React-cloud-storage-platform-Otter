import React from "react";

import CalendarWithButtons from "@/components/CalendarWithButtons/CalendarWithButtons";
import SearchInput from "@/views/bucket/components/SearchInput";
import { Radio, Row } from "antd";
const buttonArray = [
	<Radio.Button value="yesterday">昨天</Radio.Button>,
	<Radio.Button value="week">近7天</Radio.Button>,
	<Radio.Button value="month">近30天</Radio.Button>,
];

const StatisticsNav = () => {
	return (
		<>
			<Row justify={"space-between"}>
				<CalendarWithButtons radioButtons={buttonArray} />

				<SearchInput
					showSearchMode={false}
					showSelect={false}
					trigger="onChange"
				/>
			</Row>
		</>
	);
};

export default StatisticsNav;
