"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

type EditorHomeProps = {
  onNewProject: () => void
}

export function EditorHome({ onNewProject }: EditorHomeProps) {
  return (
    <div className="relative z-10 flex h-full items-center justify-center px-6 py-12">
      <div className="flex max-w-lg flex-col items-center text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-copy-primary sm:text-4xl">
          Create a project or open an existing one
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-copy-muted sm:text-base">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button type="button" size="lg" className="mt-8 gap-2" onClick={onNewProject}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  )
}
