import { InputNumber} from 'antd';
import React, {useState} from "react";
import styles from './index.less'
const Salary: React.FC<{
  value?: number[];
  onChange?: (
    value: (string | number)[],
  ) => void;
}> = ({  onChange }) => {

  const  [minMax,setMinMax] = useState([0,0])

  const onMinChange = (e: number)=>{
    if (onChange) {
      setMinMax((v)=>[e,v[1]])
      onChange([e,minMax[1]])
    }
  }

  const onMaxChange = (e: number)=>{
    if (onChange) {
      setMinMax((v)=>[v[0],e])
      onChange([minMax[0],e])
    }
  }

  return (
    <div className={styles.salary}>
      <InputNumber min={1} onChange={onMinChange}/>
      <span style={{width:'8%',display:'inline-block',textAlign:'center'}}>-</span>
      <InputNumber min={1000} onChange={onMaxChange}/>
    </div>
  );
};

export default Salary;
