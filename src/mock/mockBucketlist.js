import { nanoid } from "nanoid";

export const mockBucketlist = [
	{
		key: "1",
		name: "John",
		visiable: "600",
		time: "2023-03-09 16:19:02",
		tags: [],
		files: [],
	},
	{
		key: "2",
		name: "Jim",
		visiable: "666",
		time: "2023-03-09 16:17:54",
		tags: [],
		files: [],
	},

	{
		key: "3",
		name: "canals",
		visiable: "644",
		time: "2023-03-08 16:28:21",
		tags: [],
		files: [
			{
                id: nanoid(),
				name: "test",
				type: "file",
				size: "1.2M",
				time: "2023-03-07 16:30:21",
			},
			{
                id: nanoid(),
				name: "testFolder",
				type: "folder",
                size:'-',
                time:'-',
			},
		],
	},
	{
		key: "4",
		name: "Joe",
		visiable: "644",
		time: "2023-03-07 16:28:21",
		tags: [],
		files: [
			{
				id: nanoid(),
				name: "test",
				type: "file",
				size: "1.2M",
				time: "2023-03-07 16:30:21",
			},
			{
                id: nanoid(),
				name: "testFolder",
				type: "folder",
                size:'-',
                time:'-',
			},
		],
	},
];
