import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const BucketConfigs = ({ anchorType }) => {
	const tagConfigref = useRef(null);
	const publicEnableConfigref = useRef(null);

    useEffect(()=>{
        if(anchorType === "tagsConfig"){
            tagConfigref.current.scrollIntoView({behavior: "smooth"});
        }else if(anchorType === "publicEnableConfig"){
            publicEnableConfigref.current.scrollIntoView({behavior: "smooth"});
        }
    },[])

	return (
		<>
			<div>BucketConfigs</div>
			<div ref={tagConfigref} style={{height:'500px'}} >tagsConfig</div>
			<div ref={publicEnableConfigref} style={{height:'500px'}}>publicEnableConfig</div>
		</>
	);
};

export default BucketConfigs;
