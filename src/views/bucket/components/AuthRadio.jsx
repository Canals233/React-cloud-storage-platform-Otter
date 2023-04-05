import { Radio } from "antd";
import React from "react";

const AuthRadio = ({ authValue, radioText, handleRadioChange }) => {
	return (
		<>
			<Radio.Group value={authValue} onChange={handleRadioChange}>
				<Radio value="privateReadWrite"> 私有读写 </Radio>
				<Radio value="publicReadPrivateWrite"> 公开读，私有写 </Radio>
				<Radio value="publicReadWrite"> 公开读写 </Radio>
			</Radio.Group>

			<p style={{ fontSize: "12px" }}>
				<span
					style={
						authValue === "privateReadWrite"
							? { color: "gray" }
							: { color: "red" }
					}
				>
					{radioText}
				</span>
			</p>
		</>
	);
};

export default AuthRadio;
