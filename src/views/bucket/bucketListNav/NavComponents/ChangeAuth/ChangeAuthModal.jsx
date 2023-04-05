import { Modal } from "antd";
import { useState, useContext } from "react";
import ChangeAuthContent from "./ChangeAuthCotent";

const ChangeAuthModal = ({ open, handleModalClose }) => {
	const [selectedRowBucketIds, setSelectedRowBucketIds] = useState([]);
	const [selectedBuckets, setSelectedBuckets] = useState([]); //快速展示选中的桶
	const [radioValue, setRadioValue] = useState('privateReadWrite'); // 用于控制单选框的值
	//用于传给store的修改方法,这也是要写在这里控制子能变化
	//open控制modal是否打开，handleModalClose控制modal右上方的关闭键和modal内部的取消键
	const handleCancel = () => {
		handleModalClose();
		setSelectedRowBucketIds([]);
		setSelectedBuckets([]);
		setRadioValue('privateReadWrite');
	};
	return (
		<Modal
			title="访问权限管理"
			open={open}
			onCancel={handleCancel}
			footer={[]}
			width={900} 
			height={600} 
			zIndex={999}//低于1005，不然搜索框的下拉框会被遮挡
			style={{
				top: 20,
			}}
		>
			<ChangeAuthContent
				selectedRowBucketIds={selectedRowBucketIds}
				setSelectedRowBucketIds={setSelectedRowBucketIds}
				selectedBuckets={selectedBuckets}
				setSelectedBuckets={setSelectedBuckets}
				onCancel={handleCancel}
				radioValue={radioValue}
				setRadioValue={setRadioValue}
			/>
		</Modal>
	);
};

export default ChangeAuthModal;
