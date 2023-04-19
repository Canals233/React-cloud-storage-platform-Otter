import { Dropdown, Input, message, Modal, Select, Space, Table } from "antd";
import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	updateBucketTagsByBucketId,
	selectBucketByBucketId,
	deleteBucketByBucketId,
	renameBucketByBucketId,
} from "@/redux/modules/bucketSlice";
import { deleteBucketApi } from "@/api/modules/bucket";
import { PopHover } from "../../components/PopInfo";
import {
	useDeleteBucketMutation,
	useRenameBucketMutation,
} from "@/redux/modules/apiSlice";

//这个是最后一列的操作

const BucketlistCardActions = ({ bucketId }) => {
	const [tagModalOpen, setTagModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);
	const currentBucket = useSelector(selectBucketByBucketId(bucketId));
	const [tags, setTags] = useState(currentBucket.tags);
	const [newBucketName, setNewBucketName] = useState("");
	const dispatch = useDispatch();
	const [deleteBucket, deleteRes] = useDeleteBucketMutation();
	const [renameBucket, renameRes] = useRenameBucketMutation();

	// console.log(currentBucket)
	const closeTagModal = () => {
		setTagModalOpen(false);
	};
	const onTagsClick = () => {
		setTagModalOpen(true);
	};

	const handleTagsChange = (value) => {
		setTags(value);
	};
	const onTagsOK = () => {
		dispatch(updateBucketTagsByBucketId({ bucketId, tags }));
		message.info(`${currentBucket.name}的标签更新成功`);
		closeTagModal();
	};

	const onRenameClick = () => {
		setNewBucketName("");
		setRenameModalOpen(true);
	};

	const onRenameOK = async () => {
		try {
			const res = await renameBucket({
				bucketId: bucketId,
				bucketName: newBucketName,
			});
			console.log(res);
			if (res.data.errorMsg) {
				message.error(res.data.errorMsg);
				return;
			}
			dispatch(renameBucketByBucketId({ bucketId, newBucketName }));
		} catch (error) {
		} finally {
			setNewBucketName("");
			setRenameModalOpen(false);
		}
	};

	const handleRenameInput = (e) => {
		const newValue = e.target.value;
		setNewBucketName(newValue);
	};

	const items = [
		{ label: <a onClick={onTagsClick}>标签</a>, key: "item-1" }, // 菜单项务必填写 key
		{
			label: <a>清空数据</a>,
			key: "item-2",
		},
		{ label: <a>删除</a>, key: "item-3" },
	];

	const onBucketDelete = () => {
		Modal.confirm({
			title: "删除存储桶",
			icon: <ExclamationCircleFilled />,
			content: "请再次确认是否删除该存储桶",
			okText: "确定删除",
			okType: "danger",
			cancelText: "取消",
			onOk: async () => {
				try {
					const res = await deleteBucket({ bucketId });
					console.log(res);
					deleteBucketByBucketId(bucketId);
				} catch (error) {
					console.error(error);
				}
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<>
			<Modal
				open={tagModalOpen}
				title={"存储桶标签"}
				onCancel={closeTagModal}
				onOk={onTagsOK}
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
			<Modal
				open={renameModalOpen}
				title={
					<>
						<ExclamationCircleFilled
							style={{
								color: "orange",
								fontSize: "20px",
							}}
						/>{" "}
						修改存储桶名称
					</>
				}
				width={400}
				onCancel={() => setRenameModalOpen(false)}
				onOk={onRenameOK}
			>
				<p>当前名称： {currentBucket.name}</p>
				<Input
					placeholder="请输入新的存储桶名称"
					value={newBucketName}
					onChange={handleRenameInput}
					addonAfter={"-" + currentBucket.bucketId}
				/>
			</Modal>

			{/* <Space size="small">
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
			</Space> */}
			<Space size={"small"}>
				<a onClick={onTagsClick}>
					更改标签{" "}
					<PopHover
						content={
							"标签设定暂只在本次登录有效，持久化在加急开发中"
						}
					/>
				</a>
				<a onClick={onRenameClick}>重命名</a>
				<a onClick={onBucketDelete}>删除存储桶</a>
			</Space>
		</>
	);
};

export default BucketlistCardActions;
