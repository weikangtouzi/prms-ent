import { gql } from '@apollo/client';

export const GET_LOGIN = gql`
  query userNameLogin($info: Login!) {
    UserLogIn(info: $info) {
      createdAt
      token
      username
    }
  }
`;

export interface UserData {
  createdAt: string;
  token: string;
  username: string;
}
export interface UserNameLoginVar {
  info: {
    account: string;
    password: {
      isVerifyCode: boolean;
      value: string;
    };
  };
}
