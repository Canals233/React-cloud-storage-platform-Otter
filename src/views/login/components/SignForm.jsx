import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "@/api/modules/user";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/globalSlice";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabsSlice";
import {
	CarryOutOutlined,
	LockOutlined,
	UserAddOutlined,
	UserOutlined,
	CheckCircleFilled,
} from "@ant-design/icons";
import { messageMap, testPassword } from "./signApis";
import confirm from "antd/lib/modal/confirm";

const userIdValidator = (rule, value, callback) => {
	if (!value) return "请输入用户名";
	if (value && (value.length < 6 || value.length > 16)) {
		callback("用户名长度必须在6到16之间");
	}
};
const passwordValidator = (rule, value, cb) => {
	if (!value) return cb("请输入密码");
	if (!testPassword(value)) {
		cb("至少包含1个大写字母,1个小写字母和1个数字,长度在6-16位");
	}
};

const SignForm = (props) => {
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

    
const enablelocalTest = () => {
	setToken("1"); //测试用
	setTabsList([]);
	message.success("登录成功！");
	navigate(HOME_URL);
};

	// 登录
	const onLogin = async () => {
		enablelocalTest(); //上线记得删掉
		return;

		const loginForm = form.getFieldsValue();
		if (!loginForm.userId || !loginForm.password) return;
		try {
			setLoading(true);
			const { data } = await loginApi(loginForm);
			console.log(data, "loginres");
			if (data.result === false) {
				message.error(messageMap(data.errorMsg));
				return;
			}
			setToken(data?.token);
			setTabsList([]);
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
			form.resetFields();
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
		const registerForm = form.getFieldsValue();
		if (!registerForm.userId || !registerForm.password) return;
		if (registerForm.userId.length < 6 || registerForm.userId.length > 16)
			return;
		if (!testPassword(registerForm.password)) return;
		try {
			setLoading(true);
			const { data } = await registerApi(registerForm);
			console.log(data, "registerres");
			if (data.result === false) {
				message.error(messageMap(data.errorMsg));
				return;
			}
			setTabsList([]);

			showConfirm();
			// form.resetFields();
			// navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
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
				name="userId"
				rules={[
					{
						validator: userIdValidator,
					},
				]}
			>
				<Input
					placeholder="测试用户名：admin0"
					prefix={<UserOutlined />}
				/>
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
					placeholder="测试密码：Admin0"
					prefix={<LockOutlined />}
				/>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					type="primary"
					onClick={() => {
						onLogin();
					}}
					loading={loading}
					icon={<CarryOutOutlined />}
				>
					{t("login.confirm")}
				</Button>
				<Button
					onClick={() => {
						onRegister();
					}}
					icon={<UserAddOutlined />}
				>
					{t("login.register")}
				</Button>
			</Form.Item>
		</Form>
	);
};
const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(SignForm);
