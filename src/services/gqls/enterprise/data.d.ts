declare namespace Enterprise {
  type EnterpriseFinancing = 'NotYet' | 'AngelFinancing' | 'A' | 'B' | 'C' | 'D' | 'Listed' | 'NoNeed'
  type EnterpriseSize ='LessThanFifteen' | 'FifteenToFifty' | 'FiftyToOneHundredFifty' | 'OneHundredFiftyToFiveHundreds' | 'FiveHundredsToTwoThousands' | 'MoreThanTwoThousands'
  interface BaseInfo {
    business_nature: 'ForeignVentures' | 'ForeignFundedEnterprises' | 'PrivateEnterprise' | 'StateOwnedEnterprises' | 'Extra';
    createdAt: string;
    enterprise_coordinates: number[];
    enterprise_financing: EnterpriseFinancing
    enterprise_loc_detail: string[]
    enterprise_logo: string
    enterprise_name: string
    enterprise_profile: string
    enterprise_size: EnterpriseSize
    enterprise_welfare: string[]
    established_time: string
    extra_attribute: string
    homepage: string
    industry_involved: string[]
    job_counter: number
    overtime_work_degree: overtimeWorkDegreeType
    rest_rule: EnterpriseRestRuleType
    tags: string[]
    tel: string
    work_time: string,
    abbreviation: string,
    detail_address?: string
  }

  interface EditEnterpriseBasicInfo{
    abbreviation?: string
    enterpriseName?: string
    enterpriseFinancing?: string
    enterpriseIndustry?: string[]
    enterpriseLocation?: string[]
    enterpriseNature?: string
    enterpriseProfile?: string
    enterpriseSize?: string
    enterprisecCoordinate?: number[]
    establishedDate?: string
    homepage?: string
    logo?: string
    tel?: string
  }

  interface Check_Identification {
    charter: string
    enterpriseName: string
    phoneNumber: string
    status: "None" | "Failed" | "Passed" | "Waiting"
  }

  interface Identification_Content {
    charter: string
    enterpriseName: string
    phoneNumber?: string
  }

  interface member_info {
    createdAt: string,
    disabled: boolean
    id: number
    logo: string,
    name: string,
    pos: string
    role: 'HR'| 'Teacher'|'Admin'|'None'
  }

  interface invite_data {
    phoneNumber: string,
    role: 'HR'| 'Teacher'|'Admin'|'None'
  }

  interface del_member_param{
    workerId: number,
    role: 'HR'| 'Teacher'|'Admin'|'None'
  }

  type overtimeWorkDegreeType = 'None'|'Paid'|'SomeTime'
  type EnterpriseRestRuleType = 'OneDayOffPerWeekend'|'TwoDayOffPerWeekend'|'StaggerWeekends'|'ShiftWork'

  type welfareType = {
    customTags: string[]
    overtimeWorkDegree: overtimeWorkDegreeType
    restRule: EnterpriseRestRule
    welfare?: string[]
    workRule: string
    worktime?: 1|2
    startTime?: any,
    endTime?: any,
  }

  type InfoProps = Partial<BaseInfo>

}
