import { Card } from "antd";
import React from "react";
import "./NestedCard.less";
/**
 * @param {Array} children
 *@description 在Card组件里使用，创建Gird来存Card
 *
 */

const NestedCard = React.memo(({ children }) => {
	const DestrustChildren = (children) => {
		const GridArr = new Array(children.length).fill(0);
		return GridArr.map((item, index) => {
			const { title, intense, intenseUnit, content } = children[index];
			return (
				// <Card.Grid  hoverable={false} className="costom-grid">
				<Card bordered={false} title={title} className="costom-grid">
					<div className="childCard">
						<div className="intense">
							{intense}
							<span className="intense-unit">{intenseUnit}</span>
						</div>
						<div className="content">{content}</div>
					</div>
				</Card>
				// </Card.Grid>
			);
		});
	};

	return (
		<div style={{ display: "flex" }}>{...DestrustChildren(children)}</div>
	);
});

export default NestedCard;
