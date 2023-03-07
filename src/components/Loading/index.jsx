import { Spin } from "antd";
import "./index.less";
const Loading = ({ tip = "Loading" }) => {
    return <Spin tip={tip} size="large" className="request-loading"/>;
};
export default Loading;
