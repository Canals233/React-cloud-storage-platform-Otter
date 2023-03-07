import { connect } from "react-redux";
import "./index.less";
const LayoutFooter = (props) => {
    const { themeConfig } = props;
    return (<>
			{!themeConfig.footer && (<div className="footer">
					<a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
						2022 © Hooks-Admin By Hooks Technology.
					</a>
				</div>)}
		</>);
};
const mapStateToProps = (state) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
