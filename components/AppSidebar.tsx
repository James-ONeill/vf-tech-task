"use client";
import clsx from "clsx";
import { useState } from "react";
import ResourceList from "./ResourceList";
import Link from "next/link";

export default function AppSidebar() {
  const [reverseSorting, setReversedSorting] = useState<boolean>(false);

  return (
    <nav className="flex w-[295px] flex-col gap-4 bg-gray-50 px-2.5 py-5 font-medium">
      <header>
        <Link className="flex items-center gap-2" href="/">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#783CE6] text-white">
            VF
          </span>{" "}
          RESOURCING
        </Link>
      </header>

      <div className="flex items-center justify-between border-b-2 border-t-2 border-[#E6E7EB] px-2 py-3">
        <div>Sort</div>

        <div className="flex">
          <button
            className={clsx(
              "rounded-md px-2 py-1.5 transition-colors duration-150 hover:text-[#7A3FE6]",
              !reverseSorting && "bg-[#EDE9FD] text-[#7A3FE6]",
            )}
            onClick={() => setReversedSorting(false)}
          >
            A-Z
          </button>

          <button
            className={clsx(
              "rounded-md px-2 py-1.5 transition-colors duration-150 hover:text-[#7A3FE6]",
              reverseSorting && "color-[#7A3FE6] bg-[#EDE9FD]",
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
          className="rounded-md bg-[#783CE6] px-4 py-3 text-white transition-colors duration-300 hover:bg-[#783CE6]/80"
        >
          + New Resource
        </Link>
      </footer>
    </nav>
  );
}
