import { auth } from "@clerk/nextjs/server"

import {
  createProjectForOwner,
  listOwnedProjects,
  normalizeProjectName,
} from "@/lib/projects"

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

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await listOwnedProjects(userId)

  return Response.json({ projects })
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await readBody(request)

  if (body === null) {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const project = await createProjectForOwner(
    userId,
    normalizeProjectName(body.name),
    typeof body.projectId === "string" ? body.projectId : undefined
  )

  return Response.json({ project }, { status: 201 })
}
