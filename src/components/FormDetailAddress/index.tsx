import {Button, Col, Input, Row,} from "antd";
import React, {useCallback, useRef, useState} from "react";
import {useEffect} from "react";

const FormDetailAddress: React.FC<{
  value?: (number|undefined)[];
  onChange?: (value: number|undefined[]) => void;
}>  = ({value,onChange}) => {
  const searchRef = useRef<any>(null)
  const [searchWord,setSearchword] = useState('')
  const [doorName,setDoorName] = useState('')
  const [coordinate,setCoordinate] = useState<(number|undefined)[]>(()=>{
    return value && value.length>1?value:[undefined,undefined]
  })

  const  select  = useCallback((e)=>{
    searchRef?.current?.setCity(e.poi.adcode);
    // setSearchword(e.poi.name)
    searchRef.current?.search(e.poi.name); //关键字查询查询
    setCoordinate([e.poi.location.lng,e.poi.location.lat,])
  },[])

  const showInfoClick = useCallback((e)=>{
    // const lng = e.lnglat.getLng();
    // const lat = e.lnglat.getLat();
    // setCoordinate([lng,lat])
    // onChange?.([lng,lat])
  },[])

  useEffect(() => {
    // 由于Chrome、iOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度
    const map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 7,
    });
    const autoOptions = {
      input: 'keywordAdd',
    };
    // 如果有需要，可以添加关键字搜索
    const auto = new AMap.Autocomplete(autoOptions);
    searchRef.current= new AMap.PlaceSearch({
      map: map,
    });


    function searchClick(e: any) {
      const lng = e.data.location.lng;
      const lat = e.data.location.lat;
      setCoordinate([lng,lat])
      setSearchword(e.data.address)
    }

    AMap.event.addListener(auto, 'select', select);
    AMap.event.addListener(searchRef.current, 'markerClick', searchClick);
    // map.on('click', showInfoClick);
    return () => {
      // map.off('click', showInfoClick);
      AMap.event.removeListener(auto, 'select', select);
      AMap.event.removeListener(searchRef.current, 'markerClick', searchClick);
    };
  },[]);
  return <>
    <Row style={{marginBottom: '10px'}} gutter={8}>
      <Col span={16}>
        <Input  placeholder='请点击选择地图上的位置' autoComplete={'off'} value={searchWord}/>
      </Col>
      <Col span={8} style={{textAlign: 'right'}}>
        <Input placeholder='楼层门牌号' autoComplete={'off'} value={doorName} onChange={(e)=>setDoorName(e.target.value)}/>
      </Col>
    </Row>
    <div id="container" style={{width: '100%', height: '250px'}}/>
    <Input id="keywordAdd"  autoComplete={'off'}  style={{position:'absolute',top:'50px',right:'8px',width:'180px'}}  placeholder='输入地址搜索'/>
  </>
}

export default FormDetailAddress;
