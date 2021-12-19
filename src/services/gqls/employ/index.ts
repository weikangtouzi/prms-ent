import {gql} from '@apollo/client';

// 获取企业简要信息
export const GET_JOB_LIST = gql`
  query get_job_list($page:Int,$pageSize:Int) {
    UserGetJobListByEntId(page:$page,pageSize: $pageSize) {
      count,
      data{
        createdAt,
        education,
        experience,
        id,
        loc,
        salary,
        title
      }
    }
  }
`;
