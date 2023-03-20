import { Button, Divider, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BucketContext } from "../../provider/BucketProvider";
import CreateStep1 from "./CreateStep1";
import { addBucketList } from "@/redux/modules/bucketSlice";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import CreateStepFin from "./CreateStepFin";
const testUserID = "testID123";
const steps = [
	{
		title: "基本信息",
		content: <CreateStep1 userID={testUserID} />,
	},

	{
		title: "确认配置",
		content: <CreateStepFin userID={testUserID} />,
	},
];

const CreateBucketSteps = () => {
	//从上层传来的取消函数，以及当前进度和设置函数
	const dispatch = useDispatch();

	const {
		bucket,
		current,
		createDisabled,
		setCurrent,
		restartCreate,
	} = useContext(BucketContext);

	const next = () => {
		setCurrent(current + 1);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const finish = () => {
		const formattedDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
		dispatch(
			addBucketList({
				...bucket,
				name: bucket.name + "-" + testUserID,
				time: formattedDate,
				key: nanoid(),
			})
		);
		restartCreate();
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
						disabled={createDisabled}
					>
						下一步
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button type="primary" onClick={finish}>
						创建
					</Button>
				)}
			</div>
		</>
	);
};

export default CreateBucketSteps;
