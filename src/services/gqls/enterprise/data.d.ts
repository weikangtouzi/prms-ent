declare namespace Enterprise {
  interface BaseInfo {
    business_nature: 'ForeignVentures'|'ForeignFundedEnterprises'|'PrivateEnterprise'|'StateOwnedEnterprises'|'Extra';
    createdAt: string;
    enterprise_coordinates: number[];
    enterprise_financing: 'NotYet'|'AngelFinancing'|'A'|'B'|'C'|'D'|'Listed'|'NoNeed'
    enterprise_loc_detail: string[]
    enterprise_logo: string
    enterprise_name: string
    enterprise_profile: string
    enterprise_size: 'LessThanFifteen'|'FifteenToFifty'|'FiftyToOneHundredFifty'|'OneHundredFiftyToFiveHundreds'|'FiveHundredsToTwoThousands'|'MoreThanTwoThousands'
    enterprise_welfare: string[]
    established_time: number
    extra_attribute: string
    homepage: string
    industry_involved: string[]
    job_counter: number
    overtime_work_degree: string
    rest_rule: string
    tags: string
    tel: number
    work_time: number
  }
  interface Check_Identification{
    charter: string
    enterpriseName: string
    phoneNumber: string
    status: "None"|"Failed"|"Passed"|"Waiting"
  }
  interface Identification_Content{
    charter: string
    enterpriseName: string
    phoneNumber?: string
  }
}
