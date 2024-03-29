import logo from "@/assets/images/logo.png";
import { useSelector } from "react-redux";
import { getIsCollapse } from "@/redux/modules/menuSlice";
const Logo = () => {
	const isCollapse = useSelector(getIsCollapse);

	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">小水獭云科技</h2> : null}
		</div>
	);
};

export default Logo;
