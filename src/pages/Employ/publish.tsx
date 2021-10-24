import {Button, Card, Cascader, Col, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {formItemLayout, tailFormItemLayout} from "@/common/js/config";
import {useLayoutEffect} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import styles from './index.less';

const residences = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖区',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '建邺区',
          },
        ],
      },
    ],
  },
];
const Publish = () => {
  const [form] = Form.useForm();
  useLayoutEffect(() => {
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
    const placeSearch = new AMap.PlaceSearch({
      map: map,
    });

    function select(e: any) {
      form.setFieldsValue({
        address: e.poi.name,
      });
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    }

    function showInfoClick(e: any) {
      const lng = e.lnglat.getLng();
      const lat = e.lnglat.getLat();
      form.setFieldsValue({
        longitude: lng,
        latitude: lat,
      });
    }

    function searchClick(e: any) {
      const lng = e.data.location.lng;
      const lat = e.data.location.lat;
      form.setFieldsValue({
        longitude: lng,
        latitude: lat,
      });
    }

    AMap.event.addListener(auto, 'select', select);
    AMap.event.addListener(placeSearch, 'markerClick', searchClick);
    map.on('click', showInfoClick);
    return () => {
      map.off('click', showInfoClick);
      AMap.event.removeListener(auto, 'select', select);
      AMap.event.removeListener(placeSearch, 'markerClick', searchClick);
    };
  });

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  return <PageHeaderWrapper>
    <Card>
      <div className={[styles.publish,'mx560'].join(' ')}>
        <Form
          {...formItemLayout}
          form={form}
          name="base"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item name="type" label="类型">
            <Select options={[
              {value:'product',label:'产品'},
              {value:'dev',label:'开发'},
              {value:'design',label:'设计'},
            ]}/>
          </Form.Item>
          <Form.Item
            name="title"
            label="职位名称">
            <Input/>
          </Form.Item>
          <Form.Item name="type" label="职位属性">
            <Select options={[
              {value:'full',label:'全职'},
              {value:'part',label:'兼职'},
              {value:'study',label:'实习'},
            ]}/>
          </Form.Item>
          <Form.Item
            name="number"
            label="招聘人数">
            <InputNumber/>
          </Form.Item>
          <Form.Item name="grade" label="学历要求">
            <Select options={[
              {value:'none',label:'不限'},
              {value:'junior',label:'初中'},
              {value:'high',label:'高中'},
              {value:'undergraduate',label:'本科'},
              {value:'postgraduate',label:'研究生'},
            ]}/>
          </Form.Item>
          <Form.Item name="year" label="经验要求">
            <Select options={[
              {value:'none',label:'不限'},
              {value:'three',label:'1~3年'},
              {value:'five',label:'3~5年'},
              {value:'ten',label:'5~10年'},
              {value:'ten-more',label:'10年以上'},
            ]}/>
          </Form.Item>
          <Form.Item
            name="industry"
            label="所在行业"
            rules={[{required: true, message: '请输入所属行业!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="properties"
            label="行业性质"
            rules={[{required: true, message: '请输入行业性质!'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item name="step" label="融资阶段">
            <Input/>
          </Form.Item>
          <Form.Item name="employee" label="人员规模">
            <Input/>
          </Form.Item>

          <Form.Item label="薪资待遇" style={{ marginBottom: 0 }}>
            <Form.Item
              name="min"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginRight:'8px'}}
            >
              <Input placeholder="最低薪资"/>
            </Form.Item>
            -
            <Form.Item
              name="max"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'8px'}}
            >
              <Input placeholder="最高薪资"/>
            </Form.Item>
          </Form.Item>
          <Form.Item name="detail" label="职位详情">
            <Input.TextArea/>
          </Form.Item>

          <Form.Item label="上班地址" style={{marginBottom: '6px'}}>
            <Form.Item name="region" rules={[{required: true}]}>
              <Cascader options={residences}/>
            </Form.Item>
            <Form.Item name="address2" rules={[{required: true, message: '请输入详细地址'}]}>
              <Input placeholder="请输入详细地址"/>
            </Form.Item>
          </Form.Item>

          <Form.Item label="地址定位">
            <Form.Item
              name="longitude"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
            >
              <Input placeholder="经度"/>
            </Form.Item>
            <Form.Item
              name="latitude"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: '50%', margin: '0 0 0 8px'}}
            >
              <Input placeholder="纬度"/>
            </Form.Item>
            <Row style={{marginBottom: '10px'}}>
              <Col span={20}>
                <Form.Item
                  name="address"
                  noStyle
                  rules={[{required: true, message: '请输入详细地址'}]}
                >
                  <Input id="keywordAdd"/>
                </Form.Item>
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
                <Button type={'primary'}>搜索</Button>
              </Col>
            </Row>
            <div id="container" style={{width: '100%', height: '250px'}}></div>
          </Form.Item>
          <Form.Item label="招聘时段" style={{ marginBottom: 0 }}>
            <Form.Item
              name="start"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginRight:'8px'}}
            >
              <Input placeholder="选择上线时间"/>
            </Form.Item>
            -
            <Form.Item
              name="end"
              rules={[{required: true}]}
              style={{display: 'inline-block', width: 'calc(50% - 12px)',marginLeft:'8px'}}
            >
              <Input placeholder="选择下线时间"/>
            </Form.Item>
          </Form.Item>


          <Form.Item {...tailFormItemLayout}>
            <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button>
              返回
            </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Card>
  </PageHeaderWrapper>
}

export default Publish;
