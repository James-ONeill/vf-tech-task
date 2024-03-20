import ResourceDetails from "@/components/ResourceDetails";
import type { Metadata, ResolvingMetadata } from "next";
import { getResourceDetails } from "@/api";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const response = await getResourceDetails(params.id);
    return {
      title: response.data.name,
    };
  } catch (e) {
    notFound();
  }
}

export default function Resource({ params }: Props) {
  return <ResourceDetails id={params.id} />;
}
