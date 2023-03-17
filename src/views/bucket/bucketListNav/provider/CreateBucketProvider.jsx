import React from "react";
const CreateBucketContext = React.createContext();

const CreateBucketProvider = ({ children }) => {
	const [bucket, setBucket] = React.useState({
		visiable: "600",
		name: "",
		createDisabled: true,
	});
	const [current, setCurrent] = React.useState(0);
	const [modalOpen, setModalOpen] = React.useState(false);
	const cleanCreate = () => {
		setBucket({
			visiable: "600",
			name: "",
			createDisabled: true,
		});
	};
	const restartCreate = () => {
		setModalOpen(false);
		setCurrent(0);
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
				cleanCreate,
				restartCreate,
			}}
		>
			{children}
		</CreateBucketContext.Provider>
	);
};

export { CreateBucketContext, CreateBucketProvider };
