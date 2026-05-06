import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { findAccessibleProject } from "@/lib/projects"

type WorkspacePageProps = {
  params: Promise<{
    roomId: string
  }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const { roomId } = await params
  const user = await currentUser()
  const primaryEmailAddress = user?.primaryEmailAddress?.emailAddress
  const project = await findAccessibleProject(
    roomId,
    userId,
    primaryEmailAddress ?? undefined
  )

  if (!project) {
    redirect("/editor")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-6 py-12 text-copy-primary">
      <div className="max-w-lg space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-copy-faint">
          Workspace
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="text-sm leading-6 text-copy-muted sm:text-base">
          This project route is now wired and reachable. The full workspace shell
          is the next implementation step.
        </p>
      </div>
    </main>
  )
}
