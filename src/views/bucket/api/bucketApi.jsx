import dayjs from "dayjs";

export const publicEnableRenderMap = (publicWriteEnable,publicReadEnable) => {
	let publicEnableStr = "";
    if(publicReadEnable && publicWriteEnable){
        publicEnableStr = "公开读写";
    }else if(publicReadEnable && !publicWriteEnable){
        publicEnableStr = "公开读，私有写";
    }else if(!publicReadEnable && !publicWriteEnable){
        publicEnableStr = "私有读写";
    }
	return <>{publicEnableStr}</>;
};

export  const getPublicEnableString = (publicWriteEnable,publicReadEnable) => {
    let publicEnableStr = "";
    if(publicReadEnable && publicWriteEnable){
        publicEnableStr = "publicReadWrite";
    }else if(publicReadEnable && !publicWriteEnable){
        publicEnableStr = "publicReadPrivateWrite";
    }else if(!publicReadEnable && !publicWriteEnable){
        publicEnableStr = "privateReadWrite";
    }
    return publicEnableStr;
}

export const getPublicEnableObject = (publicEnableStr) => {
    let publicEnableObject = {
        publicWriteEnable: false,
        publicReadEnable: false,
    };
    switch (publicEnableStr) {
        case "privateReadWrite":
            
            break;
        case "publicReadPrivateWrite":
            publicEnableObject.publicReadEnable = true;
            break;
        case"publicReadWrite":
            publicEnableObject.publicReadEnable = true;
            publicEnableObject.publicWriteEnable = true;
            break;
    }
    return publicEnableObject;
}

export const radioTextMap = (publicEnableStr) => {
	let newText = "";
	//和linux的读写权限一样
    
	switch (publicEnableStr) {
	case "privateReadWrite":
		newText = "只有创建者和授权用户才能对进行读写操作。";
		break;
	case "publicReadPrivateWrite":
		newText = "所有人都可以读取，但只有创建者和授权用户才能写入";
		break;
	case"publicReadWrite":
		newText = "所有人都可以读取和写入";
		break;
}
	return newText;
};

