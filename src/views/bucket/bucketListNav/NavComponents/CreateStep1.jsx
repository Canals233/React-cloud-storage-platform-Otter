import { Form, Input, Radio } from "antd";
import { useState } from "react";

const CreateStep1 = ({ userID }) => {
	// 定义校验规则
	const [inputValue, setInputValue] = useState("");
	const [inputError, setInputError] = useState("");
	const [radioValue, setRadioValue] = useState("私有读写");
	const [radioText, setRadioText] = useState(
		"只有创建者和授权用户才能对进行读写操作。"
	);
	//下面的代码还没写已经同名的情况
	//下面的代码还没写已经同名的情况
	//下面的代码还没写已经同名的情况
	const handleInputChange = (event) => {
		const value = event.target.value;
		const regex = /^[a-z0-9-]{0,21}$/;
		if (value === "") {
			setInputValue(value);
			setInputError("输入内容不能为空");
		} else if (!regex.test(value)) {
			setInputValue(value);
			setInputError("存储桶名称必须由数字、小写字母和 - 组成");
		} else {
			setInputValue(value);
			setInputError("");
		}
	};
	const handleRadioChange = (event) => {
		const value = event.target.value;
		let newText = "";
		setRadioValue(value);
		if (value === "私有读写") {
			newText = "只有创建者和授权用户才能对进行读写操作。";
		} else if (value === "公有读，私有写") {
			newText = "所有人都可以读取，但只有创建者和授权用户才能写入";
		} else if (value === "公有读写") {
			newText = "所有人都可以读取和写入";
		}

		setRadioText(newText);
		console.log(value, newText);
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
					value={inputValue}
					onChange={handleInputChange}
					maxLength={21}
					placeholder="请输入存储桶名称"
					addonAfter={"" + userID}
				/>
				<p style={{ fontSize: "12px", color: "gray" }}>
					还能输入 {21 - inputValue.length}{" "}
					个字符,支持小写字母、数字和 -;
					<span style={{ color: "red" }}>创建后名称无法修改!</span>
				</p>
			</Form.Item>
			<Form.Item label="访问权限" style={{ marginLeft: ".75rem" }}>
				<Radio.Group value={radioValue} onChange={handleRadioChange}>
					<Radio value="私有读写"> 私有读写 </Radio>
					<Radio value="公有读，私有写"> 公有读，私有写 </Radio>
					<Radio value="公有读写"> 公有读写 </Radio>
				</Radio.Group>

				<p style={{ fontSize: "12px" }}>
					<span
						style={
							radioValue === "私有读写"
								? { color: "gray" }
								: { color: "red" }
						}
					>
						{radioText}
					</span>
				</p>
			</Form.Item>
		</Form>
	);
};

export default CreateStep1;