import {InputNumber} from "antd";
import React, {useState} from "react";

const MinMax: React.FC<{
  value?: number[];
  onChange?: (value: (number|undefined)[]) => void;
}>  = (props)=>{
  const {value,onChange} = props;
  const [price,setPrice] = useState<(number|undefined)[]>(()=>{
    return value && value.length>1?value:[undefined,undefined]
  })

  const onMinChange = (e: number)=>{
    const [,max] = price
    if(max && max<e){
      setPrice([undefined,max])
      onChange?.([undefined,max])
    }else{
      setPrice((p)=>{
        return [e,p[1]]
      })
      onChange?.([e,max])
    }
  }

  const onMaxChange = (e: number)=>{
    const [min] = price
    if(min && min>e){
      setPrice([min,undefined])
      onChange?.([min,undefined])
    }else{
      setPrice((p)=>{
        return [p[0],e]
      })
      onChange?.([min,e])
    }
  }
  return <div>
    <InputNumber
      style={{width:'46%'}}
      value={price[0]}
      onChange={onMinChange}
    />
    <span style={{width:'8%',display:'inline-block',textAlign:'center'}}>-</span>
    <InputNumber
      style={{width:'46%'}}
      value={price[1]}
      onChange={onMaxChange}
    />
  </div>
}

export default MinMax;
