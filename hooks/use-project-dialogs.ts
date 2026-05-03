"use client"

import { useMemo, useState } from "react"

export type ProjectRecord = {
  id: string
  name: string
  slug: string
  owner: boolean
}

type ProjectDialogType = "create" | "rename" | "delete" | null

const INITIAL_OWNED_PROJECTS: ProjectRecord[] = [
  {
    id: "proj-verdant-campus",
    name: "Verdant Campus Expansion",
    slug: "verdant-campus-expansion",
    owner: true,
  },
  {
    id: "proj-harbor-tower",
    name: "Harbor Tower Retrofit",
    slug: "harbor-tower-retrofit",
    owner: true,
  },
]

const INITIAL_SHARED_PROJECTS: ProjectRecord[] = [
  {
    id: "proj-atrium-labs",
    name: "Atrium Labs HQ",
    slug: "atrium-labs-hq",
    owner: false,
  },
  {
    id: "proj-solstice-hotel",
    name: "Solstice Hotel Refresh",
    slug: "solstice-hotel-refresh",
    owner: false,
  },
]

function slugifyProjectName(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug || "untitled-project"
}

function createProjectId() {
  return `proj-${Math.random().toString(36).slice(2, 10)}`
}

export function useProjectDialogs() {
  const [ownedProjects, setOwnedProjects] = useState(INITIAL_OWNED_PROJECTS)
  const [sharedProjects] = useState(INITIAL_SHARED_PROJECTS)
  const [activeDialog, setActiveDialog] = useState<ProjectDialogType>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeProject = useMemo(() => {
    return [...ownedProjects, ...sharedProjects].find(
      (project) => project.id === activeProjectId
    ) ?? null
  }, [activeProjectId, ownedProjects, sharedProjects])

  const slugPreview = useMemo(() => {
    return slugifyProjectName(projectName)
  }, [projectName])

  function closeDialog() {
    setActiveDialog(null)
    setActiveProjectId(null)
    setProjectName("")
    setIsSubmitting(false)
  }

  function openCreateDialog() {
    setActiveDialog("create")
    setActiveProjectId(null)
    setProjectName("")
  }

  function openRenameDialog(project: ProjectRecord) {
    setActiveDialog("rename")
    setActiveProjectId(project.id)
    setProjectName(project.name)
  }

  function openDeleteDialog(project: ProjectRecord) {
    setActiveDialog("delete")
    setActiveProjectId(project.id)
    setProjectName(project.name)
  }

  async function submitCreateProject() {
    setIsSubmitting(true)

    const trimmedName = projectName.trim() || "Untitled Project"

    setOwnedProjects((currentProjects) => [
      {
        id: createProjectId(),
        name: trimmedName,
        slug: slugifyProjectName(trimmedName),
        owner: true,
      },
      ...currentProjects,
    ])

    closeDialog()
  }

  async function submitRenameProject() {
    if (!activeProjectId) {
      return
    }

    setIsSubmitting(true)

    const trimmedName = projectName.trim() || "Untitled Project"

    setOwnedProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === activeProjectId
          ? {
              ...project,
              name: trimmedName,
              slug: slugifyProjectName(trimmedName),
            }
          : project
      )
    )

    closeDialog()
  }

  async function submitDeleteProject() {
    if (!activeProjectId) {
      return
    }

    setIsSubmitting(true)

    setOwnedProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== activeProjectId)
    )

    closeDialog()
  }

  return {
    ownedProjects,
    sharedProjects,
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
