"use client"
import { DetailedResource, Skill } from "@/types/API"
import { useEffect, useState } from "react"
import { getResourceDetails, getResourceSkills } from "@/api"
import { getInitials } from "@/utilities"
import clsx from "clsx"

interface Props {
  id: string
}

export default function ResourceDetails({ id }: Props) {
  const [resource, setResource] = useState<DetailedResource>()
  const [skills, setSkills] = useState<Skill[]>([])
  const [tab, setTab] = useState<"overview" | "skills">("overview")

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getResourceDetails(id)
        setResource(response.data)
      } catch (e) {}
    })()
    ;(async () => {
      try {
        const response = await getResourceSkills(id)
        setSkills(response.data)
      } catch (e) {}
    })()
  }, [id])

  return resource ? (
    <div className="flex gap-4">
      <div className="w-[40px] h-[40px] rounded-full bg-gray-50 flex justify-center items-center font-medium">
        {getInitials(resource.name)}
      </div>

      <div>
        <div className="h-[40px] flex items-center font-medium mb-10">
          <h1>{resource.name}</h1>
        </div>

        <div className="flex mb-8">
          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:text-[#7A3FE6]",
              tab === "overview" && "bg-[#EDE9FD] text-[#7A3FE6]"
            )}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>

          <button
            className={clsx(
              "py-1.5 px-2 rounded-md transition-colors duration-150 hover:text-[#7A3FE6]",
              tab === "skills" && "bg-[#EDE9FD] text-[#7A3FE6]"
            )}
            onClick={() => setTab("skills")}
          >
            Skills
          </button>
        </div>

        {tab === "overview" && (
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
        )}

        {tab === "skills" && (
          <ul className="list-disc ml-8 space-y-2">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}
