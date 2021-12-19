import React from "react";
import {TreeSelect} from "antd";
import type {DataNode} from "rc-tree-select/lib/interface";

const FormSelectTree: React.FC<{
  value?: string[];
  onChange?: (value: string[]) => void;
  treeData: DataNode[]
}> = (props) => {
  const {treeData,onChange} = props
  const tProps = {
    treeData,
    treeCheckable: true,
    allowClear: true,
    multiple: true,
    placeholder: '请选择行业',
    style: {
      width: '100%',
    },
  };

  const onSelectChange = (value: string[]) => {
    onChange?.(value)
  }
  return <TreeSelect {...tProps} onChange={onSelectChange}/>
}

export default FormSelectTree;
