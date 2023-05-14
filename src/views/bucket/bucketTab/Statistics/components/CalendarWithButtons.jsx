import { Button, Space,DatePicker } from "antd";
import React from "react";
import { useState } from "react";
import moment from "moment";
const { RangePicker } = DatePicker;
const CalendarWithButtons = () => {
    /*
        AntD4基于moment！
        不是dayjs！！！！！
    */
	const [datePairs, setDatePairs] = useState([]);
	const today = moment();  
const yesterday = moment().subtract(1, "day");
const weekago = moment().subtract(7, "day");
const monthago = moment().subtract(30, "day");
const onCalendarHandler = (val) => {
    //选择日期时候触发
    setDates(val);
};

	return (
		<>
			<Space>
				<Button onClick={() => setDatePairs([yesterday, yesterday])}>
					昨天
				</Button>
				<Button onClick={() => setDatePairs([weekago, today])}>
					最近7天
				</Button>
				<Button onClick={() => setDatePairs([monthago, today])}>
					最近30天
				</Button>
				<RangePicker
			allowClear={false}
			value={datePairs}
			
			onCalendarChange={onCalendarHandler}
		/>
			</Space>
		</>
	);
};

export default CalendarWithButtons;
