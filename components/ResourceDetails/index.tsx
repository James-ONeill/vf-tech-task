"use client";
import { getResourceDetails, getResourceSkills } from "@/api";
import { DetailedResource, Skill } from "@/api/types";
import { getInitials } from "@/utilities";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  id: string;
}

export default function ResourceDetails({ id }: Props) {
  const [resource, setResource] = useState<DetailedResource>();

  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(true);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [tab, setTab] = useState<"overview" | "skills">("overview");

  useEffect(() => {
    (async () => {
      const response = await getResourceDetails(id);
      setResource(response.data);
    })();
    (async () => {
      try {
        const response = await getResourceSkills(id);
        setSkills(response.data);
      } catch (e) {}

      setIsLoadingSkills(false);
    })();
  }, [id]);

  return (
    <div className="flex gap-4">
      {resource ? (
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-50 font-medium">
          {getInitials(resource.name)}
        </div>
      ) : (
        <Skeleton
          circle
          baseColor="#D2D5DB"
          highlightColor="#e3e3e3"
          width={40}
          height={40}
        />
      )}

      <div>
        <div className="mb-10 flex h-[40px] items-center font-medium">
          {resource ? (
            <h1>{resource.name}</h1>
          ) : (
            <Skeleton
              baseColor="#D2D5DB"
              highlightColor="#e3e3e3"
              height={30}
              width={200}
            />
          )}
        </div>

        <div className="mb-8 flex font-medium">
          <button
            className={clsx(
              "rounded-md px-2 py-1.5 transition-colors duration-150 hover:text-brand-purple-dark",
              tab === "overview" && "bg-brand-purple-light text-brand-purple-dark",
            )}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>

          <button
            className={clsx(
              "rounded-md px-2 py-1.5 transition-colors duration-150 hover:text-brand-purple-dark",
              tab === "skills" && "bg-brand-purple-light text-brand-purple-dark",
            )}
            onClick={() => setTab("skills")}
          >
            Skills
          </button>
        </div>

        {tab === "overview" && (
          <>
            {resource ? (
              <dl className="space-y-2">
                <div className="space-y-1">
                  <dt className="font-xs">Role</dt>
                  <dd className="font-medium">{resource.role}</dd>
                </div>

                <div className="space-y-1">
                  <dt className="font-xs">Email</dt>
                  <dd className="font-medium">{resource.email}</dd>
                </div>
              </dl>
            ) : (
              <div className="space-y-2">
                <div>
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    height={16}
                    width={150}
                  />
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    height={20}
                    width={200}
                  />
                </div>

                <div>
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    height={16}
                    width={150}
                  />
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    height={20}
                    width={200}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {tab === "skills" && (
          <>
            {!isLoadingSkills ? (
              <>
                {skills.length ? (
                  <ul className="ml-8 list-disc space-y-2">
                    {skills.map((skill) => (
                      <li key={skill.id}>{skill.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>This resource has no assigned skills.</p>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-4">
                  <Skeleton
                    circle
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={200}
                    height={20}
                  />
                </div>
                <div className="flex gap-4">
                  <Skeleton
                    circle
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={200}
                    height={20}
                  />
                </div>
                <div className="flex gap-4">
                  <Skeleton
                    circle
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    baseColor="#D2D5DB"
                    highlightColor="#e3e3e3"
                    width={200}
                    height={20}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
