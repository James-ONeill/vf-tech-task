"use client"
import { getSkills } from "@/api"
import { Skill } from "@/api/types"
import { useEffect, useMemo, useState } from "react"
import { createResource } from "@/api"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function CreateResourceForm() {
  const router = useRouter()

  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(false)
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [skills, setSkills] = useState<number[]>([])

  const [showValidation, setShowValidation] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingSkills(true)
    ;(async () => {
      const response = await getSkills()
      setAvailableSkills(response.data)

      setIsLoadingSkills(false)
    })()
  }, [])

  const validationStatus = useMemo(() => {
    const validationStatus: {
      isValid: boolean
      errors: {
        firstName?: string
        lastName?: string
        role?: string
        email?: string
        skills?: string
      }
    } = {
      isValid: true,
      errors: {},
    }

    if (!firstName || firstName === "") {
      validationStatus.isValid = false
      validationStatus.errors.firstName = "First name is required"
    }

    if (!lastName || lastName === "") {
      validationStatus.isValid = false
      validationStatus.errors.lastName = "Last name is required"
    }

    if (!role || role === "") {
      validationStatus.isValid = false
      validationStatus.errors.role = "Role is required"
    }

    if (!email || email === "") {
      validationStatus.isValid = false
      validationStatus.errors.role = "Role is required"
    }

    if (!email || email === "") {
      validationStatus.isValid = false
      validationStatus.errors.email = "Email is required"
    } else if (
      !email
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      validationStatus.isValid = false
      validationStatus.errors.role = "A valid email address is required"
    }

    if (skills.length < 1) {
      validationStatus.isValid = false
      validationStatus.errors.skills = "Please select at least one skill"
    }

    return validationStatus
  }, [firstName, lastName, role, email, skills])

  async function submit() {
    setIsSubmitting(true)
    setShowValidation(false)

    try {
      const response = await createResource({
        firstname: firstName,
        lastname: lastName,
        role,
        email,
        skills,
      })

      router.push(`/resources/${response.data.id}`)
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        validationStatus.isValid ? submit() : setShowValidation(true)
      }}
    >
      <h1>Create New Resource</h1>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-[405px]">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className="border-2 border-[#D2D5DB] h-8 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(event) => setFirstName(event.target.value)}
            disabled={isSubmitting}
          />

          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {validationStatus.errors.firstName}
              </p>
            )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="border-2 border-[#D2D5DB] h-8 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(event) => setLastName(event.target.value)}
            disabled={isSubmitting}
          />

          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {validationStatus.errors.lastName}
              </p>
            )}
        </div>

        <div className="flex flex-col col-start-1">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            className="border-2 border-[#D2D5DB] h-8 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(event) => setRole(event.target.value)}
            disabled={isSubmitting}
          />
          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {validationStatus.errors.role}
              </p>
            )}
        </div>

        <div className="flex flex-col col-start-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="border-2 border-[#D2D5DB] h-8 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
            disabled={isSubmitting}
          />
          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationStatus.errors.email}
              </p>
            )}
        </div>
      </div>

      {availableSkills.map((skill) => (
        <div key={skill.id} className="flex gap-4 space-y-2 items-center">
          <input
            type="checkbox"
            id={`skill-${skill.id}`}
            onChange={() =>
              setSkills((current) => {
                if (current.includes(skill.id)) {
                  return current.filter((id) => id !== skill.id)
                }

                return [...current, skill.id]
              })
            }
            disabled={isSubmitting}
          />
          <label htmlFor={`skill-${skill.id}`}>{skill.name}</label>
        </div>
      ))}

      {showValidation &&
        !validationStatus.isValid &&
        validationStatus.errors.skills && (
          <p className="text-red-500 text-sm mt-1">
            {validationStatus.errors.skills}
          </p>
        )}

      <footer className="mt-10">
        <button
          type="submit"
          className="bg-[#EDE9FD] px-8 py-2 rounded-md text-black font-semibold border border-[#DDD6FC] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Save
        </button>
      </footer>
    </form>
  )
}
