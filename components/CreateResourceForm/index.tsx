"use client";
import { createResource, getSkills } from "@/api";
import { Skill } from "@/api/types";
import { isValidEmail } from "@/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function CreateResourceForm() {
  const router = useRouter();

  const [isLoadingSkills, setIsLoadingSkills] = useState<boolean>(true);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [skills, setSkills] = useState<number[]>([]);

  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await getSkills();
      setAvailableSkills(response.data);

      setIsLoadingSkills(false);
    })();
  }, []);

  const validationStatus = useMemo(() => {
    const validationStatus: {
      isValid: boolean;
      errors: {
        firstName?: string;
        lastName?: string;
        role?: string;
        email?: string;
        skills?: string;
      };
    } = {
      isValid: true,
      errors: {},
    };

    if (!firstName || firstName === "") {
      validationStatus.isValid = false;
      validationStatus.errors.firstName = "First name is required";
    }

    if (!lastName || lastName === "") {
      validationStatus.isValid = false;
      validationStatus.errors.lastName = "Last name is required";
    }

    if (!role || role === "") {
      validationStatus.isValid = false;
      validationStatus.errors.role = "Role is required";
    }

    if (!role || role === "") {
      validationStatus.isValid = false;
      validationStatus.errors.role = "Role is required";
    }

    if (!email || email === "") {
      validationStatus.isValid = false;
      validationStatus.errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      validationStatus.isValid = false;
      validationStatus.errors.email = "A valid email address is required";
    }

    if (skills.length < 1) {
      validationStatus.isValid = false;
      validationStatus.errors.skills = "Please select at least one skill";
    }

    return validationStatus;
  }, [firstName, lastName, role, email, skills]);

  async function submit() {
    setIsSubmitting(true);
    setShowValidation(false);

    try {
      const response = await createResource({
        firstname: firstName,
        lastname: lastName,
        role,
        email,
        skills,
      });

      router.push(`/resources/${response.data.id}`);
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        validationStatus.isValid ? submit() : setShowValidation(true);
      }}
    >
      <h1 className="mb-8 mt-2 text-xl font-semibold">Create New Resource</h1>

      <div className="mb-10 grid w-[405px] grid-cols-2 gap-x-4 gap-y-3">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className="h-8 border-2 border-brand-gray-light px-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setFirstName(event.target.value)}
            disabled={isSubmitting}
          />

          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {validationStatus.errors.firstName}
              </p>
            )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="h-8 border-2 border-brand-gray-light px-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setLastName(event.target.value)}
            disabled={isSubmitting}
          />

          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {validationStatus.errors.lastName}
              </p>
            )}
        </div>

        <div className="col-start-1 flex flex-col">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            className="h-8 border-2 border-brand-gray-light px-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setRole(event.target.value)}
            disabled={isSubmitting}
          />
          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {validationStatus.errors.role}
              </p>
            )}
        </div>

        <div className="col-start-1 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="h-8 border-2 border-brand-gray-light px-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
            disabled={isSubmitting}
          />
          {showValidation &&
            !validationStatus.isValid &&
            validationStatus.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {validationStatus.errors.email}
              </p>
            )}
        </div>
      </div>

      <div className="space-y-2">
        {!isLoadingSkills ? (
          availableSkills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                id={`skill-${skill.id}`}
                onChange={() =>
                  setSkills((current) => {
                    if (current.includes(skill.id)) {
                      return current.filter((id) => id !== skill.id);
                    }

                    return [...current, skill.id];
                  })
                }
                disabled={isSubmitting}
              />
              <label htmlFor={`skill-${skill.id}`}>{skill.name}</label>
            </div>
          ))
        ) : (
          <>
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
          </>
        )}
      </div>

      {showValidation &&
        !validationStatus.isValid &&
        validationStatus.errors.skills && (
          <p className="mt-1 text-sm text-red-500">
            {validationStatus.errors.skills}
          </p>
        )}

      <footer className="mt-10">
        <button
          type="submit"
          className="rounded-md border border-brand-purple-mid bg-brand-purple-light px-8 py-2 font-semibold text-black hover:bg-brand-purple-light/80 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
        >
          Save
        </button>
      </footer>
    </form>
  );
}
