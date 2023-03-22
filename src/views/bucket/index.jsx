import { useLocation } from "react-router-dom";
import BucketDetail from "./bucketDetail/bucketDetail";
import BucketListPage from "./BucketListPage";

const Bucket = () => {
	const location = useLocation();
	// console.log(location,'location')

	const bucketName = location.state?.name;
	// console.log(bucketName);
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
