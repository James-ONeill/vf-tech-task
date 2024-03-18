"use client"
import { Resource } from "@/types/API"
import axios from "axios"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { getResources } from "@/api"

function sortResourcesByName(a: Resource, b: Resource): number {
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

interface Props {
  reverseSorting: boolean
}

export default function ResourceList({ reverseSorting }: Props) {
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getResources();
        setResources(response.data)
      } catch (e) {}
    })()
  }, [])

  const sortedResources = useMemo(() => {
    const sortedResources = resources.sort(sortResourcesByName)

    if (reverseSorting) {
      sortedResources.reverse()
    }

    return sortedResources
  }, [resources, reverseSorting])

  return resources.length ? (
    <ul className="space-y-3">
      {sortedResources.map((resource, key) => (
        <li key={key}>
          <Link href={`/resources/${resource.id}`}>{resource.name}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <></>
  )
}
