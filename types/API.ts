export interface Resource {
  id: string
  name: string
}

export interface DetailedResource extends Resource {
  role: string
  email: string
}

export interface NewResource {
  firstname: string
  lastname: string
  role: string
  email: string
  skills: number[]
}

export interface Skill {
  id: number
  name: string
}
