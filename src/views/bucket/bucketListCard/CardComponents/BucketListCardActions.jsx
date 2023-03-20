import { Dropdown, message, Modal, Select, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBucketByKey } from "@/redux/modules/bucketSlice";
import { updateBucketTagsByKey } from "../../../../redux/modules/bucketSlice";

//这个是最后一列的操作

const BucketlistCardActions = ({ bucketKey }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const currentBucket = useSelector(selectBucketByKey(bucketKey));
	const [tags, setTags] = useState(currentBucket.tags);
	const dispatch = useDispatch();
	// console.log(currentBucket)
	const closeModal = () => {
		setModalOpen(false);
	};
	const onTagsClick = () => {
		setModalOpen(true);
	};

	const handleTagsChange = (value) => {
		setTags(value);
	};
	const onOKClick = () => {
		dispatch(updateBucketTagsByKey({ bucketKey, tags }));
        message.info( `${currentBucket.name}的标签更新成功`);
		closeModal();
	};

	const items = [
		{ label: <a onClick={onTagsClick}>标签</a>, key: "item-1" }, // 菜单项务必填写 key
		{
			label: <a href="https://www.antgroup.com">清空数据</a>,
			key: "item-2",
		},
		{ label: <a href="https://www.antgroup.com">删除</a>, key: "item-3" },
	];

	return (
		<>
			<Modal
				open={modalOpen}
				title={"存储桶标签"}
				onCancel={closeModal}
				onOk={onOKClick}
				centered
				maskClosable={false}
			>
				<Select
					mode="tags"
					style={{
						width: "100%",
					}}
					placeholder="请输入标签，重复输入或点击选择将取消"
					onChange={handleTagsChange}
					value={tags}
				/>
			</Modal>

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
