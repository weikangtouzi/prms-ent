import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic,Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ProFormDigit, ProFormText, StepsForm } from '@ant-design/pro-form';
import styles from './index.less';

export interface StepDataType {
  payAccount: string;
  receiverAccount: string;
  receiverName: string;
  amount: string;
  receiverMode: string;
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
}

const { Paragraph } = Typography;

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="收款账户名"> {payAccount}</Descriptions.Item>
      <Descriptions.Item label="收款银行卡"> {receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="收款银行"> {receiverName}</Descriptions.Item>
      <Descriptions.Item label="提前金额">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              元
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
}> = (props) => {
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            再转一笔
          </Button>
          <Button>查看账单</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const StepForm: React.FC<Record<string, any>> = () => {
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();

  return (
    <PageContainer content="请按照下面的步骤完成提现">
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            {...formItemLayout}
            layout={'horizontal'}
            formRef={formRef}
            title="填写提现金额"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormText
              label="收款账户名"
              name="payAccount"
              width="md"
              rules={[
                { required: true, message: '请输入收款人账户' },
              ]}
              placeholder="请输入对公账户名"
            />

            <ProFormText
              label="收款银行卡"
              width="md"
              name="receiverAccount"
              rules={[
                { required: true, message: '请输入收款银行卡' },
              ]}
              placeholder="请输入收款银行卡"
            />
            <ProFormDigit
              label="提现金额"
              name="amount"
              width="md"
              rules={[
                { required: true, message: '请输入提现金额' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: '请输入合法金额数字',
                },
              ]}
              placeholder="请输入金额"
              fieldProps={{
                prefix: '￥',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="确认转账信息"  layout={'horizontal'}>
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="平台收到发票确认后，资金将直接打入结算账户，无法退回。"
                style={{ marginBottom: 24 }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider style={{ margin: '24px 0' }} />
              <ProFormText.Password
                label="支付密码"
                width="md"
                name="password"
                required={false}
                rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>提现到银行卡</h4>
          <Paragraph>
            前提:在【资产管理-结算信息】绑定结算银行卡<br/>
            步骤1：发起提现<br/>
            步骤2：开具对应金额发票寄给平台<br/>
            步骤3：平台收到发票确认金额，进行打款
          </Paragraph>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
