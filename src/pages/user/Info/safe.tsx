import {Button, Card, Form, message, Space} from "antd";
import ProForm, {ProFormText, ModalForm, ProFormCaptcha} from "@ant-design/pro-form";
import {useState} from "react";
import {LockOutlined} from "@ant-design/icons";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 9},
}
const Title = ({ userInfo })=>{
  const [form] = Form.useForm();
  const [passwordUpdateShow, setPasswordUpdateShow] = useState(false);

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };


  const [newNameType, setNewNameType] = useState('')
  const [newName, setNewName] = useState('')
  const [newCode, setNewCode] = useState('')

  const sendCodeResponse = () => {
  	message.success('发送成功!')
  }

  const onSubmitResponse = () => {
  	message.success('修改成功!')
		setNewNameType('')
		setNewName('')
		setNewCode('')
  }

  const newNameTypeValue = [
  	{ value: 'phone', title: '手机号', sendCode: async () => {
  		await HTAPI.StaticSendSms({ phoneNumber: newName })
  	}, onSubmit: () => {
  		HTAPI.UserVerifyCodeConsume({
    		info: {
    			phoneNumber: newName,
    			verifyCode: newCode,
    			operation: 'UserChangePhoneNumber',
    		}
    	}).then(response => {
    		HTAPI.UserChangePhoneNumber({ newNum: newName }).then(onSubmitResponse)
    	})
  	} },
  	{ value: 'email', title: '邮箱', sendCode: async () => {
  		await HTAPI.StaticSendEmail({ email: newName })
  	}, onSubmit: () => {
  		HTAPI.UserEditEmail({ email: newName, code: newCode }).then(onSubmitResponse)
  	} },
  ].find(item => item.value == newNameType)



  return  <Card>
    <ProForm<{
      name: string;
      company?: string;
    }>
      // {...formItemLayout}
      layout={'horizontal'}
      onFinish={async () => {
      }}
      initialValues={{
         password:'',
         phone: userInfo?.phone_number,
         mail: userInfo?.email
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
          addonAfter={<a onClick={()=>setNewNameType('phone')}>修改手机号</a>}
          readonly
        />
        <ProFormText
          width="md"
          name="mail"
          label="邮箱"
          addonAfter={<a onClick={()=>setNewNameType('email')}>修改邮箱</a>}
          readonly
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
          addonAfter={<a onClick={()=>{
          	global.TODO_TOAST()
          	// setPasswordUpdateShow(true)
          }}>修改密码</a>}
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
      	await HTAPI.UserVerifyCodeConsume({
      		info: {
      			phoneNumber:values.phone,
            verifyCode:values.captcha,
            operation:'UserResetPassword'
      		}
      	})
        await HTAPI.UserResetPassword({
      		info:{
      			phoneNumber:values.phone,
            password:values.password,
            confirmPassword:values.confirmPassword
          }
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
              await HTAPI.StaticSendSms({
              	phoneNumber: phone
              })
              message.success('验证码发送成功')
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
      title={`新${newNameTypeValue?.title}`}
      width={480}
      visible={(newNameType?.length ?? 0) > 0}
      modalProps={{
        destroyOnClose: false,
        onCancel: () => {
        	setNewNameType('')
        }
      }}
      onFinish={async () => {
      	newNameTypeValue?.onSubmit()
      }}
    >

      <ProFormText 
      	name="phone" 
      	label={newNameTypeValue?.title} 
      	rules={[{ required: true, message: `输入${newNameTypeValue?.title}` }]} 
      	value={newName}
      	onChange={(e) => {
          const {value} = e.target
          setNewName(value)
        }}
      />
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
          	if ((newName?.length ?? 0) <= 0) {
          		message.error(`请输入${newNameTypeValue?.title}`)
          		throw new Error('')
          	}
          	await newNameTypeValue?.sendCode()
          	await sendCodeResponse()
          }}
          value={newCode}
          onChange={(e) => {
	          const {value} = e.target
	          setNewCode(value)
	        }}
        />
      </div>
    </ModalForm>
  </Card>
}

export default Title
