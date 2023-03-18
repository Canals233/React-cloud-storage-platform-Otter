import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React from "react";
const CreateBucketTags = () => {
	const [tagsMap, setTagsMap] = React.useState({});

	return (
		<Form name="dynamic_form_nest_item" autoComplete="off">
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
							<Form.Item name={["tagorigin", "key"]}>
								<Input placeholder="请输入标签键" />
							</Form.Item>
							<Form.Item name={["tagorigin", "value"]}>
								<Input placeholder="请输入标签名" />
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
								<Form.Item {...restField} name={[name, "key"]}>
									<Input placeholder="请输入标签键" />
								</Form.Item>
								<Form.Item {...restField} name={[name, "last"]}>
									<Input placeholder="请输入标签名" />
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
