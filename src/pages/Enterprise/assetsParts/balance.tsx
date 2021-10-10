import ProForm, {ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {Card, Cascader, Col, Form, message, Row, Space} from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 9},
}
const residences = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖区',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '建邺区',
          },
        ],
      },
    ],
  },
];
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const Balance = ()=>{
  return <Space direction="vertical" style={{width:"100%"}}>
    <Card title="结算银行卡" extra={<a href="#">修改</a>} >
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        {...formItemLayout}
        layout={'horizontal'}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        params={{}}
        request={async () => {
          await waitTime(100);
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
          };
        }}
      >

        <div>
          <ProFormText
            width="md"
            name="name"
            label="开户名称"
            readonly
            placeholder="请输入对公账户开户名称"
          />
          <ProFormText
            width="md"
            name="company"
            label="营业执照号码"
            placeholder="请输入营业执照号码" />
          <Form.Item
            name="region"
            rules={[{ required: true }]}
            label="开户行所在地">
            <Cascader options={residences} style={{width:'328px'}}/>
          </Form.Item>
          <ProFormText
            name="account"
            width="md"
            label="银行账号"
            placeholder="请输入银行账号"
          />
          <ProFormSelect
            options={[
              {
                value: "chapter",
                label: "中国银行",
              },
              {
                value: "chapter2",
                label: "工商银行",
              },
            ]}
            width="md"
            name="useMode"
            label="开户银行"
          />
          <ProFormText
            name="bank"
            width="md"
            label="开户支行"
            placeholder="请输入对公账户开户支行名称"
          />
        </div>
      </ProForm>
    </Card>
    <Row gutter={16}>
      <Col className="gutter-row" span={12}>
        <Card title="开具发票" >
          <ProForm<{
            name: string;
            company?: string;
          }>
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values);
              message.success('提交成功');
            }}
            params={{}}
            request={async () => {
              await waitTime(100);
              return {
                name: '蚂蚁设计有限公司',
                useMode: 'chapter',
              };
            }}
            submitter={false}
          >
            <div>
              <ProFormText
                width="md"
                name="name"
                label="发票类型"
                readonly
              />
              <ProFormText
                width="md"
                name="company"
                readonly
                label="开户行名称"/>
              <ProFormText
                width="md"
                name="company"
                readonly
                label="纳税人识别号"/>
              <ProFormText
                name="account"
                width="md"
                readonly
                label="电话"/>
              <ProFormText
                name="account"
                width="md"
                readonly
                label="开户银行"/>
              <ProFormText
                name="account"
                width="md"
                readonly
                label="开户账号"/>
            </div>
          </ProForm>
        </Card>
      </Col>
      <Col className="gutter-row" span={12}>
        <Card title="结算银行卡">
          <ProForm<{
            name: string;
            company?: string;
            useMode?: string;
          }>
            {...formItemLayout}
            layout={'horizontal'}
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values);
              message.success('提交成功');
            }}
            submitter={false}
            params={{}}
            request={async () => {
              await waitTime(100);
              return {
                name: '蚂蚁设计有限公司',
                useMode: 'chapter',
              };
            }}
          >

            <div>
              <ProFormText
                width="md"
                name="name"
                label="收件单位"
                readonly
              />
              <ProFormText
                width="md"
                name="company"
                readonly
                label="收件地址"/>
              <ProFormText
                width="md"
                name="company"
                readonly
                label="邮编"/>
              <ProFormText
                name="account"
                width="md"
                readonly
                label="收件人"/>
            </div>
          </ProForm>
        </Card>
      </Col>
    </Row>
  </Space>
}

export default Balance;
