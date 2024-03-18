export interface Resource {
  id: string
  name: string
}

export interface DetailedResource extends Resource {
  role: string
  email: string
}

export interface NewResource extends DetailedResource {
  skills: number[]
}

export interface Skill {
  id: number
  name: string
}
