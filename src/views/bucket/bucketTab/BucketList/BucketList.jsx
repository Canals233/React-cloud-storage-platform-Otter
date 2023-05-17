import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { selectAllBucketList } from "../../../../redux/modules/bucketSlice";
import BucketlistCard from "../../bucketListCard/BucketListCard";
import BucketlistNav from "../../bucketListNav/BucketListNav";

const Bucketlist = () => {
	const [bucketList, setBucketList] = useState([]);
	let newBucketData = useSelector(selectAllBucketList);
	useEffect(() => {
		setBucketList(
			[...newBucketData].sort((a, b) => a.name.localeCompare(b.name))
		);
	}, [newBucketData]);

	return (
		<div style={{
            maxWidth: 1368,
            minWidth: 1024,
            margin: "0 auto",
            padding: "0 24px",
        }}>
			<div
				style={{
					marginBottom: "1.25rem",
				}}
			>
				<BucketlistNav setResult={setBucketList} />
			</div>

			<BucketlistCard TableData={bucketList} />
		</div>
	);
};

export default Bucketlist;
