import React from "react";
import { useTranslation } from "react-i18next";
import { CarryOutOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
const FormButton = ({
	formType,
	setFormType,
	loading,
	onLogin,
	onRegister,
}) => {
	const { t } = useTranslation();
	const getFormObject = () => {
		if (formType === 0) {
			return {
				icon: <CarryOutOutlined />,
				text: t("login.confirm"),
				subtext: "没有账户？点击这里注册",
				func: onLogin,
				nextType: 1,
			};
		}
		return {
			icon: <UserAddOutlined />,
			text: t("login.register"),
			subtext: "已有账户？点击这里登录",
			func: onRegister,
			nextType: 0,
		};
	};
	let { icon, text, subtext, func, nextType } = getFormObject();
	return (
		<>
			<Button
				className="form-button"
				type="primary"
				onClick={() => {
					func();
				}}
				loading={loading}
				icon={icon}
			>
				{text}
			</Button>
			<div className="form-subtext" onClick={() => setFormType(nextType)}>
				{" "}
				{subtext}{" "}
			</div>
		</>
	);
};

export default FormButton;
