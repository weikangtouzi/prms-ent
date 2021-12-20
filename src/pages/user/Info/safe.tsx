import {Button, Card, Form, message, Space} from "antd";
import ProForm, {ProFormText, ModalForm, ProFormCaptcha} from "@ant-design/pro-form";
import {useState} from "react";
import {LockOutlined} from "@ant-design/icons";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Get_Fake_Captcha, Login_By_Phone,reset_password} from "@/services/gqls/user/login";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 9},
}
const Title = ()=>{
  const [isEditor,setIsEditor] = useState(false)
  const [form] = Form.useForm();
  const [passwordUpdateShow, setPasswordUpdateShow] = useState(false);
  const [phoneUpdateShow, setPhoneUpdateShow] = useState(false);
  const [reset_pass]  = useMutation<void,{info: { confirmPassword: string, password: string,phoneNumber?: string}}>(reset_password,{
    fetchPolicy:'network-only'
  })
  const {refetch}  = useQuery<void, User.VerifyCode>(Login_By_Phone, {
    skip:true,
    fetchPolicy:'network-only'
  });
  const [get_sms_code] = useLazyQuery<void, User.FakeCodeParams>(Get_Fake_Captcha, {
    onCompleted: () => {
      message.success('验证码发送成功').then();
    },
    onError: (e) => {
      const msg = (e.graphQLErrors[0].extensions as any).error.phoneNumber;
      message.error('发送失败' + msg).then();
    },
    fetchPolicy:'network-only'
  });

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  return  <Card>
    <ProForm<{
      name: string;
      company?: string;
    }>
      {...formItemLayout}
      layout={'horizontal'}
      onFinish={async () => {
      }}
      initialValues={{
         password:''
      }
      }
      params={{}}
      submitter={false}
    >
      <div>
        <ProFormText
          width="md"
          name="phone"
          label="手机号"
          addonAfter={<a onClick={()=>setPhoneUpdateShow(true)}>修改手机号</a>}
          readonly
        />
        <ProFormText
          width="md"
          name="mail"
          label="邮箱"
          addonAfter={isEditor
            ? <Space>
              <Button type={"primary"}>保存</Button><Button onClick={()=>{setIsEditor(false)}}>取消</Button>
            </Space>
            : <Space>
              <a onClick={()=>setIsEditor(true)}>修改邮箱</a>
            </Space>
          }
          readonly={!isEditor}
        />
        <ProFormText
          width="md"
          name="realname"
          label="实名认证"
          readonly
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码设置"
          addonAfter={<a onClick={()=>setPasswordUpdateShow(true)}>修改密码</a>}
          readonly
        />
      </div>
    </ProForm>

    <ModalForm
      title='修改密码'
      width={480}
      form={form}
      visible={passwordUpdateShow}
      onFinish={async (values) => {
        refetch({
            info:{
              phoneNumber:values.phone,
              operation:'UserResetPassword',
              verifyCode:values.captcha
            }
        }).then(()=>{
          reset_pass({
            variables:{
              info:{
                password:values.password,
                confirmPassword:values.password
              }
            }
          })
        }).catch(()=>{
          message.error('校验失败')
        })
      }}
      onVisibleChange={setPasswordUpdateShow}
    >

      <ProFormText name="phone"  label="手机号"  rules={[
        {
          required: true,
          message: '请输入手机号！',
        },
        {
          pattern: /^1\d{10}$/,
          message:'手机号格式错误',
        },
      ]}/>
      <div>
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async (phone) => {
            // 判断phone是否合法
            try {
              await get_sms_code({
                variables: {
                  phoneNumber: phone,
                },
              });
            } catch (e) {
              message.error('发送失败!');
            }
          }}
        />
      </div>
      <ProFormText.Password name="password"  label="新密码"  rules={[
        {
          required: true,
          message: '请输入新密码！',
        },
      ]}/>
      <ProFormText.Password name="confirmPassword"  label="确认密码"  rules={[
        {
          required: true,
          message: '请输入新密码！',
        },
        {
          validator: checkConfirm,
        },
      ]}/>
    </ModalForm>
    <ModalForm
      title="修改手机号"
      width={480}
      visible={phoneUpdateShow}
      onFinish={async () => {
        message.success('提交成功');
        return true;
      }}
      onVisibleChange={setPhoneUpdateShow}
    >

      <ProFormText name="phone"  label="原密码"  rules={[{ required: true, message: '请输入手机号!' }]}/>
      <div>
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          captchaProps={{
            size: 'large',
          }}
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async () => {
            message.success('获取验证码成功！验证码为：1234');
          }}
        />
      </div>
    </ModalForm>
  </Card>
}

export default Title
