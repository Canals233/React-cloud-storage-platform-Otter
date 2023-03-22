import logo from "@/assets/images/logo.png";
import { useSelector } from "react-redux";
import { getCollapse } from "@/redux/modules/menuSlice";
const Logo = () => {
	const isCollapse = useSelector(getCollapse);

	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">小水濑云科技</h2> : null}
		</div>
	);
};

export default Logo;
