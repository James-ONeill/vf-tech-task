"use client"
import { getResources } from "@/api"
import { Resource } from "@/types/API"
import { sortResourcesByName } from "@/utilities"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

interface Props {
  reverseSorting: boolean
}

export default function ResourceList({ reverseSorting }: Props) {
  const pathname = usePathname()

  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getResources()
        setResources(response.data)
      } catch (e) {}
    })()
  }, [pathname])

  const sortedResources = useMemo(() => {
    const sortedResources = resources.sort(sortResourcesByName)

    if (reverseSorting) {
      sortedResources.reverse()
    }

    return sortedResources
  }, [resources, reverseSorting])

  return resources.length ? (
    <ul>
      {sortedResources.map((resource, key) => (
        <li
          key={key}
          className={clsx(
            "transition duration-300 px-3 py-2 border hover:text-[#7A3FE6]",
            pathname === `/resources/${resource.id}`
              ? "bg-[#EDE9FD] rounded-md text-black border border-[#DDD6FC]"
              : "border-transparent"
          )}
        >
          <Link href={`/resources/${resource.id}`}>{resource.name}</Link>
        </li>
      ))}
    </ul>
  ) : (
    <></>
  )
}
