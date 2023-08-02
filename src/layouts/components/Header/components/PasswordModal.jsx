import { useState, useImperativeHandle } from "react";
import { Form, Input, Modal, Row, message } from "antd";
import { useSelector } from "react-redux";
import { getEmail } from "@/redux/modules/globalSlice";
import { PopHover } from "@/components/PopInfo/PopInfo";

import {
	LockOutlined,
	MailOutlined,
	CheckCircleFilled,
	KeyOutlined,
} from "@ant-design/icons";

import { testPassword } from "@/utils/accountApis";
import CaptchaButton from "@/views/login/components/CaptchaButton";
import { utilAPI } from "@/api/modules/user";



const PasswordModal = (props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [emailCode, setEmailCode] = useState("");
	const email = useSelector(getEmail);
	const [form] = Form.useForm();
	const popContent = <div>暂不支持修改绑定邮箱</div>;

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));


    const emailCodeValidator = (rule, value) => {
        if (!emailCode) return Promise.reject("请输入验证码");
        else if (emailCode.length !== 6) return Promise.reject("验证码长度为6位");
    };

	const passwordValidator = (rule, value) => {
		if (!value) return Promise.reject("请输入密码");
		else if (!testPassword(value)) {
			return Promise.reject(
				"至少包含1个大写字母,1个小写字母和1个数字,长度在6-16位"
			);
		} else if (value !== form.getFieldValue("confirmPassword"))
			return Promise.reject("两次输入的密码不匹配!");
	};
	const confirmPasswordValidator = (rule, value) => {
		if (!value || value === form.getFieldValue("password")) {
			return Promise.resolve();
		}
		return Promise.reject("两次输入的密码不匹配!");
	};

	const showModal = (params) => {
		console.log(params);
		form.resetFields();
		setEmailCode("");
		setIsModalOpen(true);
	};

	const onGetCaptcha = async () => {
		try {
			const res = await utilAPI("/send-email-code", { email: email });
			console.log(res, "sendEmailCode");
			message.success("验证码已发送，请注意查收");
		} catch (error) {
			console.log(error, "发送错误");
		}
	};

	const handleOk = async () => {
		const { emailCode, password, confirmPassword } = form.getFieldsValue();
		if (
			!emailCode ||
			!password ||
			!confirmPassword ||
			emailCode.length !== 6 ||
			!testPassword(password) ||
			password !== confirmPassword
		) {
			return;
		}
       
		const authCodeRes = await utilAPI("/auth-email-code", {
			email: email,
			emailCode: emailCode,
		});
		console.log(authCodeRes, "authCodeRes");
		let ticket = authCodeRes.data.ticket;
		const registerRes = await utilAPI("/reset-password", {
			ticket: ticket,
			newPassword: password,
		});
		console.log(registerRes, "registerRes");

		setIsModalOpen(false);
		message.success("修改密码成功 🎉🎉🎉");
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div
			style={{
				zIndex: 9999,
			}}
		>
			<Modal
				title="修改密码"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				destroyOnClose={true}
			>
				<p>
					账号绑定邮箱
					<PopHover content={popContent} />:
					<span
						style={{
							fontWeight: "bold",
						}}
					>
						{email}
					</span>
				</p>
				<Form
					form={form}
					name="basic"
					labelCol={{ span: 5 }}
					initialValues={{ remember: true }}
					size="large"
					autoComplete="off"
				>
					<Form.Item
						name="emailCode"
						initialValue={""}
						rules={[
							{
								validator: emailCodeValidator,
							},
						]}
					>
						<Row>
							<Input
								style={{ width: "76%" }}
								placeholder="请输入验证码"
								maxLength={6}
								prefix={<KeyOutlined />}
								value={emailCode}
								onChange={(e) => setEmailCode(e.target.value)}
							/>
							<CaptchaButton
								style={{ width: "24%" }}
								getCaptcha={onGetCaptcha}
							/>
						</Row>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								validator: passwordValidator,
							},
						]}
					>
						<Input.Password
							autoComplete="new-password"
							placeholder="请输入您的新密码"
							maxLength={16}
							prefix={<LockOutlined />}
							onChange={(e) => {
								form.validateFields([
									"confirmPassword",
									"password",
								]);
							}}
						/>
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						dependencies={["password"]}
						rules={[
							{
								validator: confirmPasswordValidator,
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="请再次输入密码"
							maxLength={16}
							onChange={(e) => {
								form.validateFields([
									"password",
									"confirmPassword",
								]);
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
export default PasswordModal;
