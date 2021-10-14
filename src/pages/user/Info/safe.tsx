import {Button, message, Space} from "antd";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import ProForm, {ProFormText, ModalForm, ProFormCaptcha} from "@ant-design/pro-form";
import {useState} from "react";
import {LockOutlined} from "@ant-design/icons";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 9},
}
const Title = ()=>{
  const [isEditor,setIsEditor] = useState(false)
  const [passwordUpdateShow, setPasswordUpdateShow] = useState(false);
  const [phoneUpdateShow, setPhoneUpdateShow] = useState(false);

  return  <PageHeaderWrapper>
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
      title="修改密码"
      width={480}
      visible={passwordUpdateShow}
      onFinish={async () => {
        message.success('提交成功');
        return true;
      }}
      onVisibleChange={setPasswordUpdateShow}
    >

      <ProFormText.Password name="oldPass"  label="原密码"  rules={[{ required: true, message: '请输入原密码!' }]}/>
      <ProFormText.Password name="newPass"  label="新密码" rules={[{ required: true, message: '请输入新密码!' }]}/>
      <ProFormText.Password name="confirmPass"  label="确认密码"
                            rules={[
                              { required: true, message: '请输入原密码!' },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  const newPass = getFieldValue('newPass');
                                  if (value) {
                                    if(value !== newPass){
                                      return Promise.reject(new Error('新旧密码不一致!'));
                                    }
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('新旧密码不一致!'));
                                },
                              }),
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
  </PageHeaderWrapper>
}

export default Title
