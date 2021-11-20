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

// 用户登录返回值
export interface UserData {
  createdAt: string;
  token: string;
  username: string;
}


// 用户登录参数
export interface UserNameLoginVar {
  info: {
    account: string;
    password: string;
    deviceId?: string
  };
}

// 获取验证码参数
export interface  FakeCodeParams{
  phoneNumber: string
}
