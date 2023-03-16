import { Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllBucketList } from "@/redux/modules/bucketSlice";
const selectOptions = [
	{
		value: "name",
		label: "按名称搜索",
	},
	{
		value: "tag",
		label: "按标签搜索",
	},
];



const SearchBucket = ({ costomSearchFunction,showSearchMode=true,searchBarStyle={},setResult }) => {
	
    
    const currentBuckets = useSelector(selectAllBucketList);
	const options = currentBuckets.map((item) => ({
		value: item.name,
		label: item.name,
	}));
	// console.log(options,currentBuckets)
	//从上层传来的，前端直接修改展示的数据
	const [searchValue, setSearchValue] = useState(null);
	const handleSearchChange = (value) => {
		setSearchValue(value);
	};
    

    let handleSearchResult=(searchValue)=>{
        console.log(searchValue)
        let newBucketList=currentBuckets.filter(item=>item.name.includes(searchValue))
        setResult(newBucketList)
    }
    if(typeof(costomSearchFunction)==='function'){
        handleSearchResult=costomSearchFunction
    }

	return (
		<>
			<Select
				defaultValue="name"
				style={{
					width: 120,
                    display:showSearchMode?'inline-block':'none'
				}}
				// onChange={handleChange}
				options={selectOptions}
			/>

			<Select
				showSearch
				allowClear
				placeholder={"请输入搜索内容"}
				defaultActiveFirstOption
				showArrow
				options={options}
				notFoundContent={null}
				style={{
					width: "15rem",
                    zIndex:1003,
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

export default SearchBucket;
