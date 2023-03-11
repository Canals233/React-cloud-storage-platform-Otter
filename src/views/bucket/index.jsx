import { PageHeader, Tabs } from "antd";
import Bucketlist from "./bucketChildren/BucketList";


//下面的代码记得放在BucketList里面，现在是因为Tabs的渲染问题在另一个文件写热更新不了才这样写

//上面的代码记得放在BucketList里面，现在是因为Tabs的渲染问题在另一个文件写热更新不了才这样写

const Bucket = () => {
	const items = [
		{ label: "存储列表", key: "item-1", children: <Bucketlist /> }, // 务必填写 key
		{ label: "数据统计", key: "item-2", children: "内容 2" },
	];

	return (
		<div>
			<PageHeader title={"存储桶列表"} ghost={false} />
			<Tabs items={items} />
		</div>
	);
};

export default Bucket;
