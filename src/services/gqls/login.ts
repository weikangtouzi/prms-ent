import {gql} from "@apollo/client";

export const GET_LOGIN = gql`
  query userNameLogin( $info:Login! ) {
    UserLogIn(info:$info) {
      createdAt,
      token,
      username,
    }
  }
`

export interface UserInfo {
  createdAt: string,
  token: string,
  username: string,
}
