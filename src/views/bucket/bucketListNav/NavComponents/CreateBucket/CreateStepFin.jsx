import React, { useContext } from "react";
import { CreateBucketContext } from "../../provider/BucketProvider";
import { visiableRenderMap } from "@/views/bucket/api/bucketApi";
import { PopHover } from "@/views/bucket/components/PopInfo";
const listStyle = {
	key: {
		width: "100px",
		display: "inline-block",
		margin: "8px 0",
		color: "gray",
	},
};
const popContent = <div>存储桶名称由[自定义名称]-[开发商 APPID]构成</div>;
const bucketKVMapFunction = (item, index, userID) => {
	switch (item[0]) {
		case "visiable":
			return (
				<div key={index}>
					<span style={listStyle.key}>{"访问权限"}</span>
					<span>{visiableRenderMap(item[1])}</span>
				</div>
			);
		case "encrypt":
			return (
				<div key={index}>
					<span style={listStyle.key}>{"服务端加密"}</span>
					<span>{"属性基加密"}</span>
				</div>
			);
		case "name":
			return (
				<div key={index}>
					<span style={listStyle.key}>
						存储桶名称 <PopHover content={popContent} />
					</span>
					<span>{item[1] + "-" + "staticUser"}</span>
				</div>
			);
		case "tags":
			return (
				<div key={index}>
					<span style={listStyle.key}>{"标签"}</span>
					<span>
						{item[1].map((value, index) => {
							return (
								<span
									key={index}
									style={{
										backgroundColor: "#eee",
										marginRight: "0.5rem",
									}}
								>
									{value}
								</span>
							);
						})}
					</span>
				</div>
			);
		default:
			return null;
	}
};

const CreateStepFin = ({ userID }) => {
	const { bucket: currentBucket } = useContext(CreateBucketContext);
	const currentBucketKV = Object.entries(currentBucket);
	// console.log(currentBucketKV);
	return (
		<>
			{currentBucketKV.map((item, index) =>
				bucketKVMapFunction(item, index, userID)
			)}
		</>
	);
};

export default CreateStepFin;
