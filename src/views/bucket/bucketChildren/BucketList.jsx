import { Button, Card, Col, Row, Space } from "antd";
import React from "react";

const Bucketlist = () => {
	return (
		<>
			<Row>
				<Col span={8}>
					<Space size={8}>
						<Button type="primary">创建存储桶</Button>
						<Button type="default">存储权限管理</Button>
					</Space>
				</Col>
                {/* <Col span={8}>
					<Space size={8}>
						<Button type="primary">创建存储桶</Button>
						<Button type="default">存储权限管理</Button>
					</Space>
				</Col> */}
			</Row>
			<Card>Hello 222l1</Card>
		</>
	);
};

export default Bucketlist;
