import { Modal } from "antd";
import { useState, useContext } from "react";
import ChangeAuthContent from "./ChangeAuthCotent";

const ChangeAuthModal = ({ open, handleModalClose }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedBuckets, setSelectedBuckets] = useState([]); //快速展示选中的桶
	//用于传给store的修改方法,这也是要写在这里控制子能变化
	//open控制modal是否打开，handleModalClose控制modal右上方的关闭键和modal内部的取消键
	const handleCancel = () => {
		handleModalClose();
		setSelectedRowKeys([]);
        setSelectedBuckets([]);
	};
	return (
		<Modal
			title="访问权限管理"
			open={open}
			onCancel={handleCancel}
			footer={[]}
			width={900} // 设置宽度为 800px
			height={800} // 设置高度为 600px
			zIndex={10001}
		>
			<ChangeAuthContent
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
                selectedBuckets={selectedBuckets}
                setSelectedBuckets={setSelectedBuckets}
				onCancel={handleCancel}
			/>
		</Modal>
	);
};

export default ChangeAuthModal;
