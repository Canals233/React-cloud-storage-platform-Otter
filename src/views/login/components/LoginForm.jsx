import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi,registerApi } from "@/api/modules/user";

import { connect } from "react-redux";
import { setToken } from "@/redux/modules/globalSlice";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabsSlice";
import {
	UserOutlined,
	LockOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
const LoginForm = (props) => {
	const { t } = useTranslation();
	const { setToken, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	// 登录
	const onFinish = async (loginForm) => {
      
		try {
			setLoading(true);

			const { data } = await loginApi(loginForm);
			console.log(data,'loginres');
			setToken(data?.access_token);
			setTabsList([]);
			message.success("登录成功！");
			// navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const onRegister = async () => {
        const registerForm = form.getFieldsValue()
        try {
            setLoading(true);
            const { data } = await registerApi(registerForm);
            console.log(data);
            setToken(data?.access_token);
            setTabsList([]);
            message.success("注册成功！");
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
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item
				name="userId"
				rules={[{ required: true, message: "请输入用户名" }]}
			>
				<Input
					placeholder="用户名：admin / user"
					prefix={<UserOutlined />}
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "请输入密码" }]}
			>
				<Input.Password
					autoComplete="new-password"
					placeholder="密码：123456"
					prefix={<LockOutlined />}
				/>
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
					icon={<UserOutlined />}
				>
					{t("login.confirm")}
				</Button>
				<Button
					onClick={() => {
                        onRegister();
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.register")}
				</Button>
			</Form.Item>
		</Form>
	);
};
const mapDispatchToProps = { setToken, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
