import {Form, Button, Select, Card, Radio, Space, TimePicker, message} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import moment from "moment";
import HTAuthManager from '@/common/auth/common/model/HTAuthManager'

const options = [
  {value: '周末双休', label: '周末双休'},
  {value: '年终奖', label: '年终奖'},
];

interface BonusProps {
  overtime_work_degree?: Enterprise.overtimeWorkDegreeType,
  rest_rule?: Enterprise.EnterpriseRestRuleType,
  tags?: string[],
  work_time?: string
}

const Bonus = (props: BonusProps) => {
  const {overtime_work_degree,rest_rule,tags=[],work_time=''} = props
  const [form] = Form.useForm();
  const format = 'HH:mm';



  const onFinish = (values: Enterprise.welfareType) => {
  	HTAPI.ENTEditEnterpriseWorkTimeAndWelfare({
  		info: {
        customTags: [],
        restRule: values.restRule,
        overtimeWorkDegree: values.overtimeWorkDegree,
        welfare: values.customTags,
        workRule: values.worktime === 1 ? `${values.startTime.format(format)}-${values.endTime.format(format)}` : ""
      }
  	}).then(() => {
      message.success('保存成功').then()
    }).catch((e) => {
      
    })
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (form.getFieldValue('worktime') === 1 && !value) {
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
          initialValues={{
            restRule:rest_rule,
            overtimeWorkDegree:overtime_work_degree,
            customTags:tags,
            worktime:work_time?1:2,
            startTime:work_time?moment(work_time.split('-')[0],format):undefined,
            endTime:work_time?moment(work_time.split('-')[1],format):undefined
          }}
          scrollToFirstError
          disabled={HTAuthManager?.keyValueList?.enterpriseRole?.toLowerCase() != 'admin'}
        >

          <Form.Item label="工作时间" name='worktime' rules={[{required: true}]} className={'needPt5'}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>固定时间
                  <div style={{margin: '12px 0 8px'}}>
                    <Space>
                      <Form.Item
                        name='startTime'
                        noStyle
                        rules={[
                          {
                            validator: checkConfirm,
                          }
                        ]}
                      >
                        <TimePicker placeholder='选择开始时间' showNow={false} style={{width: '185px'}} format={format}/>
                      </Form.Item> -
                      <Form.Item
                        name='endTime'
                        noStyle
                      >
                        <TimePicker placeholder='选择开始时间' showNow={false} style={{width: '185px'}} format={format}/>
                      </Form.Item>
                    </Space>
                  </div>
                </Radio>
                <Radio value={2}>弹性工作</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="restRule" label="作息时间">
            <Radio.Group>
              <Radio value="TwoDayOffPerWeekend">周末双休</Radio>
              <Radio value="OneDayOffPerWeekend">单休</Radio>
              <Radio value="ShiftWork">排班轮休</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="overtimeWorkDegree" label="加班情况">
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
