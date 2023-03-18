import React, { useContext } from 'react'
import { CreateBucketContext } from '../../provider/CreateBucketProvider'
import {visiableRenderMap} from '@/views/bucket/api/bucketApi'

const listStyle={
    key:{
        width:'100px'   ,
        display:'inline-block',
        margin:'8px 0',
        color:'gray'
    },
}

const bucketKVMapFunction=(item,index)=>{
    if(item[0]==='visiable'){
        return <div key={index}>
            <span style={listStyle.key}>{'访问权限'}</span>
            <span>{visiableRenderMap(item[1])}</span>
        </div>
    }
    else if(item[0]==='encrypt'){
        return <div key={index}>
            <span  style={listStyle.key}>{'服务端加密'}</span>
            <span>{'属性基加密'}</span>
        </div>
    }
    else if(item[0]==='createDisabled'){
        return null
    }
    else if(item[0]==='name'){
        return <div key={index}>
            <span  style={listStyle.key}>{'存储桶名称'}</span>
            <span>{item[1]}</span>
        </div>
    }
}


const CreateStepFin = () => {
    const {bucket:currentBucket}=useContext(CreateBucketContext)
    const  currentBucketKV=Object.entries(currentBucket)
  return (
    <>
        {currentBucketKV.map(bucketKVMapFunction)}
    </>
  )
}

export default CreateStepFin