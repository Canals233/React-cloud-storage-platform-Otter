import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React from "react";
const CreateBucketTags = () => {
	const onFinish = (values) => {
		console.log("Received values of form:", values);
	};
	return (
		<Form
			name="dynamic_form_nest_item"
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.List name="users">
				{(fields, { add, remove }) => (
					<>
						
							<Space
								key={"tagorigin"}
								style={{
									display: "flex",
                                    paddingRight: "1.375rem",
								}}
								align="baseline"
							>
								<Form.Item name={["tagorigin", "first"]}>
									<Input placeholder="First Name" />
								</Form.Item>
								<Form.Item name={["tagorigin", "last"]}>
									<Input placeholder="Last Name" />
								</Form.Item>
								<PlusOutlined onClick={() => add()} />
								
							</Space>
						
						{/* fields用于通过map创建多个表单项  */}
						{fields.map(({ key, name, ...restField }) => (
							<Space
								key={key}
								style={{
									display: "flex",
									marginBottom: 8,
								}}
								align="baseline"
							>
								<Form.Item
									{...restField}
									name={[name, "first"]}
								>
									<Input placeholder="First Name" />
								</Form.Item>
								<Form.Item {...restField} name={[name, "last"]}>
									<Input placeholder="Last Name" />
								</Form.Item>
								<PlusOutlined onClick={() => add()} />
								<MinusOutlined onClick={() => remove(name)} />
							</Space>
						))}
						
					</>
				)}
			</Form.List>
		</Form>
	);
};
export default CreateBucketTags;
