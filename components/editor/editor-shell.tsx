"use client"

import { useState } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

export function EditorShell() {
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isProjectSidebarOpen}
        onToggleSidebar={() => setIsProjectSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar
        isOpen={isProjectSidebarOpen}
        onClose={() => setIsProjectSidebarOpen(false)}
      />
      <main className="relative min-h-0 flex-1 overflow-hidden bg-base">
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--bg-subtle)_0,transparent_58%)] opacity-30" />
      </main>
    </div>
  )
}
