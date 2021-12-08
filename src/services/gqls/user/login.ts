import { gql } from '@apollo/client';

// 登录
export const GET_LOGIN = gql`
  query userNameLogin($info: LogIn!) {
    UserLogIn(info: $info) {
      createdAt
      token
      username
    }
  }
`;

// 获取验证码
export const Get_Fake_Captcha = gql`
  query senSMS($phoneNumber: String!) {
    StaticSendSms(phoneNumber: $phoneNumber)
  }
`;

// 验证码登录
export const Login_By_Phone = gql`
  query VerifyCodeAndLogin($info: VerifyInfo!) {
    UserVerifyCodeConsume(info: $info)
  }
`;
