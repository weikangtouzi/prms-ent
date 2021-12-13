import { gql } from '@apollo/client';

// 登录
export const GET_ENTERPRISE_INFO = gql`
  query get_enterprise_info {
    UserGetEnterpriseDetail_EntInfo {
      enterprise_name,
      enterprise_logo,
#      business_nature,
#      industry_involved,
#      enterprise_profile,
#      enterprise_financing,
#      enterprise_size,
#      enterprise_welfare,
#      tags,
#      enterprise_coordinates,
#      enterprise_loc_detail,
#      extra_attribute,
#      rest_rule,
#      overtime_work_degree,
#      homepage,
#      established_time,
#      tel,
#      work_time,
#      createdAt,
#      job_counter
    }
  }
`;
