import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import {
	getCurrentBreadcrumb,
	backToOneBreadcrumb,
} from "@/redux/modules/breadcrumbSlice";
const BreadcrumbNav = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { themeConfig } = useSelector((state) => state.global);

	const currentBreadcrumb = useSelector(getCurrentBreadcrumb);
	console.log(currentBreadcrumb);
	const onBreadClick = (endpath) => {
		navigate(endpath);
		
		dispatch(backToOneBreadcrumb(endpath))
	};
	return (
		<>
			{!themeConfig.breadcrumb && (
				<Breadcrumb>
					<Breadcrumb.Item
						onClick={() => {
							onBreadClick(HOME_URL);
						}}
						href
					>
						首页
					</Breadcrumb.Item>
					{currentBreadcrumb.title.map((item, index) => {
						return (
							<Breadcrumb.Item
								key={item}
								href
								onClick={() => {
									onBreadClick(currentBreadcrumb.path[index]);
								}}
							>
								{item}
							</Breadcrumb.Item>
						);
					})}
				</Breadcrumb>
			)}
		</>
	);
};

export default BreadcrumbNav;
