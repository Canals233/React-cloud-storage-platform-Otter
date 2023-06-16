import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("123456789", 10);
export const mockBucketlist = [
	{
		bucketId: "1",
		name: "John",
		publicWriteEnable: false,
		publicReadEnable: false,
		time: "2023-03-09 16:19:02",
		tags: [],
		files: [],
	},
	{
		bucketId: "2",
		name: "Jim",
		publicWriteEnable: false,
		publicReadEnable: true,
		time: "2023-03-09 16:17:54",
		tags: [],
		files: [],
	},

	{
		bucketId: "3",
		name: "canals",
		publicWriteEnable: true,
		publicReadEnable: true,
		time: "2023-03-08 16:28:21",
		tags: [],
		files: [],
	},
	{
		bucketId: "4",
		name: "Joe",
		publicWriteEnable: true,
		publicReadEnable: true,
		time: "2023-03-07 16:28:21",
		tags: [],
		files: [],
	},
];
