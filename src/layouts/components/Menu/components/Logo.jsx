import logo from "@/assets/images/logo.png";
import { connect } from "react-redux";
const Logo = (props) => {
    const { isCollapse } = props;
    return (<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img"/>
			{!isCollapse ? <h2 className="logo-text">小水濑云科技</h2> : null}
		</div>);
};
const mapStateToProps = (state) => state.menu;
export default connect(mapStateToProps)(Logo);
