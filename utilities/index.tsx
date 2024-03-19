import { Resource } from "@/api/types"

export const getInitials = (name: string): string => {
  const splitName = name.split(" ")
  return [splitName[0].charAt(0), splitName[1].charAt(0)].join("")
}

export const sortResourcesByName = (a: Resource, b: Resource): number => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()

  if (nameA < nameB) {
    return -1
  }

  if (nameA > nameB) {
    return 1
  }

  return 0
}
