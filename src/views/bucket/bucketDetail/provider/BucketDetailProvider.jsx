import React from 'react'
const BucketDetailContext=React.createContext();
const BucketDetailProvider=({children})=>{
    const [currentOpenKeys,setCurrentOpenKeys]=React.useState([])
    const [currentSelectedKeys,setCurrentSelectedKeys]=React.useState(['file'])
    return <BucketDetailContext.Provider value={{
        currentOpenKeys,
        setCurrentOpenKeys,
        currentSelectedKeys,
        setCurrentSelectedKeys
    }} >
        {children}
    </BucketDetailContext.Provider>
}
export {BucketDetailContext,BucketDetailProvider}