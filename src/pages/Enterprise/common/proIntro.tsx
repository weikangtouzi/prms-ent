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
const ProIntro = () => {
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
        name="ProIntro"
        onFinish={onFinish}
        initialValues={{}}
        scrollToFirstError
      >
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
          name="industry"
          label="产品名称"
          rules={[{ required: true, message: '请输入产品名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="properties"
          label="产品slogan"
          rules={[{ required: true, message: '请输入产品slogan!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="step" label="产品特点与亮点">
          <Input.TextArea />
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

export default ProIntro;
