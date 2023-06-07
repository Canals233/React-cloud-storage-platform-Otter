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
			<div>BucketConfigs</div>
			<div ref={bucketInfoConfigref} style={{height:'500px'}} >bucketInfoConfigConfig</div>
			<div ref={publicEnableConfigref} style={{height:'500px'}}>publicEnableConfig</div>
		</>
	);
};

export default BucketConfigs;
