import { Form, Input, Button, DatePicker } from 'antd';
import { tailFormItemLayout, formItemLayout } from '@/common/js/config';

const Intro = () => {
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
        <Form.Item name="baseIntro" label="基本介绍">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="setUpTime" label="成立时间">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="website"
          label="公司官网"
          rules={[
            {
              required: true,
              message: '请输入简称!',
            },
          ]}
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

export default Intro;
