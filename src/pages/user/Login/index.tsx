import styles from './index.less';
import ProForm, {ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {Alert, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {FormattedMessage} from '@@/plugin-locale/localeExports';
import React, {useState} from 'react';
import {useModel} from '@@/plugin-model/useModel';
import {login} from '@/services/ant-design-pro/api';
import {history} from '@@/core/history';
import {useLazyQuery} from '@apollo/client'
import {GET_LOGIN} from "@/services/gqls/login";

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
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
  const {initialState, setInitialState} = useModel('@@initialState');

  const [loadLogin, {called, loading, data}] = useLazyQuery(
    GET_LOGIN,
    {
      variables:
        {
          info: {
            account: '123',
            password: {
              isVerifyCode: false,
              value: '123'
            }
          }
        },
    }
  );
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
      // loadLogin()
      // return;
      const msg = await login({...values, type: 'account'});
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = '登录成功';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as { redirect: string };
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
  const {status, type: loginType} = userLoginState;

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <img src="/images/login/login.png" alt="login"/>
      </div>
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <img src="/images/login/logo.png" alt="logo" className={styles.logo}/>
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
              {status === 'error' && loginType === 'account' && (
                <LoginMessage content="账户或密码错误(admin/ant.design)"/>
              )}
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon}/>,
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
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
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

              {status === 'error' && loginType === 'mobile' && (
                <LoginMessage content="验证码错误"/>
              )}
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录"/>
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码"/>
                </a>
              </div>
            </ProForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
