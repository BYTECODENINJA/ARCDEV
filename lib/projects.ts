import "server-only"

import { ProjectStatus, Prisma } from "@/app/generated/prisma/client"
import { buildProjectId, isValidProjectId } from "@/lib/project-ids"
import { prisma } from "@/lib/prisma"

const projectSummarySelect = {
  id: true,
  ownerId: true,
  name: true,
  description: true,
  status: true,
  canvasJsonPath: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ProjectSelect

export type ProjectSummary = Prisma.ProjectGetPayload<{
  select: typeof projectSummarySelect
}>

export function normalizeProjectName(value: unknown) {
  if (typeof value !== "string") {
    return "Untitled Project"
  }

  return value.trim() || "Untitled Project"
}

export async function listOwnedProjects(ownerId: string) {
  return prisma.project.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
    select: projectSummarySelect,
  })
}

export async function listSharedProjects(collaboratorEmail: string) {
  return prisma.project.findMany({
    where: {
      collaborators: {
        some: {
          collaboratorEmail: collaboratorEmail.toLowerCase(),
        },
      },
    },
    orderBy: { createdAt: "desc" },
    select: projectSummarySelect,
  })
}

export async function createProjectForOwner(
  ownerId: string,
  name: string,
  projectId?: string
) {
  const id = isValidProjectId(projectId)
    ? projectId
    : buildProjectId(name)

  return prisma.project.create({
    data: {
      id,
      ownerId,
      name,
      status: ProjectStatus.DRAFT,
      canvasJsonPath: "",
    },
    select: projectSummarySelect,
  })
}

export async function findProjectOwner(projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      ownerId: true,
    },
  })
}

export async function renameProject(projectId: string, name: string) {
  return prisma.project.update({
    where: { id: projectId },
    data: { name },
    select: projectSummarySelect,
  })
}

export async function deleteProject(projectId: string) {
  return prisma.project.delete({
    where: { id: projectId },
    select: {
      id: true,
    },
  })
}
