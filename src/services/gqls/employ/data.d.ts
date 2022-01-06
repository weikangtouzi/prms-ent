declare namespace Employ {
  type JobStatus = 'NotPublishedYet'|'InRecruitment'|'OffLine'
  type FullTime = 'Full'| 'Part'|'InternShip'
  type ResumeJobStatus = 'NoJobButNoJob' | 'NoJobButWantJob' | 'OnTheJob' |'OnTheJobButLookingForAJob'|'GraduatingStudent'
  type Education =
    'LessThanPrime'|'Primary'| 'Junior'| 'High'| 'JuniorCollege'| 'RegularCollege'|'Postgraduate'|'Doctor'
  interface JobDetail {
    address_coordinate?: string,
    address_description: string[]
    category?: string[]
    comp_financing?: Enterprise.EnterpriseFinancing
    comp_name?: string,
    comp_size?: Enterprise.EnterpriseSize
    createdAt: string
    emergency?: boolean,
    full_time_job?: FullTime
    hr_name?: string,
    hr_pos?: string,
    id: number
    job_id?: number
    logo: string
    max_salary: number
    min_education: Education
    min_experience: number
    min_salary: number
    ontop?: boolean
    resumeCount: number
    status: JobStatus
    tags:  string[]
    title: string,
    views: number
  }

  interface JobList {
    count: number,
    data: JobDetail[]
  }

  interface jobDetailForUpdate{
    id?: string,
    category: string[]
    coordinates: number[]
    description: string
    education: Education
    experience: number
    isFullTime: FullTime
    jobTitle: string
    onLineTimes?: string[]
    publishNow: boolean
    requiredNum: number
    salary: number[]
    tags?: string[]
    workingAddress: string[]
  }
  interface jobHunter{
    age: number,
    aimed_city: string,
    education: Education,
    experience: number,
    gender: boolean,
    id: number,
    job_expectation: string[],
    job_status: ResumeJobStatus,
    last_log_out_time: string,
    name: string
    salary: number[]
  }

  interface communicate_list{
    age: number
    city_expectation: string,
    exp: number
    gender: boolean
    id: number
    job: any
    job_category_expectation: string[]
    job_status: ResumeJobStatus
    last_log_out_time: string
    last_msg: string
    last_msg_time: string
    logo: string
    name: string
    salary_expectations: number[]
  }

  interface interviewer_detail{
    age: number
    aimed_city: string
    education: Education
    experience: number
    gender: boolean
    id: number
    job: any
    job_expectation: string[]
    job_status: ResumeJobStatus
    last_log_out_time: string
    name: string
    personal_advantage: string
    salary: number[]
    skills: string[]
  }

  interface JobHunterList {
    count: number,
    data: jobHunter[]
  }

  interface InterviewerList{
    count: number,
    data: interviewer_detail[]
  }
}
