import {gql} from '@apollo/client';

// 获取企业简要信息
export const GET_JOB_LIST = gql`
  query get_job_list($page:Int,$pageSize:Int,$title: String,$status: JobStatus,$workerId: Int) {
    UserGetJobListByEntId(page:$page,pageSize: $pageSize,title:$title,status: $status,workerId: $workerId,) {
      count,
      data{
        ... on JobDataBriefly{
          id,
          job_id,
          title,
          min_salary,
          max_salary,
          min_education,
          min_experience,
          address_description,
          category,
          hr_name,
          views,
          logo,
          ontop,
          resumeCount,
          status,
          createdAt
        }
      }
    }
  }
`;

// 发布岗位信息
export const PUBLISH_JOB = gql`
  mutation publish_job($info:JobPost!){
    HRPostJob(info:$info)
  }
`
