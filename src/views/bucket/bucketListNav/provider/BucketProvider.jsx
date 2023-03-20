import React from "react";
const CreateBucketContext = React.createContext();

const CreateBucketProvider = ({ children }) => {
	const [bucket, setBucket] = React.useState({
        name: "",
		visiable: "600",
        encrypt:true,
        tags:[]
	});
	const [current, setCurrent] = React.useState(0);
	const [modalOpen, setModalOpen] = React.useState(false);
    const [createDisabled, setCreateDisabled] = React.useState(true);
	const cleanCreate = () => {
		setBucket({
			visiable: "600",
			name: "",
            encrypt:true,
            tags:[]
		});
	};
	const restartCreate = () => {
		setModalOpen(false);
		setCurrent(0);
        setCreateDisabled(true);
		cleanCreate();
	};
	//用provider 这样就可以在外面存数据了
	return (
		<CreateBucketContext.Provider
			value={{
				bucket,
				setBucket,
				current,
				setCurrent,
				modalOpen,
				setModalOpen,
                createDisabled,
                setCreateDisabled,
				cleanCreate,
				restartCreate,

			}}
		>
			{children}
		</CreateBucketContext.Provider>
	);
};

export { CreateBucketContext, CreateBucketProvider };
