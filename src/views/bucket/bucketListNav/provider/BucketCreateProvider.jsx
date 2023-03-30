import React from "react";
const BucketCreateContext = React.createContext();

const BucketCreateProvider = ({ children }) => {
	const [bucket, setBucket] = React.useState({
		name: "",
		visiable: "600",
		encrypt: true,
		tags: [],
	});
	const [current, setCurrent] = React.useState(0);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [createDisabled, setCreateDisabled] = React.useState(true);
	const cleanCreate = () => {
		setBucket({
			visiable: "600",
			name: "",
			encrypt: true,
			tags: [],
			files: [],
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
		<BucketCreateContext.Provider
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
		</BucketCreateContext.Provider>
	);
};

export { BucketCreateContext, BucketCreateProvider };
