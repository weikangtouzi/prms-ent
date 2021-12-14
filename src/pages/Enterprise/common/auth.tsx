import {Form, Input, Button, Result, Card} from 'antd';
import {useState} from 'react';
import { FileSearchOutlined} from '@ant-design/icons';
import {tailFormItemLayout, formItemLayout} from '@/common/js/config';
import UpButton from "@/components/Upload";
import {useMutation} from "@apollo/client";
import {EnterpriseIdentify} from "@/services/gqls/enterprise";

const Auth = () => {
  const [form] = Form.useForm();
  const [inCheck] = useState(false);
  const [enterpriseIdentify] = useMutation<void,Enterprise.Identification_Content>(EnterpriseIdentify)

  const onFinish = (values: any) => {
    // 企业认证提交
    console.log('Received values of form: ', values);
    enterpriseIdentify({
      variables:{
        charter:values.charter,
        enterpriseName:values.enterpriseName
      }
    }).then(res=>{
      console.log(res)
    })
  };


  return (
    <Card bodyStyle={{padding:'48px'}}>
      <div className="mx560">
        {!inCheck && (
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
        {inCheck && (
          <Result
            icon={<FileSearchOutlined/>}
            title="认证审核中"
            subTitle="预计两个工作日内完成"
          />
        )}
      </div>
    </Card>
  );
};

export default Auth;
