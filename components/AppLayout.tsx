import { ReactNode } from "react"
import AppSidebar from "./AppSidebar"

interface Props {
  children: ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="px-8 py-5">{children}</main>
    </div>
  )
}
