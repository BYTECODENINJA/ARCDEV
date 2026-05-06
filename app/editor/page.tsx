import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { EditorShell } from "@/components/editor/editor-shell"
import { listOwnedProjects, listSharedProjects } from "@/lib/projects"

export default async function EditorPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const primaryEmailAddress = user?.primaryEmailAddress?.emailAddress?.toLowerCase()
  const [ownedProjects, sharedProjects] = await Promise.all([
    listOwnedProjects(userId),
    primaryEmailAddress ? listSharedProjects(primaryEmailAddress) : Promise.resolve([]),
  ])

  return (
    <EditorShell
      initialOwnedProjects={ownedProjects}
      initialSharedProjects={sharedProjects}
    />
  )
}
