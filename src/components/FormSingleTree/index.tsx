import {Cascader} from "antd";
import React, {useEffect, useState} from "react";
import type {CascaderValueType} from "antd/es/cascader";
import {request} from "umi";
import type {CascaderOptionType} from "antd/lib/cascader";

const FormSingleTree: React.FC<{
  value?: CascaderValueType;
  url?: string,
  options?: CascaderOptionType[]
  onChange?: (value: CascaderValueType) => void;
}>  = ({value,onChange,url='',options})=>{
 const [option,setOption] = useState<CascaderOptionType[]>([])
  const formatData = (data: any) => {
    const res = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item: any = {
          label: key,
          value: key,
          children:data[key] instanceof Array? data[key].map((i: string) => {
            return {
              label: i,
              value: i,
            }
          }):formatData(data[key])
        }
        res.push(item)
      }
    }
    return res;
  }
  useEffect(()=>{
    if(options&&options.length>0){
      setOption(options)
    }else{
      if(!url) return;
      request(url).then(res=>{
        const data = formatData(res)
        setOption(data)
      })
    }
  },[options,url])

  const handleChange = (values: any)=>{
    onChange?.(values)
  }

  return <Cascader
    value={value}
    options={option}
    onChange={handleChange}
    placeholder="请选择"
    changeOnSelect
  />;
}

export default FormSingleTree;
