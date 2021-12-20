import React, { useState} from "react";
import {TreeSelect} from "antd";
import {useRequest} from "umi";

const FormSelectTree: React.FC<{
  value?: string[];
  onChange?: (value: string[]) => void;
  url: string,
  listHeight?: number
}> = (props) => {
  const {onChange,url,listHeight=256,value} = props
  const [treeData,setTreeData] = useState([])
  const formatData = (data: any) => {
    const res = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item: any = {
          title: key,
          value: key,
          children:data[key] instanceof Array? data[key].map((i: string) => {
            return {
              title: i,
              value: i,
            }
          }):formatData(data[key])
        }
        res.push(item)
      }
    }
    return res;
  }

  const  {loading} = useRequest(url,{
    onSuccess:(res)=>{
      const data: any =  formatData(res)
      setTreeData(data)
    }
  })

  const tProps = {
    treeCheckable: true,
    allowClear: true,
    multiple: true,
    placeholder: '请选择',
    style: {
      width: '100%',
    },
  };

  const onSelectChange = (value: string[]) => {
    onChange?.(value)
  }
  return <TreeSelect
    {...tProps}
    onChange={onSelectChange}
    treeData={treeData}
    disabled={loading}
    value={value}
    listHeight={listHeight}/>
}

export default FormSelectTree;
