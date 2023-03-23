import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBucketList } from "../../../../redux/modules/bucketSlice";
import BucketlistCard from "../../bucketListCard/BucketListCard";
import BucketlistNav from "../../bucketListNav/BucketListNav";

const Bucketlist = () => {
	const [bucketList, setBucketList] = useState([]);
	let newBucketData = useSelector(selectAllBucketList);
	useEffect(() => {
		console.log("hi change");
		setBucketList(
			[...newBucketData].sort((a, b) => a.name.localeCompare(b.name))
		);
	}, [newBucketData]);

	return (
		<div
			style={{
				maxWidth: "1368px",
				margin: "0 auto",
				padding: "0 0.75rem",
			}}
		>
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
