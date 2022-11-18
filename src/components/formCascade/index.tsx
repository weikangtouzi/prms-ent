import React, { useState, useEffect } from 'react';
import {Cascader, Spin} from 'antd'
// @ts-ignore
import type {DataNode,CascaderValueType} from "rc-cascader/lib/interface";

const FormCascade: React.FC<{
  value?: CascaderValueType;
  onChange?: (value: CascaderValueType) => void;
}> = ({value, onChange}) => {

	const [regionList, setRegionList] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		HTAPI.StaticGetAllRegion().then(response => {
			setRegionList(response.data)
		}).finally(() => {
			setLoading(false)
		})
	}, [])

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
      options={regionList}
      onChange={handleChange}
      placeholder="请选择"
    />
  </Spin>
};

export default FormCascade;
