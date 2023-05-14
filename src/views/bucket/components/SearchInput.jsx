import { Select, Input, Space } from "antd";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBucketList } from "@/redux/modules/bucketSlice";
const { Search } = Input;

const selectModes = [
	{
		value: "name",
		label: "按名称搜索",
	},
	{
		value: "tag",
		label: "按标签搜索",
		disabled: true,
	},
];

function SearchInput({
	searchFunction,
	showSearchMode = true,
	showSelect = true,
    trigger="onSearch",
	searchBarStyle = {},
	setResult,
}) {
	//从上层传来的，前端直接修改展示的数据
	const [searchValue, setSearchValue] = useState("");
	const [searchMode, setSearchMode] = useState("name");
	const [searchOptions, setSearchOptions] = useState([]);
	const [placeholder, setPlaceholder] = useState("请输入存储桶名称");
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

	const handleSelect = (value) => {
		setSearchValue(value);
		setSearchOptions([]);
		handleSearchResult(value);
	};
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
		let options = searchMode === "name" ? namesoptions : tagsOptions;
		const filteredOptions = options.filter((o) =>
			o.value.includes(e.target.value)
		);
		setSearchOptions(filteredOptions);
        if(trigger==='onChange'){
            handleSearchResult(e.target.value);
        }
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
		<Space size={0}>
			<Select
				value={searchMode}
				style={{
					width: 120,
					display: showSearchMode ? "inline-block" : "none",
				}}
				onChange={handleModeChange}
				options={selectModes}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					position: "relative",
				}}
			>
				<Search
					value={searchValue}
					placeholder={placeholder}
					allowClear
					style={{
						width: "15rem",
						...searchBarStyle,
						zIndex: 2,
					}}
					onChange={handleSearchChange}
					onSearch={handleSearchResult}
                    
				/>
				{showSelect &&
					searchOptions.length > 0 &&
					searchValue.length > 0 && (
						<Select
							style={{
								width: "15rem",
								position: "fixed",
								zIndex: 1,
							}}
							onSelect={handleSelect}
							options={searchOptions}
							defaultValue={searchOptions[0].value}
							defaultOpen={true}
						/>
					)}
			</div>
		</Space>
	);
}

export default SearchInput;
