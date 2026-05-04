import { auth } from "@clerk/nextjs/server"

import {
  deleteProject,
  findProjectOwner,
  normalizeProjectName,
  renameProject,
} from "@/lib/projects"

type ProjectRouteContext = {
  params: Promise<{
    projectId: string
  }>
}

async function readBody(request: Request) {
  const rawBody = await request.text()

  if (!rawBody.trim()) {
    return {}
  }

  try {
    const parsedBody = JSON.parse(rawBody) as unknown

    if (
      parsedBody &&
      typeof parsedBody === "object" &&
      !Array.isArray(parsedBody)
    ) {
      return parsedBody as Record<string, unknown>
    }

    return null
  } catch {
    return null
  }
}

async function authorizeProjectMutation(userId: string, projectId: string) {
  const project = await findProjectOwner(projectId)

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  return project
}

export async function PATCH(request: Request, context: ProjectRouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await context.params
  const authorizationResult = await authorizeProjectMutation(userId, projectId)

  if (authorizationResult instanceof Response) {
    return authorizationResult
  }

  const body = await readBody(request)

  if (body === null) {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const project = await renameProject(projectId, normalizeProjectName(body.name))

  return Response.json({ project })
}

export async function DELETE(
  _request: Request,
  context: ProjectRouteContext
) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await context.params
  const authorizationResult = await authorizeProjectMutation(userId, projectId)

  if (authorizationResult instanceof Response) {
    return authorizationResult
  }

  const project = await deleteProject(projectId)

  return Response.json({ project })
}
