import {gql} from '@apollo/client';

// 获取企业简要信息
export const GET_ENTERPRISE_INFO = gql`
  query get_enterprise_info {
    UserGetEnterpriseDetail_EntInfo {
      enterprise_name,
      enterprise_logo
    }
  }
`;

// 获取企业简要信息
export const GET_ENTERPRISE_FULL_INFO = gql`
  query get_enterprise_info {
    UserGetEnterpriseDetail_EntInfo {
      enterprise_name,
      enterprise_logo,
      business_nature,
      industry_involved,
      enterprise_profile,
      enterprise_financing,
      enterprise_size,
      enterprise_welfare,
      tags,
      enterprise_coordinates,
      enterprise_loc_detail,
      extra_attribute,
      rest_rule,
      overtime_work_degree,
      homepage,
      established_time,
      tel,
      work_time,
      createdAt,
      job_counter,
      abbreviation
    }
  }
`;

// 检测企业是否完成企业认证
export const Check_Enterprise_Identification = gql`
  query check_enterprise_identification {
    ENTCheckEnterpriseIdentification{
      status,
      enterpriseName,
      charter,
      phoneNumber
    }
  }
`

// 进行企业认证
export const EnterpriseIdentify = gql`
  mutation enterprise_identify($info:EnterpriseCharterSencorRequest!) {
    UserEnterpriseIdentify(info: $info)
  }
`
// 修改企业基本信息
export const editEnterpriseBaseInfo   = gql`
  mutation edit_enterprise_baseInfo($info:EditEnterpriseBasicInfo!) {
    ENTEditEnterpriseBasicInfo(info: $info)
  }
`

// 获取成员列表
export const get_enterprise_member   = gql`
  query get_enterprise_members {
    UserGetEnterpriseDetail_WorkerList{
      createdAt,
      disabled,
      id,
      logo,
      name,
      pos,
      role
    }
  }
`

// 禁用成员
export const setMemberDisable = gql`
  mutation entSetDisabled($workerId:Int!){
    ENTSetDisabled(workerId: $workerId)
  }
`

// 邀请成员
export const invite_member = gql`
  mutation invite_member($phoneNumber:String!,$role:String!) {
    ENTInviteWorkMate(phoneNumber: $phoneNumber,role:$role)
  }
`

// 删除成员
export const del_member = gql`
  mutation del_member($role: EnterpriseRole!,$workerId:Int!) {
    ENTRemoveWorker(role:$role,workerId: $workerId)
  }
`

// 修改企业额外信息
export const edit_enterprise_extra = gql`
  mutation editEnterpriseExtraData($info:String!) {
    ENTEditEnterpriseExtraData (info: $info)
  }
`

// 修改企业福利信息
export const edit_enterprise_welfare = gql`
  mutation editEnterpriseWelfare($info:EnterpriseWorkTimeAndWelfare!) {
    ENTEditEnterpriseWorkTimeAndWelfare (info: $info)
  }
`
