import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
//这个是最后一列的操作
const BucketlistCardActions = () => {
	const items = [
		{ label: <a href="https://www.antgroup.com">标签</a>, key: "item-1" }, // 菜单项务必填写 key
		{
			label: <a href="https://www.antgroup.com">清空数据</a>,
			key: "item-2",
		},
		{ label: <a href="https://www.antgroup.com">删除</a>, key: "item-3" },
	];

	return (
		<>
			<Space size="small">
				<a>信息监控</a>
				<a>数据管理</a>
				<Dropdown

					menu={{
						items,
					}}
					trigger={["click"]}
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space>
							更多
							<DownOutlined />
						</Space>
					</a>
				</Dropdown>
			</Space>
		</>
	);
};

export default BucketlistCardActions;