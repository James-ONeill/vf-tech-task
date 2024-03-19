import { NewResource } from "@/api/types"
import axios from "axios"

const baseURL = "http://localhost:4000"

const endpoint = (...fragments: string[]) => [baseURL, ...fragments].join("/")

export const getResources = () => axios.get(endpoint("resources"))

export const getResourceDetails = (id: string) =>
  axios.get(endpoint("resources", id))

export const getResourceSkills = (id: string) =>
  axios.get(endpoint("resources", id, "skills"))

export const getSkills = () => axios.get(endpoint("skills"))

export const createResource = (resource: NewResource) =>
  axios.post(endpoint("resources"), resource)
