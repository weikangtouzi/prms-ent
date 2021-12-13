import {Form, Input, Button, Upload, Result, Card} from 'antd';
import {useState} from 'react';
import {PlusOutlined, FileSearchOutlined} from '@ant-design/icons';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import UpButton from "@/components/Upload";

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const Auth = () => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const [inCheck] = useState(false);

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>点击上传</div>
    </div>
  );

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const handleChange = (e: any) => {
    setFileList(e.fileList);
  };

  return (
    <Card bodyStyle={{padding:'48px'}}>
      <div className="mx560">
        {!inCheck && (
          <Form
            {...formItemLayout}
            form={form}
            name="Auth"
            onFinish={onFinish}
            initialValues={{}}
            scrollToFirstError
          >
            <Form.Item
              name="fullname"
              label="全称"
              rules={[{required: true, message: '请输入公司全称!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="logo"
              label="营业执照"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="只支持.jpg/.png格式(单张)"
            >
              <UpButton/>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        )}
        {inCheck && (
          <Result
            icon={<FileSearchOutlined/>}
            title="认证审核中"
            subTitle="预计两个工作日内完成"
          />
        )}
      </div>
    </Card>
  );
};

export default Auth;
