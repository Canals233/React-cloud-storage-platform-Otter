import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
            width:1368,
            margin:"0 auto",
            padding:"0 24px"
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
