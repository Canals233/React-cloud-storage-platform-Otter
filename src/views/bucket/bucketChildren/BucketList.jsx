import React, { useState } from "react";
import BucketlistCard from "../bucketListCard/BucketListCard";
import BucketlistNav from "../bucketListNav/BucketListNav";

const TableData = [
	{
		key: "1",
		name: "John",
		visiable: "私有读写",
		time: "2023-03-09 16:19:02",
	},
	{
		key: "2",
		name: "Jim",
		visiable: "公开读写",
		time: "2023-03-09 16:17:54",
	},
	
	{
		key: "3",
		name: "Canals",
		visiable: "公开读，私有写",
		time: "2023-03-08 16:28:21",
	},
    {
		key: "4",
		name: "Joe",
		visiable: "公开读，私有写",
		time: "2023-03-07 16:28:21",
	},
];

const Bucketlist = () => {
	const [data, setData] = useState([]);
	const [value, setValue] = useState();
	const handleSearch = (newValue) => {
		if (newValue) {
			setData(["i am test data", "yeaaa"]);
			// fetch(newValue, setData);
		} else {
			setData([]);
		}
	};
	const handleChange = (newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<BucketlistNav
				value={value}
				handleChange={handleChange}
				handleSearch={handleSearch}
			/>
			<p style={{ height: ".25rem" }} />
			<BucketlistCard TableData={TableData} />
		</>
	);
};

export default Bucketlist;
