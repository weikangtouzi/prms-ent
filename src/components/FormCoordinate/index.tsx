import {Button, Col, Input, Row,} from "antd";
import React, {useCallback, useRef, useState} from "react";
import {useEffect} from "react";

const FormCoordinate: React.FC<{
  value?: (number|undefined)[];
  onChange?: (value: number|undefined[]) => void;
}>  = ({value,onChange}) => {
  const searchRef = useRef<any>(null)
  const [searchWord,setSearchword] = useState('')
  const [coordinate,setCoordinate] = useState<(number|undefined)[]>(()=>{
    return value && value.length>1?value:[undefined,undefined]
  })

  const  select  = useCallback((e)=>{
    searchRef?.current?.setCity(e.poi.adcode);
    searchRef.current?.search(e.poi.name); //关键字查询查询
  },[])

  const showInfoClick = useCallback((e)=>{
    console.log(123)
    const lng = e.lnglat.getLng();
    const lat = e.lnglat.getLat();
    setCoordinate([lng,lat])
    onChange?.([lng,lat])
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
    }

    AMap.event.addListener(auto, 'select', select);
    AMap.event.addListener(searchRef.current, 'markerClick', searchClick);
    map.on('click', showInfoClick);
    return () => {
      map.off('click', showInfoClick);
      AMap.event.removeListener(auto, 'select', select);
      AMap.event.removeListener(searchRef.current, 'markerClick', searchClick);
    };
  },[]);

  const search = ()=>{
    searchRef.current?.search('北京'); //关键字查询查询
  }
  return <>
    <div style={{marginBottom:'12px'}}>
      <Input placeholder="经度"
             value={coordinate[0]}
             style={{display: 'inline-block', width: 'calc(50% - 8px)',marginRight:'16px'}}
      />
      <Input
        placeholder="纬度"
        value={coordinate[1]}
        style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
      />
    </div>

    <Row style={{marginBottom: '10px'}}>
      <Col span={20}>
        <Input id="keywordAdd" placeholder='输入地址搜索' autoComplete={'off'} value={searchWord} onChange={(e)=>setSearchword(e.target.value)}/>
      </Col>
      <Col span={4} style={{textAlign: 'right'}}>
        <Button type={'primary'} onClick={search}>搜索</Button>
      </Col>
    </Row>
    <div id="container" style={{width: '100%', height: '250px'}}/>
  </>
}

export default FormCoordinate;
