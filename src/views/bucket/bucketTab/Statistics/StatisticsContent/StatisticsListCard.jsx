import {  Table, message } from "antd";

import { useGetBucketListMutation } from "@/redux/modules/apiSlice";
import { useEffect } from "react";
import { formatFileSize } from "@/utils/util";

const testData = [
	{
		bucketId: 1,
		name: "testBucket1",
		size: 200,
		externalDownloadedTraffic: 0,
		readReq: 0,
		writeReq: 0,
	},
	{
		bucketId: 2,
		name: "testBucket2",
		size: 500,
		externalDownloadedTraffic: 0,
		readReq: 0,
		writeReq: 0,
	},
	{
		bucketId: 3,
		name: "testBucket3",
		size: 900,
		externalDownloadedTraffic: 0,
		readReq: 0,
		writeReq: 0,
	},
	{
		bucketId: 4,
		name: "testBucket4",
		size: 700,
		externalDownloadedTraffic: 0,
		readReq: 0,
		writeReq: 0,
	},
];

const StatisticsListCard = ({ TableData }) => {
	const StatisticsListColumns = [
		{
			title: "存储桶名称",
			dataIndex: "name",
			key: "name",
			sorter: (a, b) => {
				if (a.name === b.name) return 0;
				return a.name > b.name ? 1 : -1;
			},
		},
		{
			title: "存储用量",
			dataIndex: "storageUsed",
			key: "storageUsed",
			sorter: (a,b)=>{
                if(a.size===b.size) return 0;
                return a.size>b.size?1:-1;
            },
            render:(text,record)=>formatFileSize(text)
		},
		{
			title: "外网下行流量",
			dataIndex: "externalDownloadedTraffic",
			key: "externalDownloadedTraffic",
			sorter: (a,b)=>{
                if(a.externalDownloadedTraffic===b.externalDownloadedTraffic) return 0;
                return a.externalDownloadedTraffic>b.externalDownloadedTraffic?1:-1;
            },
		},
		{
			title: "读请求数",
			dataIndex: "readReq",
			key: "readReq",
			sorter: (a,b)=>{
                if(a.readReq===b.readReq) return 0;
                return a.readReq>b.readReq?1:-1;
            },
		},
		{
			title: "写请求数",
			dataIndex: "writeReq",
			key: "writeReq",
			sorter: (a,b)=>{
                if(a.writeReq===b.writeReq) return 0;
                return a.writeReq>b.writeReq?1:-1;
            },
		},
	];
	const [getBucketList, data] = useGetBucketListMutation();

	const { data: getBucketListResult, isLoading, isError, isSuccess } = data;
	const currentListData = getBucketListResult?.data.map((item) => {
		return {
			...item,
			tags: [],
		};
	});

	useEffect(() => {
		// getBucketList();
		// 本地测试用
	}, []);

	console.log(data, "get res");
	if (isLoading) {
		message.loading("正在加载", 0);
	} else if (isError) {
		message.destroy();
		message.error("加载失败", 0.5);
	} else if (isSuccess) {
		message.destroy();
		message.success("加载成功", 0.5);
		if (currentListData) {
			console.log(currentListData);
		}
	}
	// console.log(TableData, getBucketListResult, "TableData,bucketListData");

	// 排序时候要注意，antd4的排序的参数是整行的数据对象，而不是单个数据，要访问属性后排序

	return (
		<>
			<Table
				dataSource={testData}
				rowKey={"bucketId"}
				loading={isLoading}
				columns={StatisticsListColumns}
			></Table>
		</>
	);
};

export default StatisticsListCard;
