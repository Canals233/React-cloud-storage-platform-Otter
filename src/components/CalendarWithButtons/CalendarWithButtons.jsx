import { Button, Space, DatePicker, Radio, Row } from "antd";
import React from "react";
import { useState } from "react";
import moment from "moment";
const { RangePicker } = DatePicker;
const CalendarWithButtons = ({ radioButtons = [] }) => {
	/*
        AntD4基于moment！
        不是dayjs！！！！！
    */
	const today = moment();
	const yesterday = moment().subtract(1, "day");
	const thismonth = moment().startOf("month");
	const weekago = moment().subtract(7, "day");
	const fifteenago = moment().subtract(15, "day");
	const monthago = moment().subtract(30, "day");
	const [datePairs, setDatePairs] = useState([yesterday, yesterday]);
	const [dateRange, setDateRange] = useState("yesterday");

	const onCalendarHandler = (val) => {
		//选择日期时候触发
		setDatePairs(val);
	};
	const onDateRangeChangeHandler = (range) => {
		setDateRange(range);
		switch (range) {
			case "yesterday":
				setDatePairs([yesterday, yesterday]);
				break;
			case "thismonth":
				setDatePairs([thismonth, today]);
				break;
			case "fifteen":
				setDatePairs([fifteenago, today]);
				break;
			case "week":
				setDatePairs([weekago, today]);
				break;
			case "month":
				setDatePairs([monthago, today]);
				break;
		}
	};

	return (
		<Row>
			<Radio.Group
				value={dateRange}
				onChange={(e) => onDateRangeChangeHandler(e.target.value)}
			>
				{...radioButtons}
			</Radio.Group>

			<RangePicker
				allowClear={false}
				value={datePairs}
				onCalendarChange={onCalendarHandler}
			/>
		</Row>
	);
};

export default CalendarWithButtons;
