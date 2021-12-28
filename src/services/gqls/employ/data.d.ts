declare namespace Employ {
  type JobStatus = 'NotPublishedYet'|'InRecruitment'|'OffLine'
  type FullTime = 'Full'| 'Part'|'InternShip'
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
}
