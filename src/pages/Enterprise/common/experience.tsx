import { Form, Input, Button } from 'antd';
import { tailFormItemLayout, formItemLayout } from '@/common/js/config';

const Experience = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="mx560">
      <Form
        {...formItemLayout}
        form={form}
        name="base"
        onFinish={onFinish}
        initialValues={{}}
        scrollToFirstError
      >
        <Form.Item name="overtime;" label="工作体验">
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

export default Experience;
