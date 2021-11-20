import styles from './index.less';
import ProForm, {ProFormCaptcha, ProFormText} from '@ant-design/pro-form';
import { Alert, message, Tabs } from 'antd';
import {LockOutlined, MobileOutlined, UserOutlined} from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { login } from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { useLazyQuery } from '@apollo/client';
import type {FakeCodeParams, UserData, UserNameLoginVar} from '@/services/gqls/login';
import { GET_LOGIN,Get_Fake_Captcha } from '@/services/gqls/login';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');
  const [loginAction] = useLazyQuery<UserData, UserNameLoginVar>(GET_LOGIN, {
    variables: {
      info: {
        account: '18800000002',
        password: 'word_002',
        deviceId: '123'
      },
    },
    onCompleted: (userData) => {
      console.log(userData.createdAt);
    },
  });

  // 发送验证码
  const [get_sms_code] = useLazyQuery<void,FakeCodeParams>(Get_Fake_Captcha,{
    onCompleted: () => {
      message.success('验证码发送成功').then();
    },
    onError:(e)=>{
      const msg =  (e.graphQLErrors[0].extensions as any).error.phoneNumber
      message.error('发送失败'+msg).then()
    }
  });
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      loginAction()
      return;
      const msg = await login({ ...values, type: 'account' });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = '登录成功';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <img src="/images/login/login.png" alt="login" />
      </div>
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <img src="/images/login/logo.png" alt="logo" className={styles.logo} />
          <h3>
            欢迎使用<span>趁早找企业端</span>
          </h3>
          <div className={styles.main}>
            <ProForm
              initialValues={{
                autoLogin: true,
              }}
              submitter={{
                searchConfig: {
                  submitText: '登录',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane
                  key="account"
                  tab='账户密码登录'
                />
                <Tabs.TabPane
                  key="mobile"
                  tab='手机号登录'
                />
              </Tabs>
              {status === 'error' && loginType === 'account' && (
                <LoginMessage content="账户或密码错误(admin/ant.design)" />
              )}
              {/*手机号登录*/}
              {type === 'mobile' && (
                <>
                  <ProFormText
                    fieldProps={{
                      size: 'large',
                      prefix: <MobileOutlined className={styles.prefixIcon} />,
                    }}
                    name="phone"
                    placeholder='手机号'
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号！',
                      },
                      {
                        pattern: /^1\d{10}$/,
                        message: (
                          <FormattedMessage
                            id="pages.login.phoneNumber.invalid"
                            defaultMessage="手机号格式错误！"
                          />
                        ),
                      },
                    ]}
                  />
                  <ProFormCaptcha
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                    }}
                    captchaProps={{
                      size: 'large',
                    }}
                    placeholder='请输入验证码'
                    captchaTextRender={(timing, count) => {
                      if (timing) {
                        return `${count} 获取验证码`;
                      }
                      return '获取验证码';
                    }}
                    phoneName="phone"
                    name="captcha"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage
                            id="pages.login.captcha.required"
                            defaultMessage="请输入验证码！"
                          />
                        ),
                      },
                    ]}
                    onGetCaptcha={async (phone) => {
                      // 判断phone是否合法
                      try{
                        await get_sms_code({
                          variables: {
                            phoneNumber: phone,
                          }
                        });
                      }catch (e){
                        message.error('发送失败!');
                      }
                    }}
                  />
                </>
              )}
              {/*账号密码登录*/}
              {type === 'account' &&
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="用户名: admin or user"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="密码: ant.design"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
              }
              {status === 'error' && loginType === 'mobile' && (
                <LoginMessage content="验证码错误" />
              )}
            </ProForm>
            <a
              style={{
                marginTop:'8px',
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
