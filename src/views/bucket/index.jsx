import { PageHeader, Tabs } from "antd";

const Bucket = () => {
	const items = [
		{ label: "存储列表", key: "item-1", children: "内容 1" }, // 务必填写 key
		{ label: "数据统计", key: "item-2", children: "内容 2" },
	];

	return (
		<div>
			<PageHeader title={"存储桶列表"} ghost={false} />
            <Tabs  items={items} />
		</div>
	);
};

export default Bucket;
