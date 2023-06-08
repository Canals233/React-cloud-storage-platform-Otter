import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import "./index.less";
import { useSelector } from "react-redux";
import { getEmail } from "@/redux/modules/globalSlice";
const LayoutHeader = () => {
    const { Header } = Layout;
    const email=useSelector(getEmail)
    return (<Header>
			<div className="header-lf">
				{/* <CollapseIcon /> */}
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				{/* <AssemblySize /> */}
				{/* <Language /> */}
				<Theme />
				<Fullscreen />
				<span className="username">{email}</span>
				<AvatarIcon />
			</div>
		</Header>);
};
export default LayoutHeader;
