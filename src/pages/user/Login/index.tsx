import styles from './index.less';
import ProForm, { ProFormCaptcha, ProFormText, LoginForm } from '@ant-design/pro-form';
import { Alert, message, Tabs } from 'antd';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { history } from '@@/core/history';
import HTAuthManager from '@/common/auth/common/model/HTAuthManager'

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
  const loginSuccess = async () => {
    /** 此方法会跳转到 redirect 参数所在的位置 */
    if (!history) return;
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    // history.push(redirect || '/');
    window.location = redirect || '/'
  };
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');

  const { status, type: loginType } = userLoginState;

  const handleSubmit = async (values: API.LoginParams) => {
  	const callLoginApi = () => {
  		HTAPI.UserLogIn({
      	info: {
	        account: type != 'mobile' ? values?.username : values.phone,
	        password: type != 'mobile' ? values?.password : undefined,
	      },
      }).then(response => {
      	const chooseAdminAndHrRole = () => {
					return new Promise((resolve, reject) => {
						HTAPI.UserChooseOrSwitchIdentity({
				  		targetIdentity: 'EnterpriseUser',
							role: 'Admin'
				  	}, { showError: false }, { Authorization: response.token }).then(response => {
				  		resolve({ token: response, role: 'Admin' })
				  	}).catch(() => {
				  		HTAPI.UserChooseOrSwitchIdentity({
				    		targetIdentity: 'EnterpriseUser',
								role: 'HR'
				    	}, { }, { Authorization: response.token }).then(response => {
				    		resolve({ token: response, role: 'HR' })
				  		}).catch(e => {
				  			reject(e)
				  		})
				  	})
					})
				}
				chooseAdminAndHrRole().then(response => {
					HTAuthManager.updateKeyValueList({ enterpriseToken: response.token, enterpriseRole: response.role })
      		HTAPI.UserChooseOrSwitchIdentity({
	      		targetIdentity: 'PersonalUser',
						role: 'PersonalUser'
	      	}).then(response => {
	      		HTAPI.CandidateGetAllJobExpectations({}, {}, { Authorization: response }).then((expectationList) => {
							if ((expectationList?.length ?? 0) <= 0) {
								loginSuccess()
								return
							}
							HTAuthManager.updateKeyValueList({ userToken: response })
							loginSuccess()
						}).catch(() => {
							loginSuccess()
						})
	      	}).catch(() => {
	      		loginSuccess()
	      	})
				})
      })
  	}
    if (type === 'mobile') {
      HTAPI.UserVerifyCodeConsume({
    		info: {
    			phoneNumber: values.phone,
          verifyCode: values.captcha,
          operation: 'UserLogIn'
    		}
    	}).then(() => {
    		callLoginApi()
    	})
    } else {
      callLoginApi()
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <img src={'/images/login/login.png'} alt="login" />
      </div>
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <img src={'/images/login/logo.png'} alt="logo" className={styles.logo} />
          <h3>
            欢迎使用<span>趁早找企业端</span>
          </h3>
          <div className={styles.main}>
            <LoginForm
              initialValues={{
                autoLogin: true,
              }}
              actions={[]}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              <Tabs activeKey={type} onChange={setType}>
                <Tabs.TabPane key="account" tab="账户密码登录" />
                <Tabs.TabPane key="mobile" tab="手机号登录" />
              </Tabs>
              {status === 'error' && loginType === 'account' && (
                <LoginMessage content="账户或密码错误" />
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
                    placeholder="手机号"
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
                    placeholder="请输入验证码"
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
                      try {
                        await HTAPI.StaticSendSms({
					              	phoneNumber: phone
					              })
                      } catch (e) {
                        message.error('发送失败!');
                      }
                    }}
                  />
                </>
              )}
              {/*账号密码登录*/}
              {type === 'account' && (
                <>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder="手机号"
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
                    placeholder="密码"
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
              )}
              {status === 'error' && loginType === 'mobile' && (
                <LoginMessage content="验证码错误" />
              )}
            </LoginForm>
            {/*<a
              style={{
                marginTop: '8px',
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
