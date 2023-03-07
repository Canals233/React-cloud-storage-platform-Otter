export default function SvgIcon(props) {
    const { name, prefix = "icon", iconStyle = { width: "100px", height: "100px" } } = props;
    const symbolId = `#${prefix}-${name}`;
    return (<svg aria-hidden="true" style={iconStyle}>
			<use href={symbolId}/>
		</svg>);
}
