import React from 'react';
import {Cascader, Spin} from 'antd';
import {useQuery,} from "@apollo/client";
import {
  GET_ALL_REGION
} from "@/components/formCascade/request";
// @ts-ignore
import type {DataNode,CascaderValueType} from "rc-cascader/lib/interface";

const FormCascade: React.FC<{
  value?: CascaderValueType;
  onChange?: (value: CascaderValueType) => void;
}> = ({value, onChange}) => {

 const {data,loading} = useQuery<ResultDataType<'StaticGetAllRegion', {data: any[]}>>(GET_ALL_REGION)

  const handleChange = (val: CascaderValueType,selectOptions: DataNode[]) => {
    // 把最后一个值给传递出去
    if (onChange) {
      // @ts-ignore
      const names =  selectOptions.map(o=>o?.name)
      console.log(val,names)
      onChange([...val,...names]);
    }
  };

  return <Spin spinning={loading} size={"small"}>
    <Cascader
      disabled={loading}
      fieldNames={{label: 'name', value: 'id'}}
      value={value && value?.length>=3?value.slice(0,3):value}
      options={data?.StaticGetAllRegion?.data}
      onChange={handleChange}
      placeholder="请选择"
    />
  </Spin>
};

export default FormCascade;
