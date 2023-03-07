import { connect } from "react-redux";
import "./index.less";
const LayoutFooter = (props) => {
    const { themeConfig } = props;
    return (<>
			{!themeConfig.footer && (<div className="footer">
					Powered by React & Antd & Vite & Electron 
				</div>)}
		</>);
};
const mapStateToProps = (state) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
