"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { buildProjectId, generateProjectIdSuffix } from "@/lib/project-ids"
import { ProjectSummary } from "@/lib/projects"

export type ProjectDialogType = "create" | "rename" | "delete" | null

export function useProjectActions() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeDialog, setActiveDialog] = useState<ProjectDialogType>(null)
  const [activeProject, setActiveProject] = useState<ProjectSummary | null>(null)
  const [projectName, setProjectName] = useState("")
  const [createSuffix, setCreateSuffix] = useState(() => generateProjectIdSuffix())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slugPreview = useMemo(() => {
    return buildProjectId(projectName, createSuffix)
  }, [createSuffix, projectName])

  function closeDialog() {
    setActiveDialog(null)
    setActiveProject(null)
    setProjectName("")
    setIsSubmitting(false)
  }

  function openCreateDialog() {
    setActiveDialog("create")
    setActiveProject(null)
    setProjectName("")
    setCreateSuffix(generateProjectIdSuffix())
  }

  function openRenameDialog(project: ProjectSummary) {
    setActiveDialog("rename")
    setActiveProject(project)
    setProjectName(project.name)
  }

  function openDeleteDialog(project: ProjectSummary) {
    setActiveDialog("delete")
    setActiveProject(project)
    setProjectName(project.name)
  }

  async function submitCreateProject() {
    setIsSubmitting(true)
    try {
      const nextProjectId = buildProjectId(projectName, createSuffix)
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName, projectId: nextProjectId }),
      })

      if (response.ok) {
        const { project } = await response.json()
        closeDialog()
        router.push(`/editor/${project.id}`)
      }
    } catch (error) {
      console.error("Failed to create project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function submitRenameProject() {
    if (!activeProject) return
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/projects/${activeProject.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
      })

      if (response.ok) {
        closeDialog()
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to rename project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function submitDeleteProject() {
    if (!activeProject) return
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/projects/${activeProject.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        closeDialog()
        const isActiveWorkspace = pathname === `/editor/${activeProject.id}`
        if (isActiveWorkspace) {
          router.push("/editor")
        } else {
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    activeDialog,
    activeProject,
    projectName,
    slugPreview,
    isSubmitting,
    setProjectName,
    closeDialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    submitCreateProject,
    submitRenameProject,
    submitDeleteProject,
  }
}
