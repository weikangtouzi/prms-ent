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
      job_counter
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

export const EnterpriseIdentify = gql`
  mutation enterprise_identify($info:EnterpriseCharterSencorRequest!) {
    UserEnterpriseIdentify(info: $info)
  }
`
