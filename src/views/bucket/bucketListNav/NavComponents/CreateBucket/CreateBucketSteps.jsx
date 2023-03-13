import { Button, Divider, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { CreateBucketContext } from "../../provider/CreateBucketProvider";
import CreateStep1 from "./CreateStep1";
const steps = [
	{
		title: "First",
		content: <CreateStep1 userID={"-testID123"} />,
	},
	{
		title: "Second",
		content: "Second-content",
	},
	{
		title: "Last",
		content: "Last-content",
	},
];

const CreateBucketSteps = ({ restartCreate, current, setCurrent }) => {
	//从上层传来的取消函数，以及当前进度和设置函数
	const [bucket, setBucket] = useContext(CreateBucketContext);
	const [disabled, setDisabled] = useState(true);
	useEffect(() => {
		setDisabled(bucket.createDisabled);
		// console.log(bucket)
	}, [bucket.createDisabled]);
	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	return (
		<>
			<Steps current={current} items={items} />
			<Divider />
			<div className="steps-content" style={{ marginBottom: "1.25rem" }}>
				{steps[current].content}
			</div>
			<div className="steps-action" style={{ textAlign: "center" }}>
				{current === 0 && (
					<Button
						style={{
							margin: "0 8px",
						}}
						type="default"
						onClick={restartCreate}
					>
						取消
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{
							margin: "0 8px",
						}}
						onClick={() => prev()}
					>
						上一步
					</Button>
				)}
				{current < steps.length - 1 && (
					<Button
						type="primary"
						onClick={() => next()}
						disabled={disabled}
					>
						下一步
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" onClick={restartCreate}>
						创建
					</Button>
				)}
			</div>
		</>
	);
};

export default CreateBucketSteps;
