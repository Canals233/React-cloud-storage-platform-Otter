import { Dropdown, message, Modal, Select, Space, Table } from "antd";
import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBucketTagsByBucketId ,selectBucketByBucketId,removeBucketByBucketId} from "@/redux/modules/bucketSlice";
import { removeBucketApi } from "@/api/modules/bucket";
import { PopHover } from "../../components/PopInfo";
import { useRemoveBucketMutation ,useRenameBucketMutation} from "@/redux/modules/apiSlice";

//这个是最后一列的操作

const BucketlistCardActions = ({ bucketId }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const currentBucket = useSelector(selectBucketByBucketId(bucketId));
	const [tags, setTags] = useState(currentBucket.tags);
	const dispatch = useDispatch();
    const [removeBucket,removeRes]=useRemoveBucketMutation()
    const [renameBucket,renameRes]=useRenameBucketMutation()

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
		dispatch(updateBucketTagsByBucketId({ bucketId, tags }));
		message.info(`${currentBucket.name}的标签更新成功`);
		closeModal();
	};

	const items = [
		{ label: <a onClick={onTagsClick}>标签</a>, key: "item-1" }, // 菜单项务必填写 key
		{
			label: <a>清空数据</a>,
			key: "item-2",
		},
		{ label: <a>删除</a>, key: "item-3" },
	];

	const onBucketRemove = () => {
		Modal.confirm({
			title: "二次确认",
			icon: <ExclamationCircleFilled />,
			content: "请再次确认是否删除该存储桶",
			okText: "确定删除",
			okType: "danger",
			cancelText: "取消",
			onOk :async() =>{
				try {
                    const res=await removeBucket(bucketId)
                    console.log(res)
                    removeBucketByBucketId(bucketId)
                } catch (error) {
                    console.error(error)
                }
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

    const onBucketRename=()=>{
    }

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
                <a onClick={onBucketRename}>重命名</a>
				<a onClick={onBucketRemove}>删除存储桶</a>
			</Space>
		</>
	);
};

export default BucketlistCardActions;
