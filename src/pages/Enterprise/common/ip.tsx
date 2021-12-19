import {Form, Button, Card} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import MultipleUpload from "@/components/Upload/multiUpload";


const Ip = () => {
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
            label="企业视频"
            valuePropName="fileList"
            extra="只支持.mp4格式(总后台审核,最多5张)"
          >
            <MultipleUpload max={5} accept='video/*'/>
          </Form.Item>
          <Form.Item
            name="pic"
            label="企业美图"
            valuePropName="fileList"
            extra="只支持.jpg/.png格式(最多10张)"
          >
            <MultipleUpload max={10}/>
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

export default Ip;
