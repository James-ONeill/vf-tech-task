import ResourceDetails from "@/components/ResourceDetails"

interface Props {
  params: {
    id: string
  }
}

export default function Resource({ params }: Props) {
  return <ResourceDetails id={params.id} />
}
