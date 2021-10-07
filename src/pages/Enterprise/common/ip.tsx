import { Form, Button, Upload } from 'antd';
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
const Ip = () => {
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
          label="企业视频"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="只支持.mp4格式(总后台审核)"
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
          name="logo"
          label="企业美图"
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Ip;
