import { Select } from "antd";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBucketList } from "@/redux/modules/bucketSlice";
const selectModes = [
	{
		value: "name",
		label: "按名称搜索",
	},
	{
		value: "tag",
		label: "按标签搜索",
	},
];

const SelectBucket = ({
	searchFunction,
	showSearchMode = true,
	searchBarStyle = {},
	setResult,
}) => {
	const currentBuckets = useSelector(selectAllBucketList);
	const namesoptions = useMemo(
		() =>
			currentBuckets.map((item) => ({
				value: item.name,
				label: item.name,
			})),
		[currentBuckets]
	);
	const tagsOptions = useMemo(() => {
		return currentBuckets
			.map((item) => {
				return item.tags.map((tag) => ({
					value: tag,
					label: tag,
				}));
			})
			.filter((item) => item.length > 0)
			.flat();
	}, [currentBuckets]);

	//从上层传来的，前端直接修改展示的数据
	const [searchValue, setSearchValue] = useState(null);
	const [searchMode, setSearchMode] = useState("name");
	const [searchOptions, setSearchOptions] = useState(namesoptions);
	const [placeholder, setPlaceholder] = useState("请输入存储桶名称");
	const handleSearchChange = (value) => {
		setSearchValue(value);
	};
	const handleModeChange = (value) => {
		setSearchMode(value);
		if (value === "name") {
			setPlaceholder("请输入存储桶名称");
			setSearchOptions(namesoptions);
		} else {
			setPlaceholder("请输入标签");
			setSearchOptions(tagsOptions);
		}
	};

	let handleSearchResult = (searchValue) => {
		if (searchValue === "") {
			setResult(currentBuckets);
			return;
		}
		let newBucketList;
		if (searchMode === "name") {
			newBucketList = currentBuckets.filter((item) =>
				item.name.includes(searchValue)
			);
		} else {
			newBucketList = currentBuckets.filter((item) =>
				item.tags.includes(searchValue)
			);
		}
		setResult(newBucketList);
	};
	if (typeof searchFunction === "function") {
		handleSearchResult = searchFunction;
	}

	return (
		<>
			<Select
				value={searchMode}
				style={{
					width: 120,
					display: showSearchMode ? "inline-block" : "none",
				}}
				onChange={handleModeChange}
				options={selectModes}
			/>

			<Select
				showSearch
				allowClear
				placeholder={placeholder}
				defaultActiveFirstOption
				showArrow
				options={searchOptions}
				notFoundContent={null}
				style={{
					width: "15rem",
					...searchBarStyle,
				}}
				value={searchValue}
				onSelect={(e) => handleSearchResult(e)}
				onClear={() => handleSearchResult("")}
				onChange={handleSearchChange}
			/>
		</>
	);
};

export default SelectBucket;
