import { Button } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";

const CaptchaButton = ({ getCaptcha }) => {
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		if (count > 0) {
			setTimeout(() => {
				setCount(count - 1);
			}, 1000);
		} else {
			setDisabled(false);
			setCount(0);
		}
	}, [count]);

	return (
		<Button
			className="form-code-btn"
			type="primary"
			disabled={disabled}
			onClick={async () => {
				const resmsg = await getCaptcha();
				if (resmsg == "error") return;
				setDisabled(true);
				setCount(60);
			}}
		>
			{count > 0 ? `${count}秒` : "获取验证码"}
		</Button>
	);
};

export default CaptchaButton;
