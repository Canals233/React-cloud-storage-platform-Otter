import React from "react";
const CreateBucketContext = React.createContext();

const CreateBucketProvider = ({ children }) => {
	const [bucket, setBucket] = React.useState({
		visiable: '600',
        name:'',
        createDisabled:true,
	});
    const cleanCreate=()=>{
        setBucket({
            visiable: '600',
            name:'',
            createDisabled:true,
        })
    }
	//用provider 这样就可以在外面存数据了
	return (
		<CreateBucketContext.Provider value={[ bucket, setBucket,cleanCreate ]}>
			{children}
		</CreateBucketContext.Provider>
	);
};

export { CreateBucketContext, CreateBucketProvider };
