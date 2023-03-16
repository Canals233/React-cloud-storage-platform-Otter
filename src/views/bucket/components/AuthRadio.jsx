import { Radio } from "antd";
import React from "react";

const AuthRadio = ({ authValue, radioText, handleRadioChange }) => {
	return (
		<>
			<Radio.Group value={authValue} onChange={handleRadioChange}>
				<Radio value="600"> 私有读写 </Radio>
				<Radio value="644"> 公开读，私有写 </Radio>
				<Radio value="666"> 公开读写 </Radio>
			</Radio.Group>

			<p style={{ fontSize: "12px" }}>
				<span
					style={
						authValue === "600"
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
