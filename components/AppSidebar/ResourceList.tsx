"use client";
import { getResources } from "@/api";
import { Resource } from "@/api/types";
import { sortResourcesByName } from "@/utilities";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  reverseSorting: boolean;
}

export default function ResourceList({ reverseSorting }: Props) {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getResources();
      setResources(response.data);

      setIsLoading(false);
    })();
  }, [pathname]);

  const sortedResources = useMemo(() => {
    const sortedResources = resources.sort(sortResourcesByName);

    if (reverseSorting) {
      sortedResources.reverse();
    }

    return sortedResources;
  }, [resources, reverseSorting]);

  return isLoading ? (
    <Skeleton
      count={10}
      containerClassName="space-y-3"
      baseColor="#D2D5DB"
      highlightColor="#e3e3e3"
      height={20}
    />
  ) : (
    <ul>
      {sortedResources.map((resource, key) => (
        <li
          key={key}
          className={clsx(
            "border px-3 py-2 transition duration-300 hover:text-brand-purple-dark",
            pathname === `/resources/${resource.id}`
              ? "rounded-md border border-brand-purple-mid bg-brand-purple-light text-black"
              : "border-transparent",
          )}
        >
          <Link href={`/resources/${resource.id}`}>{resource.name}</Link>
        </li>
      ))}
    </ul>
  );
}
