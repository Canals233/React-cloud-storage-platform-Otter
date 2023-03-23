import { useLocation } from "react-router-dom";
import BucketDetail from "./bucketDetail/BucketDetail";
import { BucketDetailProvider } from "./bucketDetail/provider/BucketDetailProvider";
import BucketListPage from "./BucketListPage";

const Bucket = () => {
	const location = useLocation();
	// console.log(location,'location')
	const params = new URLSearchParams(location.search);
	const bucketName = params.get("name");
	const anchorType = params.get("anchorType");

	const BucketDetailWithProvider = () => {
		return <BucketDetailProvider>
			<BucketDetail bucketName={bucketName} anchorType={anchorType} />
		</BucketDetailProvider>;
	};

	const RenderContent = () => {
		if (bucketName) {
			return <BucketDetailWithProvider />;
		} else {
			return <BucketListPage />;
		}
	};
   
	return (
		<>
			<RenderContent />
		</>
	);
};

export default Bucket;
