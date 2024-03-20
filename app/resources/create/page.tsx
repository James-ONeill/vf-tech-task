import CreateResourceForm from "@/components/CreateResourceForm"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Resource",
};

export default function Create() {
  return <CreateResourceForm />
}
