import {Form, Button, Select, Card, Radio, Space, TimePicker, message} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import {useMutation} from "@apollo/client";
import {edit_enterprise_welfare} from "@/services/gqls/enterprise";

const options = [
  {value: '周末双休', label: '周末双休'},
  {value: '年终奖', label: '年终奖'},
];
const Bonus = () => {
  const [form] = Form.useForm();
  const [edit_welfare] =  useMutation<void,{info: Enterprise.welfareType}>(edit_enterprise_welfare)

  const onFinish = (values: Enterprise.welfareType) => {
    console.log('Received values of form: ', values);
    edit_welfare({
      variables:{
        info:{
          customTags:values.customTags,
          restRule:values.restRule,
          overtimeWorkDegree:values.overtimeWorkDegree,
          welfare: [],
          workRule:values.worktime===1?[values.startTime.format('HH:mm:ss'),values.endTime.format('HH:mm:ss')]:[]
        }
      }
    }).then(()=>{
      message.success('保存成功').then()
    }).catch((e)=>{
      message.error(e.graphQLErrors?.[0].message).then()
    })
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (form.getFieldValue('worktime') ===1 && !value) {
      return promise.reject('');
    }
    return promise.resolve();
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
          <Form.Item label="工作时间" name='worktime' rules={[{required:true}]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}><Space>固定时间
                  <Form.Item
                    name='startTime'
                    noStyle
                    rules={[
                      {
                        validator: checkConfirm,
                      }
                    ]}
                  >
                    <TimePicker size={"small"} placeholder='选择开始时间' showNow={false}/>
                  </Form.Item>
                  <Form.Item
                    name='endTime'
                    noStyle
                  >
                    <TimePicker size={"small"} placeholder='选择开始时间' showNow={false} />
                  </Form.Item>
                </Space></Radio>
                <Radio value={2}>弹性工作</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="restRule" label="作息时间(选填)">
            <Radio.Group>
              <Radio value="TwoDayOffPerWeekend">周末双休</Radio>
              <Radio value="OneDayOffPerWeekend">单休</Radio>
              <Radio value="StaggerWeekends">大小周</Radio>
              <Radio value="d">排版轮休</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="overtimeWorkDegree" label="加班情况(选填)">
            <Radio.Group>
              <Radio value="Paid">有偿加班</Radio>
              <Radio value="None">不加班</Radio>
              <Radio value="SomeTime">偶尔加班</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="customTags" label="福利标签">
            <Select
              placeholder="输入任意内容回车"
              mode="tags"
              style={{width: '100%'}}
              options={options}
            >{[]}</Select>
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
