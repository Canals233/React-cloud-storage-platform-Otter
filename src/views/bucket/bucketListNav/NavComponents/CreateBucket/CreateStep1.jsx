import { Form, Input, Radio, Select } from "antd";

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBucketList } from "@/redux/modules/bucketSlice";
import { radioTextMap } from "@/views/bucket/api/bucketApi";
import { CreateBucketContext } from "../../provider/CreateBucketProvider";
import AuthRadio from "@/views/bucket/components/AuthRadio";
import showWarningModal from "@/views/bucket/components/ShowWaringModal";
import { PopHover } from "@/views/bucket/components/PopInfo";

const popContent = <div>属性基加密是小水濑云科技的特色功能</div>;

const CreateStep1 = ({ userID }) => {
	const { bucket, setBucket, setCreateDisabled } =
		useContext(CreateBucketContext);
	const currentBucketlist = useSelector(selectAllBucketList);
	// 定义校验规则
	const [inputError, setInputError] = useState("");
	const [radioText, setRadioText] = useState(
		"只有创建者和授权用户才能对进行读写操作。"
	);

	const hasSameName = (name) => {
		for (let i = 0; i < currentBucketlist.length; i++) {
			if (currentBucketlist[i].name === name) {
				return true;
			}
		}
		return false;
	};

	const handleInputChange = (event) => {
		const value = event.target.value;
		const regex = /^[a-z0-9-]{0,21}$/;
		let createDisabled = true;
		if (value === "") {
			setInputError("输入内容不能为空");
		} else if (!regex.test(value)) {
			setInputError("存储桶名称必须由数字、小写字母和 - 组成");
		} else if (hasSameName(value + "-" + userID)) {
			setInputError("存储桶名称已存在，请重新输入");
		} else {
			setInputError("");
			createDisabled = false;
		}
		setBucket({ ...bucket, name: value });
		setCreateDisabled(createDisabled);
	};
	const handleRadioChange = (event) => {
		const value = event.target.value;
		if (value === "644" || value === "666") {
			showWarningModal(
				"提示",
				"注意：公有读权限可以通过匿名身份直接读取您存储桶中的数据，存在一定的安全风险，为确保您的数据安全，不推荐此配置，建议您选择私有。"
			);
		}
		setRadioText(radioTextMap(value));

		setBucket({ ...bucket, visiable: value });
		// console.log(value, newText);
	};
	const handleTagsChange = (value) => {
		setBucket({ ...bucket, tags: value });
	};

	return (
		<Form>
			<Form.Item
				label="存储桶名"
				required
				validateStatus={inputError ? "error" : ""}
				help={inputError}
			>
				<Input
					value={bucket.name}
					onChange={handleInputChange}
					maxLength={21}
					placeholder="请输入存储桶名称"
					addonAfter={"-" + userID}
				/>
				<p style={{ fontSize: "12px", color: "gray" }}>
					还能输入 {21 - bucket.name.length}{" "}
					个字符,支持小写字母、数字和 -;
					<span style={{ color: "red" }}>创建后名称无法修改!</span>
				</p>
			</Form.Item>
			<Form.Item label="访问权限" style={{ marginLeft: ".75rem" }}>
				<AuthRadio
					authValue={bucket.visiable}
					radioText={radioText}
					handleRadioChange={handleRadioChange}
				/>
			</Form.Item>
			<Form.Item label="存储桶标签" style={{ marginLeft: ".75rem" }}>
				<Select
					mode="tags"
					style={{
						width: "100%",
					}}
					placeholder="Tags Mode"
					onChange={handleTagsChange}
					value={bucket.tags}
				/>
			</Form.Item>
			<Form.Item label="服务端加密" style={{ marginLeft: ".75rem" }}>
				<Radio checked={true}>
					属性基加密{" "}
					<PopHover
						content={popContent}
						style={{
							paddingTop: "0.25rem",
						}}
					/>
				</Radio>
			</Form.Item>
		</Form>
	);
};

export default CreateStep1;
