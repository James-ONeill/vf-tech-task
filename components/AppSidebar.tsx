"use client"
import clsx from "clsx"
import { useState } from "react"
import ResourceList from "./ResourceList"
import Link from "next/link"

export default function AppSidebar() {
  const [reverseSorting, setReversedSorting] = useState<boolean>(false)

  return (
    <nav className="bg-gray-50 w-[295px] py-5 px-2.5 font-medium flex flex-col gap-4">
      <header>
        <Link className="flex gap-2 items-center" href="/">
          <span className="bg-[#783CE6] text-white rounded-md w-[40px] h-[40px] flex items-center justify-center">
            VF
          </span>{" "}
          RESOURCING
        </Link>
      </header>

      <div className="flex justify-between px-2 py-3 border-t-2 border-b-2 border-[#E6E7EB] items-center">
        <div>Sort</div>

        <div className="flex">
          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:text-[#7A3FE6]",
              !reverseSorting && "bg-[#EDE9FD] text-[#7A3FE6]"
            )}
            onClick={() => setReversedSorting(false)}
          >
            A-Z
          </button>

          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:text-[#7A3FE6]",
              reverseSorting && "bg-[#EDE9FD] color-[#7A3FE6]"
            )}
            onClick={() => setReversedSorting(true)}
          >
            Z-A
          </button>
        </div>
      </div>

      <ResourceList reverseSorting={reverseSorting} />

      <footer className="mt-auto">
        <Link
          href="/resources/create"
          className="bg-[#783CE6] text-white px-4 py-3 rounded-md"
        >
          + New Resource
        </Link>
      </footer>
    </nav>
  )
}
