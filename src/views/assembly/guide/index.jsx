import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { Button, Alert } from "antd";
import steps from "./steps";
const Guide = () => {
    const driver = new Driver({
        animate: true,
        opacity: 0.75,
        doneBtnText: "结束",
        closeBtnText: "关闭",
        nextBtnText: "下一步",
        prevBtnText: "上一步" // 此步骤的上一个按钮文本
    });
    const guide = () => {
        driver.defineSteps(steps);
        driver.start();
        console.log(driver, "driver");
    };
    return (<div className="card content-box">
			<Alert message="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js." style={{ width: "100%" }} type="warning"/>
			<div style={{ margin: "15px auto" }}>
				<Button type="primary" id="antd-button" onClick={guide}>
					打开引导页 🤹‍♂️
				</Button>
			</div>
		</div>);
};
export default Guide;
