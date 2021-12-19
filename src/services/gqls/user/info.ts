import { gql } from '@apollo/client';

// 获取个人信息
export const GET_USERINFO = gql`
  query get_userinfo {
    UserGetBasicInfo {
      birth_date,
      current_city,
      education,
      first_time_working,
      gender,
#      image_url,
      username,
    }
  }
`;

// 修改个人信息
export const UPDATE_USERINFO = gql`
  mutation UPDATE_USERINFO($info:BasicData!) {
    UserEditBasicInfo(info: $info)
  }
`;
