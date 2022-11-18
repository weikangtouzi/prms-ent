import {Form, Input, Button, Result, Card, message, Tabs} from 'antd';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import UpButton from "@/components/Upload";
import type {ApolloError} from "@apollo/client";
import {useState} from "react";


interface authProp {
  status: "None" | "Failed" | "Passed" | "Waiting"|undefined
}
const {TabPane} = Tabs;
const Auth = (props: authProp) => {
  const {status} = props
  const [form] = Form.useForm();
  const [customStatus,setCustomStatus] = useState<string|undefined>(undefined)

  const onFinish = (values: any) => {
    // 企业认证提交
    console.log('Received values of form: ', values);
    enterpriseIdentify({
      variables: {
        info: {
          charter: values.charter,
          enterpriseName: values.enterpriseName
        }
      }
    }).then(() => {
      setCustomStatus('Waiting')
    })
  };


  return (
    <Tabs>
      <TabPane tab='企业认证' key='auth'>
        <Card bodyStyle={{padding: '48px'}}>
          <div className="mx560">
            {((status==='None'&& customStatus!=='Waiting')||(customStatus==='None')) && (
              <Form
                {...formItemLayout}
                form={form}
                name="Auth"
                onFinish={onFinish}
                initialValues={{}}
                scrollToFirstError
              >
                <Form.Item
                  name="enterpriseName"
                  label="全称"
                  rules={[{required: true, message: '请输入公司全称!'}]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  name="charter"
                  label="营业执照"
                  rules={[{required: true, message: '请上传营业执照!'}]}
                  extra="只支持.jpg/.png格式(单张)"
                >
                  <UpButton/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            )}
            {(status==='Waiting'||customStatus==='Waiting') && (
              <Result
                icon={<img src={'/images/enterprise/waiting.png'} alt={'waiting'} style={{width:'100px'}}/>}
                title="认证审核中"
                subTitle="预计两个工作日内完成"
              />
            )}
            {(status==='Failed' && customStatus!=='None') && (
              <Result
                icon={<img src={'/images/enterprise/failed.png'} alt={'waiting'} style={{width:'100px'}}/>}
                title="审核失败"
                subTitle="失败原因：您提交的企业审核信息未通过，请重新填写后提交。"
                extra={<Button type="primary" onClick={()=>{setCustomStatus('None')}}>重试</Button>}
              />
            )}
          </div>
        </Card>
      </TabPane>
    </Tabs>

  );
};

export default Auth;
