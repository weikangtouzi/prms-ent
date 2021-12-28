import React from 'react';
import {Cascader, Spin} from 'antd';
import {useQuery,} from "@apollo/client";
import {
  GET_ALL_REGION
} from "@/components/formCascade/request";
import type {DataNode,CascaderValueType} from "rc-cascader/lib/interface";

const FormCascade: React.FC<{
  value?: CascaderValueType;
  onChange?: (value: CascaderValueType) => void;
}> = ({value, onChange}) => {

 const {data,loading} = useQuery<ResultDataType<'StaticGetAllRegion', {data: any[]}>>(GET_ALL_REGION)
  // // 根据省id获取city
  // const {refetch:cityFetch} = useQuery<ResultDataType<'StaticGetCities', Region.City[]>,{provinceId: string}>(GET_CITY_DATA,{
  //   skip:true
  // })
  // // 根据市id获取counties
  // const {refetch:countryFetch} = useQuery<ResultDataType<'StaticGetCounties', Region.County[]>,{cityId: string}>(GET_COUNTIES_DATA,{
  //   skip:true
  // })
  // // 根据country id 获取 towns
  // const {refetch:townFetch} = useQuery<ResultDataType<'StaticGetTowns', Region.Town[]>,{countyId: string}>(GET_TOWN_DATA,{
  //   skip:true
  // })
  // useQuery<ResultDataType<'StaticGetProvinces', Region.Province[]>>(GET_PROVINCE_DATA, {
  //   onCompleted: (data) => {
  //     const list = data?.StaticGetProvinces || []
  //     const transList =  list.map(i=>{
  //       return {
  //         ...i,
  //         type:'province',
  //         isLeaf:false
  //       }
  //     })
  //     setOptions(transList)
  //   }
  // })
  const handleChange = (val: CascaderValueType,selectOptions: DataNode[]) => {
    // 把最后一个值给传递出去
    if (onChange) {
      // @ts-ignore
      const names =  selectOptions.map(o=>o?.name)
      console.log(val,names)
      onChange([...val,...names]);
    }
  };

  // 参数是可选项
  // const loadData = (selectedOptions: CascaderOptionType[] = []) => {
  //   const targetOption = selectedOptions[selectedOptions.length - 1];
  //   targetOption.loading = true;
  //   // 分情况
  //   // 如果type===province
  //   if(targetOption.type==='province'){
  //     cityFetch({
  //       provinceId:targetOption.id
  //     }).then(res=>{
  //       targetOption.loading = false;
  //       targetOption.children = res.data.StaticGetCities.map(r=>{
  //         return {
  //           ...r,
  //           type:'city',
  //           isLeaf:false
  //         }
  //       })
  //       setOptions([...options]);
  //     })
  //   }else if(targetOption.type==='city'){
  //     countryFetch({
  //       cityId:targetOption.id
  //     }).then(res=>{
  //       targetOption.loading = false;
  //       targetOption.children = res.data.StaticGetCounties.map(r=>{
  //         return {
  //           ...r,
  //           type:'country',
  //           isLeaf:true
  //         }
  //       })
  //       setOptions([...options]);
  //     })
  //   }
  // };

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
