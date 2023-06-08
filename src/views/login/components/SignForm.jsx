import { useState } from "react";
import { Button, Form, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "@/api/modules/user";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/globalSlice";
import { useDispatch } from "react-redux";
import { setTabsList } from "@/redux/modules/tabsSlice";
import {
	LockOutlined,
	MailOutlined,
	CheckCircleFilled,
	KeyOutlined,
} from "@ant-design/icons";
import { messageMap, testEmail, testPassword } from "@/utils/accountApis";
import confirm from "antd/lib/modal/confirm";
import FormButton from "./FormButton";
import CaptchaButton from "./CaptchaButton";
import { setEmail } from "@/redux/modules/globalSlice";

const emailValidator = (rule, value) => {
	if (!value) return Promise.reject("请输入邮箱");
	if (!testEmail(value)) {
		Promise.reject("请输入正确的邮箱");
	}
};

const SignForm = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [formType, setFormType] = useState(0);
	const [emailCode, setEmailCode] = useState("");

	const enablelocalTest = () => {
		dispatch(setToken("1")); //测试用
		dispatch(setTabsList([]));
		message.success("登录成功！");
		navigate(HOME_URL);
	};

	const emailCodeValidator = (rule, value) => {
		if (!emailCode) return Promise.reject("请输入验证码");
		else if (emailCode.length !== 6)
			return Promise.reject("验证码长度为6位");
	};
	const passwordValidator = (rule, value) => {
		if (!value) return Promise.reject("请输入密码");
		else if (!testPassword(value)) {
			return Promise.reject(
				"至少包含1个大写字母,1个小写字母和1个数字,长度在6-16位"
			);
		} else if ( formType===1 && value !== form.getFieldValue("confirmPassword"))
			return Promise.reject("两次输入的密码不匹配!");
	};
	const confirmPasswordValidator = (rule, value) => {
		if (!value || value === form.getFieldValue("password")) {
			return Promise.resolve();
		}
		return Promise.reject("两次输入的密码不匹配!");
	};

	// 登录
	const onLogin = async () => {
		// enablelocalTest(); //上线记得删掉
		// return;

		const loginForm = form.getFieldsValue();
		if (!loginForm.email || !loginForm.password) return;
		try {
			setLoading(true);
			const res = await loginApi("/from-email", loginForm);
			console.log(res, "loginres");

			if (res.code === 0) {
				message.error(res.msg);
				return;
			}
			dispatch(setToken(res.data?.token));
			dispatch(setTabsList([]));
			message.success("登录成功！");
			dispatch(setEmail(loginForm.email));
			navigate(HOME_URL);
		} finally {
			setLoading(false);
			form.resetFields();
			setEmailCode("");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "账号成功注册，是否立即登录？",
			icon: <CheckCircleFilled style={{ color: "lightgreen" }} />,
			okText: "登录",
			cancelText: "取消",
			async onOk() {
				onLogin();
			},
			onCancel() {},
		});
	};

	const onRegister = async () => {
		const { email, password, confirmPassword } = form.getFieldsValue();
		if (
			!email ||
			!password ||
			!confirmPassword ||
			emailCode.length !== 6 ||
			password !== confirmPassword ||
			!testEmail(email) ||
			!testPassword(password)
		)
			return;

		try {
			setLoading(true);
			const authCodeRes = await registerApi("/auth-email-code", {
				email: email,
				emailCode: emailCode,
			});
			console.log(authCodeRes, "authCodeRes");
			let ticket = authCodeRes.data.ticket;
			const registerRes = await registerApi(
				"/new-account",
				{
					ticket: ticket,
				},
				{
					password: password,
				}
			);
			console.log(registerRes, "registerRes");

			dispatch(setTabsList([]));
			showConfirm();
		} catch (error) {
			message.error("请检查验证码");
			console.log(error, "注册失败");
		} finally {
			setLoading(false);
            form.resetFields(["confirmPassword"])
			setEmailCode("");
		}
	};

	const onGetCaptcha = async () => {
		const email = form.getFieldValue("email");
		if (!email || !testEmail(email)) {
			message.error("请输入正确的邮箱");
			return;
		}
		let msg = "";
		try {
			const res = await registerApi("/send-email-code", { email: email });
			console.log(res, "sendEmailCode");
			if (res.code == 0) {
				message.error(res.msg);
				return;
			}
			message.success("验证码已发送，请注意查收");
			msg = "success";
		} catch (error) {
			console.log(error, "发送错误");
			msg = "error";
		}
		return msg;
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			size="large"
			autoComplete="off"
		>
			<Form.Item
				name="email"
				rules={[
					{
						validator: emailValidator,
					},
				]}
			>
				<Input
					placeholder="测试邮箱：1552043941@qq.com"
					prefix={<MailOutlined />}
				/>
			</Form.Item>
			<Form.Item
				name="emailCode"
				className="form-code-row"
				style={{
					display: formType === 1 ? "block" : "none",
				}}
				rules={[
					{
						validator: (rule, value) => {
							if (!emailCode)
								return Promise.reject("请输入验证码");
							else if (emailCode.length !== 6)
								return Promise.reject("验证码长度为6位");
						},
					},
				]}
			>
				<Input
					className="form-code-input"
					placeholder="请输入验证码"
					maxLength={6}
					prefix={<KeyOutlined />}
					value={emailCode}
					onChange={(e) => {
						setEmailCode(e.target.value);
						form.validateFields(["emailCode"]);
					}}
				/>
				<CaptchaButton getCaptcha={onGetCaptcha} />
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
					maxLength={16}
					autoComplete="new-password"
					placeholder="测试密码：Admin0"
					prefix={<LockOutlined />}
					onChange={(e) => {
						form.validateFields(["confirmPassword", "password"]);
					}}
				/>
			</Form.Item>

			<Form.Item
				name="confirmPassword"
				dependencies={["password"]}
				style={{
					display: formType === 1 ? "block" : "none",
				}}
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
						form.validateFields(["password", "confirmPassword"]);
					}}
				/>
			</Form.Item>

			<Form.Item className="login-btn-row">
				<FormButton
					formType={formType}
					setFormType={setFormType}
					loading={loading}
					onLogin={onLogin}
					onRegister={onRegister}
				/>
			</Form.Item>
		</Form>
	);
};

export default SignForm;
