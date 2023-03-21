import { useLocation } from "react-router-dom";
import BucketDetail from "./bucketDetail/bucketDetail";
import BucketListPage from "./BucketListPage";

const Bucket = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const bucketName = params.get("name");
	console.log(bucketName);
	return (
		<>
			{bucketName ? (
				<BucketDetail bucketName={bucketName} />
			) : (
				<BucketListPage />
			)}
		</>
	);
};

export default Bucket;
