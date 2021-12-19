import {Form, Input, Button, Card} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import MultipleUpload from "@/components/Upload/multiUpload";

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const ProIntro = () => {
  const [form] = Form.useForm();


  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };


  return (
    <Card>
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
            <MultipleUpload max={10}/>
          </Form.Item>

          <Form.Item
            name="industry"
            label="产品名称"
            rules={[{required: true, message: '请输入产品名称!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="properties"
            label="产品slogan"
            rules={[{required: true, message: '请输入产品slogan!'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item name="step" label="产品特点与亮点">
            <Input.TextArea/>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default ProIntro;
