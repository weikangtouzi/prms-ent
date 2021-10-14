import { Form, Input, Button, Upload } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { tailFormItemLayout, formItemLayout } from '@/common/js/config';



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
        <Form.Item name="fullName" label="姓名">
          <Input/>
        </Form.Item>
        <Form.Item name="title" label="职务">
          <Input/>
        </Form.Item>
        <Form.Item
          name="logo"
          label="头像"
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
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Input />
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
