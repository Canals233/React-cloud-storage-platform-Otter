import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const BucketConfigs = ({ anchorType }) => {
	const bucketInfoConfigref = useRef(null);
	const publicEnableConfigref = useRef(null);

    useEffect(()=>{
        if(anchorType === "bucketInfoConfigConfig"){
            bucketInfoConfigref.current.scrollIntoView({behavior: "smooth"});
        }else if(anchorType === "publicEnableConfig"){
            publicEnableConfigref.current.scrollIntoView({behavior: "smooth"});
        }
    },[])

	return (
		<>
			<div>存储桶配置</div>
			<div ref={bucketInfoConfigref} style={{height:'500px'}} >存储桶信息</div>
			<div ref={publicEnableConfigref} style={{height:'500px'}}>权限管理</div>
		</>
	);
};

export default BucketConfigs;
