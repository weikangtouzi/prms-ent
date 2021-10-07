import { Form, Input, Button, Select, Tag } from 'antd';
import { tailFormItemLayout, formItemLayout } from '@/common/js/config';

const options = [
  { value: 'green', label: '周末双休' },
  { value: 'cyan', label: '年终奖' },
];
const Bonus = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
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
        <Form.Item name="overtime;" label="加班情况">
          <Input />
        </Form.Item>
        <Form.Item name="schedule" label="作息时间">
          <Input />
        </Form.Item>
        <Form.Item name="bonus" label="福利标签">
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{ width: '100%' }}
            options={options}
          />
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

export default Bonus;
