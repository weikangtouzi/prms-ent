import {Form, Button, Select, Tag, Card, Radio, Space, TimePicker } from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';

const options = [
  {value: 'green', label: '周末双休'},
  {value: 'cyan', label: '年终奖'},
  {value: 'xx', label: '绩效奖金'},
];
const Bonus = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const tagRender = (props: any) => {
    const {label, closable, onClose} = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{marginRight: 3}}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Card>
      <div className="mx560">
        <Form
          {...formItemLayout}
          form={form}
          name="base"
          onFinish={onFinish}
          initialValues={{}}
          scrollToFirstError
        >
          <Form.Item label="工作时间" name='worktime'>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}><Space>固定时间
                  <Form.Item
                    name='startTime'
                    noStyle
                  >
                    <TimePicker use12Hours size={"small"} placeholder='选择开始时间'/>
                  </Form.Item>
                  <Form.Item
                    name='endTime'
                    noStyle
                  >
                    <TimePicker use12Hours size={"small"} placeholder='选择开始时间'/>
                  </Form.Item>
                </Space></Radio>
                <Radio value={2}>弹性工作</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="schedule" label="作息时间(选填)">
            <Radio.Group>
              <Radio.Button value="a">周末双休</Radio.Button>
              <Radio.Button value="b">单休</Radio.Button>
              <Radio.Button value="c">大小周</Radio.Button>
              <Radio.Button value="d">排版轮休</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="overtime" label="加班情况(选填)">
            <Radio.Group>
              <Radio.Button value="a">有偿加班</Radio.Button>
              <Radio.Button value="b">不加班</Radio.Button>
              <Radio.Button value="c">偶尔加班</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="bonus" label="福利标签">
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{width: '100%'}}
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
    </Card>
  );
};

export default Bonus;
