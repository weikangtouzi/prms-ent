import React, {useState} from 'react';
import {Cascader} from 'antd';
import type {CascaderValueType} from 'antd/es/cascader';
import {useQuery,} from "@apollo/client";
import {
  GET_PROVINCE_DATA,
  GET_CITY_DATA,
  GET_COUNTIES_DATA,
  GET_TOWN_DATA
} from "@/components/formCascade/request";
import type {CascaderOptionType} from "antd/lib/cascader";

const FormCascade: React.FC<{
  value?: CascaderValueType;
  onChange?: (value: CascaderValueType) => void;
}> = ({value, onChange}) => {
  const [options, setOptions] = useState<Region.Province[]>([])
  // 根据省id获取city
  const {refetch:cityFetch} = useQuery<ResultDataType<'StaticGetCities', Region.City[]>,{provinceId: string}>(GET_CITY_DATA,{
    skip:true
  })
  // 根据市id获取counties
  const {refetch:countryFetch} = useQuery<ResultDataType<'StaticGetCounties', Region.County[]>,{cityId: string}>(GET_COUNTIES_DATA,{
    skip:true
  })
  // 根据country id 获取 towns
  const {refetch:townFetch} = useQuery<ResultDataType<'StaticGetTowns', Region.Town[]>,{countyId: string}>(GET_TOWN_DATA,{
    skip:true
  })
  useQuery<ResultDataType<'StaticGetProvinces', Region.Province[]>>(GET_PROVINCE_DATA, {
    onCompleted: (data) => {
      const list = data?.StaticGetProvinces || []
      const transList =  list.map(i=>{
        return {
          ...i,
          type:'province',
          isLeaf:false
        }
      })
      setOptions(transList)
    }
  })
  const handleChange = (val: CascaderValueType) => {
    // 把最后一个值给传递出去
    if (onChange) {
      onChange(val);
    }
  };

  // 参数是可选项
  const loadData = (selectedOptions: CascaderOptionType[] = []) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    console.log(targetOption)
    targetOption.loading = true;
    // 分情况
    // 如果type===province
    if(targetOption.type==='province'){
      cityFetch({
        provinceId:targetOption.id
      }).then(res=>{
        targetOption.loading = false;
        targetOption.children = res.data.StaticGetCities.map(r=>{
          return {
            ...r,
            type:'city',
            isLeaf:false
          }
        })
        setOptions([...options]);
      })
    }else if(targetOption.type==='city'){
      countryFetch({
        cityId:targetOption.id
      }).then(res=>{
        targetOption.loading = false;
        targetOption.children = res.data.StaticGetCounties.map(r=>{
          return {
            ...r,
            type:'country',
            isLeaf:false
          }
        })
        setOptions([...options]);
      })
    } else if(targetOption.type==='country'){
      townFetch({
        countyId:targetOption.id
      }).then(res=>{
        targetOption.loading = false;
        targetOption.children = res.data.StaticGetTowns.map(r=>{
          return {
            ...r,
            type:'town',
            isLeaf:true
          }
        })
        setOptions([...options]);
      })
    }
  };

  return <Cascader
    fieldNames={{label: 'name', value: 'id'}}
    value={value}
    options={options}
    loadData={loadData}
    onChange={handleChange}
    placeholder="请选择"
    changeOnSelect
  />;
};

export default FormCascade;
