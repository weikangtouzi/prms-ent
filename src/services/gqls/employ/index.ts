import {gql} from '@apollo/client';

// 获取职位信息
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

// 根据id获取岗位详情
// export const GET_JOB_BY_ID = gql`
// `

// 修改岗位信息
export const EDIT_JOB = gql`
  mutation edit_job($info:JobEdit!){
    HREditJob(info:$info)
  }
`

// 寻找人才列表
export const GET_SEARCHER_LIST = gql`
   query get_searcher_list($page:Int,$pageSize:Int,$education: String,$salary: [Int]){
     ENTSearchCandidates(page:$page,pageSize: $pageSize,education: $education,salary:$salary,sortByUpdatedTime:false){
       count,
       data{
         age,
         aimed_city,
         education,
         experience,
         gender,
         id,
         name,
         salary,
         job_expectation,
         job_status,
         last_log_out_time,
       }
     }
   }
`

// 人才管理沟通中
export const GET_COMMUNICATE_LIST  = gql`
   query get_communicate_list{
     UserGetContractList{
       ... on Talent{
         age,
         id,
         city_expectation,
         exp,
         gender,
         job,
         job_category_expectation,
         job_status,
         last_log_out_time,
         last_msg,
         last_msg_time,
         logo,
         name,
         salary_expectations
       }
     }
   }
`

// 人才管理，待面试，已面试，不合适
export const GET_PEOPLE_LIST_OF_INTERVIEW  = gql`
  query get_people_list_of_interview($education:String,$expectation:String,$page:Int,$pageSize:Int,$salary: [Int],$sortByUpdatedTime:Boolean,$status: InterviewStatus){
    ENTGetCandidatesWithInterviewStatus(education: $education,expectation: $expectation,page: $page,pageSize: $pageSize,salary: $salary,sortByUpdatedTime: $sortByUpdatedTime,status: $status){
      count,
      data{
        age,
        name,
        salary,
        gender,
        skills,
        aimed_city,
        education,
        experience,
        id,
        job,
        job_expectation,
        job_status,
        last_log_out_time,
        personal_advantage,
      }
    }
  }
`
