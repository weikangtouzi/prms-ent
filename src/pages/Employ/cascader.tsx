import { Cascader } from 'antd';
import React from "react";
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
const CascaderFC: React.FC<{
  value?: (string | number)[];
  onChange?: (
    value: (string | number)[],
  ) => void;
}> = ({  onChange }) => {

  const onCascaderChange = (e:  (string | number)[])=>{
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <Cascader
      options={options}
      onChange={onCascaderChange}
    />
  );
};

export default CascaderFC;
