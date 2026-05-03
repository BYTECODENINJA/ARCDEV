"use client"

import { FolderOpen, Plus, Users, X, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type ProjectSidebarProps = {
  isOpen: boolean
  onClose: () => void
  onNewProject?: () => void
  className?: string
}

function EmptyProjectState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex h-full min-h-72 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-subtle-border bg-base/40 px-8 py-10 text-center">
      <Icon className="h-8 w-8 shrink-0 text-copy-faint" />
      <div className="max-w-56 space-y-1.5">
        <p className="text-sm font-semibold text-copy-primary">{title}</p>
        <p className="text-sm leading-5 text-copy-muted">
          {description}
        </p>
      </div>
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
  className,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "fixed bottom-4 left-4 top-[4.75rem] z-40 flex w-[min(22rem,calc(100vw-2rem))] flex-col rounded-2xl border border-surface-border bg-elevated/95 shadow-2xl shadow-black/30 backdrop-blur transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1.5rem)]",
        className
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close project sidebar"
          onClick={onClose}
          className="text-copy-secondary hover:bg-subtle hover:text-copy-primary"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="min-h-0 flex-1 gap-0">
        <div className="shrink-0 border-b border-surface-border px-4 py-3">
          <TabsList className="grid h-9 w-full grid-cols-2 bg-subtle p-1">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <TabsContent value="my-projects" className="h-full min-h-full">
            <EmptyProjectState
              icon={FolderOpen}
              title="No projects yet"
              description="New architecture projects will appear here."
            />
          </TabsContent>
          <TabsContent value="shared" className="h-full min-h-full">
            <EmptyProjectState
              icon={Users}
              title="Nothing shared"
              description="Projects shared with you will appear here."
            />
          </TabsContent>
        </div>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-4">
        <Button type="button" className="w-full gap-2" onClick={onNewProject}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
