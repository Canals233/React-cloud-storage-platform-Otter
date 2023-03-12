import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setTabsList } from "@/redux/modules/tabsSlice";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";
import MoreButton from "./components/MoreButton";
import "./index.less";
const LayoutTabs = (props) => {
    const { tabsList } = props.tabs;
    const { themeConfig } = props.global;
    const { setTabsList } = props;
    const { TabPane } = Tabs;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeValue, setActiveValue] = useState(pathname);
    useEffect(() => {
        addTabs();
    }, [pathname]);
    // click tabs
    const clickTabs = (path) => {
        navigate(path);
    };
    // add tabs
    const addTabs = () => {
        const route = searchRoute(pathname, routerArray);
        let newTabsList = JSON.parse(JSON.stringify(tabsList));
        if (tabsList.every((item) => item.path !== route.path)) {
            newTabsList.push({ title: route.meta.title, path: route.path });
        }
        setTabsList(newTabsList);
        setActiveValue(pathname);
    };
    // delete tabs
    const delTabs = (tabPath) => {
        if (tabPath === HOME_URL)
            return;
        if (pathname === tabPath) {
            tabsList.forEach((item, index) => {
                if (item.path !== pathname)
                    return;
                const nextTab = tabsList[index + 1] || tabsList[index - 1];
                if (!nextTab)
                    return;
                navigate(nextTab.path);
            });
        }
        message.success("你删除了Tabs标签 😆😆😆");
        setTabsList(tabsList.filter((item) => item.path !== tabPath));
    };
    return (<>
			{!themeConfig.tabs && (<div className="tabs">
					<Tabs animated activeKey={activeValue} onChange={clickTabs} hideAdd type="editable-card" onEdit={path => {
                delTabs(path);
            }}>
						{tabsList.map((item) => {
                return (<TabPane key={item.path} tab={<span>
											{item.path == HOME_URL ? <HomeFilled /> : ""}
											{item.title}
										</span>} closable={item.path !== HOME_URL}></TabPane>);
            })}
					</Tabs>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton>
				</div>)}
		</>);
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = { setTabsList };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
