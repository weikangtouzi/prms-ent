declare namespace Employ {
  type FullTime = 'Full'| 'Part'|'InternShip'
  type Education =
    'LessThanPrime'|'Primary'| 'Junior'| 'High'| 'JuniorCollege'| 'RegularCollege'|'Postgraduate'|'Doctor'
  interface JobDetail {
    address_coordinate?: string,
    category?: string[]
    comp_financing?: Enterprise.EnterpriseFinancing
    comp_name?: string,
    comp_size?: Enterprise.EnterpriseSize
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
    tags:  string[]
    title: string
  }

  interface JobList {
    count: number,
    data: JobDetail[]
  }
}
