import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
export const PopHover = ({content, title,placement,style={}}) => {
	return <Popover content={content} title={title} placement={placement} >
		<InfoCircleOutlined
			style={{
				fontSize: "15px",
                ...style
			}}
		/>
	</Popover>;
};
