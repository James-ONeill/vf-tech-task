import { useMemo } from "react"
import Link from "next/link"

interface Props {
  resources: string[]
  reverseSorting: boolean
}

export default function ResourceList({ resources, reverseSorting }: Props) {
  const sortedResources = useMemo(() => {
    const sortedResources = resources.sort()

    if (reverseSorting) {
      sortedResources.reverse()
    }

    return sortedResources
  }, [resources, reverseSorting])

  return resources.length ? (
    <nav>
      <ul className="space-y-3">
        {sortedResources.map((resource, key) => (
          <li key={key}>
            <Link href="#">{resource}</Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <></>
  )
}
