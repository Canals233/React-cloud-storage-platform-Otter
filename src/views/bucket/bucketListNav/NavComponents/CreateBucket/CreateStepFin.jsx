import React, { useContext } from "react";
import { BucketCreateContext } from "../../provider/BucketCreateProvider";
import { publicEnableRenderMap } from "@/views/bucket/api/bucketApi";
import { PopHover } from "@/components/PopInfo/PopInfo";
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
		case "publicWriteEnable":
			return (
				<div key={index}>
					<span style={listStyle.key}>{"允许公开写"}</span>
					<span style={item[1] ? { color: "red" } : {}}>
						{item[1] ? "是" : "否"}
					</span>
				</div>
			);
		case "publicReadEnable":
			return (
				<div key={index}>
					<span style={listStyle.key}>{"允许公开读"}</span>
					<span style={item[1] ? { color: "red" } : {}}>
						{item[1] ? "是" : "否"}
					</span>
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
	const { bucket: currentBucket } = useContext(BucketCreateContext);
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
