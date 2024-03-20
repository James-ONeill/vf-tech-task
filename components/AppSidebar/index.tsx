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
        <Link className="group flex items-center gap-2" href="/">
          <span className="bg-brand-purple-dark group-hover:bg-brand-purple-dark/80 flex h-[40px] w-[40px] items-center justify-center rounded-md text-white transition-colors duration-300">
            VF
          </span>{" "}
          RESOURCING
        </Link>
      </header>

      <div className="border-brand-gray flex items-center justify-between border-b-2 border-t-2 px-2 py-3">
        <div>Sort</div>

        <div className="flex">
          <button
            className={clsx(
              "hover:text-brand-purple-dark rounded-md px-2 py-1.5 transition-colors duration-150",
              !reverseSorting && "bg-brand-purple-light text-brand-purple-dark",
            )}
            onClick={() => setReversedSorting(false)}
          >
            A-Z
          </button>

          <button
            className={clsx(
              "hover:text-brand-purple-dark rounded-md px-2 py-1.5 transition-colors duration-150",
              reverseSorting && "color-brand-purple-dark bg-brand-purple-light",
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
          className="bg-brand-purple-dark hover:bg-brand-purple-dark/80 rounded-md px-4 py-3 text-white transition-colors duration-300"
        >
          + New Resource
        </Link>
      </footer>
    </nav>
  );
}
