import axios from "axios"
import { NewResource } from "@/types/API"

const baseURL = "http://localhost:4000"

export const getResources = () => axios.get([baseURL, "resources"].join("/"))

export const getResourceDetails = (id: string) =>
  axios.get([baseURL, "resources", id].join("/"))

export const getResourceSkills = (id: string) =>
  axios.get([baseURL, "resources", id, "skills"].join("/"))

export const getSkills = () => axios.get([baseURL, "skills"].join("/"))

export const createResource = (resource: NewResource) =>
  axios.post([baseURL, "resources"].join("/"), resource)
