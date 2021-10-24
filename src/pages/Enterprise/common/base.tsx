import { Form, Input, Row, Col, Button, Cascader, Upload } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { tailFormItemLayout, formItemLayout } from '@/common/js/config';
import {ProFormText} from "@ant-design/pro-form";

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

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const Base = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChange = (e: any) => {
    setFileList(e.fileList);
  };

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

  return (
    <div className="mx560">
      <Form
        {...formItemLayout}
        form={form}
        name="base"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
          fullName: '深圳趁早找信息科技有限公司',
        }}
        scrollToFirstError
      >
        <ProFormText name="fullName" label="全称" readonly={true}/>
        <Form.Item
          name="logo"
          label="logo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只支持.jpg/.png格式(单张)"
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          name="shortName"
          label="简称"
          tooltip="简称只能选择全称里面的文字"
          rules={[
            {
              required: true,
              message: '请输入简称!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const fullName = getFieldValue('fullName');
                if (value) {
                  const texts = value.split('');
                  for (let i = 0; i < texts.length; i++) {
                    if (fullName.indexOf(texts[i]) < 0) {
                      return Promise.reject(new Error('简称只能选择全称里面的文字!'));
                    }
                  }
                  return Promise.resolve();
                }
                return Promise.reject(new Error('简称只能选择全称里面的文字!'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="industry"
          label="所在行业"
          rules={[{ required: true, message: '请输入所属行业!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="properties"
          label="行业性质"
          rules={[{ required: true, message: '请输入行业性质!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="step" label="融资阶段">
          <Input />
        </Form.Item>
        <Form.Item name="employee" label="人员规模">
          <Input />
        </Form.Item>

        <Form.Item label="公司地址" style={{ marginBottom: '0' }}>
          <Form.Item name="region" rules={[{ required: true }]}>
            <Cascader options={residences} />
          </Form.Item>
          <Form.Item name="address2" rules={[{ required: true, message: '请输入详细地址' }]}>
            <Input placeholder="请输入详细地址" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="公司定位">
          <Form.Item
            name="longitude"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="经度" />
          </Form.Item>
          <Form.Item
            name="latitude"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: '50%', margin: '0 0 0 8px' }}
          >
            <Input placeholder="纬度" />
          </Form.Item>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={20}>
              <Form.Item
                name="address"
                noStyle
                rules={[{ required: true, message: '请输入详细地址' }]}
              >
                <Input id="keywordAdd" />
              </Form.Item>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button type={'primary'}>搜索</Button>
            </Col>
          </Row>
          <div id="container" style={{ width: '100%', height: '250px' }}></div>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Base;
