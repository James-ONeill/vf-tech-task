"use client"
import { useEffect, useState } from "react"
import clsx from "clsx"
import ResourceList from "./ResourceList"

const resources: string[] = [
  "Alex Richards",
  "Andrew Winter",
  "Chris Walters",
  "Dave Foster",
  "Matt Wilson",
  "Sarah West",
]

export default function AppSidebar() {
  const [sortingIsReversed, setSortingIsReversed] = useState<boolean>(false)

  useEffect(() => {
    const savedSortingIsReversed = localStorage.getItem("sortingIsReversed")

    if (savedSortingIsReversed === "true") {
      setSortingIsReversed(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "sortingIsReversed",
      sortingIsReversed ? "true" : "false"
    )
  }, [sortingIsReversed])

  return (
    <div className="bg-gray-50 w-[295px] py-5 px-2.5 font-medium flex flex-col gap-4">
      <h1>
        <span className="bg-[#783CE6] text-white rounded-md w-[40px] h-[40px] inline-flex items-center justify-center">
          VF
        </span>{" "}
        RESOURCING
      </h1>

      <div className="flex justify-between px-2 py-3 border-t-2 border-b-2 border-[#E6E7EB] items-center">
        <div>Sort</div>

        <div className="flex gap-[1px]">
          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:bg-[#EDE9FD] hover:text-[#7A3FE6]",
              !sortingIsReversed && "bg-[#EDE9FD] text-[#7A3FE6]"
            )}
            onClick={() => setSortingIsReversed(false)}
          >
            A-Z
          </button>

          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:bg-[#EDE9FD] hover:text-[#7A3FE6]",
              sortingIsReversed && "bg-[#EDE9FD] color-[#7A3FE6]"
            )}
            onClick={() => setSortingIsReversed(true)}
          >
            Z-A
          </button>
        </div>
      </div>

      <ResourceList resources={resources} reverseSorting={sortingIsReversed} />

      <div className="mt-auto">
        <button className="bg-[#783CE6] text-white px-4 py-3 rounded-md">
          + New Resource
        </button>
      </div>
    </div>
  )
}
