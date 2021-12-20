declare namespace Employ {
  interface JobDetail {
    createdAt: string
    education: education
    experience: number
    id: number
    loc: string
    salary: number[]
    title: string
  }

  interface JobList {
    count: number,
    data: JobDetail[]
  }
}
