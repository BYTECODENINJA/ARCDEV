"use client"

import { useState } from "react"

import { EditorHome } from "@/components/editor/editor-home"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { useProjectActions } from "@/hooks/use-project-actions"
import { ProjectSummary } from "@/lib/projects"

type EditorShellProps = {
  initialOwnedProjects: ProjectSummary[]
  initialSharedProjects: ProjectSummary[]
}

export function EditorShell({
  initialOwnedProjects,
  initialSharedProjects,
}: EditorShellProps) {
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(true)
  const {
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
  } = useProjectActions()

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isProjectSidebarOpen}
        onToggleSidebar={() => setIsProjectSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar
        isOpen={isProjectSidebarOpen}
        onClose={() => setIsProjectSidebarOpen(false)}
        ownedProjects={initialOwnedProjects}
        sharedProjects={initialSharedProjects}
        onNewProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />
      <main className="relative min-h-0 flex-1 overflow-hidden bg-base">
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bg-subtle)_0,transparent_58%)] opacity-30" />
        <EditorHome onNewProject={openCreateDialog} />
      </main>
      <ProjectDialogs
        activeDialog={activeDialog}
        activeProjectName={activeProject?.name}
        projectName={projectName}
        slugPreview={slugPreview}
        isSubmitting={isSubmitting}
        onProjectNameChange={setProjectName}
        onClose={closeDialog}
        onCreateSubmit={submitCreateProject}
        onRenameSubmit={submitRenameProject}
        onDeleteSubmit={submitDeleteProject}
      />
    </div>
  )
}
