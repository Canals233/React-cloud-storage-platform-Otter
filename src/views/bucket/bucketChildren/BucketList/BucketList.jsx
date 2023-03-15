import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBucketList } from "../../../../redux/modules/bucketSlice";
import BucketlistCard from "../../bucketListCard/BucketListCard";
import BucketlistNav from "../../bucketListNav/BucketListNav";



const Bucketlist = () => {
    
    const bucketList=useSelector(selectAllBucketList)
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
			<BucketlistCard TableData={bucketList} />
		</>
	);
};

export default Bucketlist;
