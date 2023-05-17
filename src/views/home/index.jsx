import { Card, PageHeader, Row } from "antd";
import NestedCard from "@/components/NestedCard/NestedCard.jsx";
// import "./index.less";
import { mainChildren, bucketChildren } from "@/mock/overviewChildren";

const Home = () => {
	return (
		<>
			<PageHeader title={"概览"} ghost={false} />
			<Card title="用量概览">
				<NestedCard children={mainChildren}></NestedCard>
			</Card>

			<Card title="基本使用统计" style={{ paddingTop: "1.5rem" }}>
				<NestedCard children={bucketChildren}></NestedCard>
			</Card>
		</>
	);
};
export default Home;
