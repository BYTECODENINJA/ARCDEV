"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ProjectDialogsProps = {
  activeDialog: "create" | "rename" | "delete" | null
  activeProjectName?: string
  projectName: string
  slugPreview: string
  isSubmitting: boolean
  onProjectNameChange: (value: string) => void
  onClose: () => void
  onCreateSubmit: () => void | Promise<void>
  onRenameSubmit: () => void | Promise<void>
  onDeleteSubmit: () => void | Promise<void>
}

export function ProjectDialogs({
  activeDialog,
  activeProjectName,
  projectName,
  slugPreview,
  isSubmitting,
  onProjectNameChange,
  onClose,
  onCreateSubmit,
  onRenameSubmit,
  onDeleteSubmit,
}: ProjectDialogsProps) {
  return (
    <>
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent>
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              void onCreateSubmit()
            }}
          >
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Name your new project and review the generated workspace slug.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-copy-primary">
                  Project name
                </span>
                <Input
                  value={projectName}
                  onChange={(event) => onProjectNameChange(event.target.value)}
                  placeholder="Untitled Project"
                  disabled={isSubmitting}
                />
              </label>
              <div className="rounded-2xl border border-surface-border bg-surface px-3 py-2">
                <p className="text-xs uppercase tracking-[0.18em] text-copy-faint">
                  Slug preview
                </p>
                <p className="mt-1 font-mono text-sm text-copy-secondary">
                  {slugPreview}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Create Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent>
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              void onRenameSubmit()
            }}
          >
            <DialogHeader>
              <DialogTitle>Rename Project</DialogTitle>
              <DialogDescription>
                Update <span className="text-copy-primary">{activeProjectName}</span> to
                a new project name.
              </DialogDescription>
            </DialogHeader>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-copy-primary">
                Project name
              </span>
              <Input
                autoFocus
                value={projectName}
                onChange={(event) => onProjectNameChange(event.target.value)}
                placeholder="Untitled Project"
                disabled={isSubmitting}
              />
            </label>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Save Name
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent>
          <div className="grid gap-5">
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                Delete <span className="text-copy-primary">{activeProjectName}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isSubmitting}
                onClick={() => {
                  void onDeleteSubmit()
                }}
              >
                Delete Project
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
