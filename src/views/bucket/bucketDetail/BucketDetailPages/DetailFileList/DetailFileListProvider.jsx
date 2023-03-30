import React from "react";
const DetailFileListContext = React.createContext();

const DetailFileListProvider = ({ children }) => {
	const [currentSelectedFiles, setCurrentSelectedFiles] = React.useState([]);

	return (
		<DetailFileListContext.Provider
			
		>
			{children}
		</DetailFileListContext.Provider>
	);
};

export { DetailFileListContext, DetailFileListProvider };
