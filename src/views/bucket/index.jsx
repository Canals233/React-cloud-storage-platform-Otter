import { Button, Layout, PageHeader, Tabs, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mockBucketlist } from "@/mock/mockBucketlist";
import {
	selectAllBucketList,
	setBucketList,
} from "@/redux/modules/bucketSlice";
import Bucketlist from "./bucketTab/BucketList/BucketList";
import { useGetBucketListMutation } from "@/redux/modules/apiSlice";
import StatisticsList from "./bucketTab/Statistics/StatisticsList";

const BucketListPage = () => {
	const dispatch = useDispatch();
	//这一段是比较糟糕的代码，注意后面优化，不应该通过引入较大的已有数据来实现
	const bucketList = useSelector(selectAllBucketList);

	useEffect(() => {
		if (bucketList.length === 0) {
			dispatch(setBucketList(mockBucketlist));
		}
	}, []);

	const items = [
		{ label: "存储列表", key: "item-1", children: <Bucketlist /> }, // 务必填写 key
		{ label: "数据统计", key: "item-2", children: <StatisticsList /> },
	];

	return (
		<>
			<PageHeader
				title={"存储桶列表"}
				ghost={false}
				style={{ padding: "2px 24px" }}
			/>
			<div >
				<Tabs items={items} tabBarStyle={{ marginBottom: 24 }} />
			</div>
		</>
	);
};

export default BucketListPage;
